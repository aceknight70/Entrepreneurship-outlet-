import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  Filter, 
  Eye, 
  Sparkles,
  Lock,
  ChevronDown,
  Database
} from 'lucide-react';
import { 
  galleryService, 
  GalleryItem, 
  GalleryCategory, 
  GALLERY_CATEGORIES 
} from '../lib/galleryService';
import { SCHOOL_CONFIG } from '../config';

type AdminRole = 'master' | 'manager' | 'teacher' | 'student';

interface GalleryAdminScreenProps {
  onBack: () => void;
  onViewPublicGallery?: () => void;
}

export function GalleryAdminScreen({ onBack, onViewPublicGallery }: GalleryAdminScreenProps) {
  // Role Access State (Master and Manager have full access)
  const [activeRole, setActiveRole] = useState<AdminRole>('master');
  const isAuthorized = activeRole === 'master' || activeRole === 'manager';

  // Gallery items and loading state
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('Bead');
  const [caption, setCaption] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filter State
  const [categoryFilter, setCategoryFilter] = useState<'All' | GalleryCategory>('All');

  // Replace / Edit Modal State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replacePreviewUrl, setReplacePreviewUrl] = useState<string | null>(null);
  const [replaceCategory, setReplaceCategory] = useState<GalleryCategory>('Bead');
  const [replaceCaption, setReplaceCaption] = useState<string>('');
  const [isReplacing, setIsReplacing] = useState<boolean>(false);
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete Confirmation Modal
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // SQL Schema View Toggle
  const [showSqlGuide, setShowSqlGuide] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const sqlCode = `-- SQL to run in Supabase SQL Editor:
create table if not exists gs_gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text not null,
  caption text,
  uploaded_by uuid references gs_admins(id),
  created_at timestamptz default now()
);

-- Recommended: Set up Supabase Storage Bucket:
-- 1. Create a public bucket named 'gallery' in Supabase Storage.
-- 2. Add public read policy and authenticated upload policy.`;

  // Load items on mount
  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getGalleryItems();
      setItems(res.items);
      if (res.error && !res.isSupabaseConnected) {
        // Informative note about offline/local fallback
        console.info('Gallery operating in local sync mode:', res.error);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Please select a valid image file (PNG, JPG, WebP, etc.).' });
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setStatusMessage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMessage({ type: 'error', text: 'Please choose an image file to upload.' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const res = await galleryService.uploadPhoto({
        file: selectedFile,
        category: selectedCategory,
        caption: caption.trim() || undefined,
        uploadedBy: null
      });

      setItems((prev) => [res.item, ...prev.filter((i) => i.id !== res.item.id)]);
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption('');
      setStatusMessage({ 
        type: 'success', 
        text: `Photo uploaded successfully to "${selectedCategory}" category!` 
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to upload photo.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await galleryService.deletePhoto(itemToDelete.id);
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      setItemToDelete(null);
      setStatusMessage({ type: 'info', text: 'Photo deleted from gallery.' });
    } catch (err: any) {
      console.error('Delete error:', err);
      setStatusMessage({ type: 'error', text: 'Failed to delete photo.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenReplace = (item: GalleryItem) => {
    setEditingItem(item);
    setReplaceCategory(item.category);
    setReplaceCaption(item.caption || '');
    setReplaceFile(null);
    setReplacePreviewUrl(item.image_url);
  };

  const handleReplaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsReplacing(true);
    try {
      const res = await galleryService.replacePhoto({
        id: editingItem.id,
        file: replaceFile || undefined,
        category: replaceCategory,
        caption: replaceCaption
      });

      setItems((prev) => prev.map((i) => (i.id === res.item.id ? res.item : i)));
      setEditingItem(null);
      setStatusMessage({ type: 'success', text: 'Photo details successfully updated!' });
    } catch (err: any) {
      console.error('Update error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update photo.' });
    } finally {
      setIsReplacing(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const filteredItems = items.filter((item) => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-28">
      {/* Top Banner Navigation */}
      <header className="bg-[#0B1F3A] text-white pt-10 pb-8 px-4 sm:px-6 shadow-md border-b-4 border-[#F5A623]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Return to Admin"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black uppercase tracking-tight">Gallery Administration</h1>
                <span className="text-xs bg-[#F5A623] text-gray-900 font-extrabold px-2 py-0.5 rounded">
                  Master / Manager
                </span>
              </div>
              <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
                {SCHOOL_CONFIG.name} • Live Media Asset Control & Supabase Storage
              </p>
            </div>
          </div>

          {/* Role Access Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-300">Active Role:</span>
              <div className="relative">
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as AdminRole)}
                  className="bg-[#15325A] text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-[#F5A623] cursor-pointer"
                >
                  <option value="master">👑 Master Admin (Authorized)</option>
                  <option value="manager">🛡️ Manager (Authorized)</option>
                  <option value="teacher">👨‍🏫 Teacher (Restricted)</option>
                  <option value="student">🎓 Student (Restricted)</option>
                </select>
              </div>
            </div>

            {onViewPublicGallery && (
              <button
                onClick={onViewPublicGallery}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Public Gallery</span>
              </button>
            )}

            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="flex items-center gap-1 text-xs font-bold text-[#F5A623] hover:text-yellow-300 bg-[#F5A623]/10 hover:bg-[#F5A623]/20 px-3 py-1.5 rounded-lg border border-[#F5A623]/30 transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Schema</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* SQL Schema helper (Collapsible) */}
        {showSqlGuide && (
          <div className="bg-gray-900 text-gray-100 rounded-xl p-5 border border-gray-700 shadow-xl relative animate-fadeIn">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#F5A623]" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                  Supabase Database Setup — <code className="text-[#F5A623]">gs_gallery</code> Table
                </h3>
              </div>
              <button
                onClick={copySqlToClipboard}
                className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-[#F5A623] px-3 py-1.5 rounded-lg border border-gray-700 transition-colors font-semibold"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSql ? 'Copied SQL!' : 'Copy SQL'}
              </button>
            </div>
            <pre className="text-xs font-mono bg-black/60 p-4 rounded-lg overflow-x-auto text-emerald-400 leading-relaxed border border-gray-800">
              {sqlCode}
            </pre>
            <p className="text-[11px] text-gray-400 mt-3">
              💡 <strong>Storage Sync:</strong> In addition to Supabase Storage, this screen also features resilient client caching, meaning newly uploaded photos are visible immediately across the app without waiting.
            </p>
          </div>
        )}

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-sm animate-fadeIn ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-red-50 text-red-900 border border-red-200'
                : 'bg-blue-50 text-blue-900 border border-blue-200'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs uppercase font-extrabold px-2 py-0.5 rounded hover:bg-black/5"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* RESTRICTED ACCESS GATE FOR NON-MASTER/MANAGER ROLES */}
        {!isAuthorized ? (
          <div className="bg-white rounded-2xl border border-red-200 shadow-md p-10 text-center max-w-xl mx-auto my-12">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Access Restricted
            </h2>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              This screen is reserved strictly for <strong>Master</strong> and <strong>Manager</strong> administrative roles. As a <em>{activeRole.toUpperCase()}</em>, you do not have permission to upload, replace, or delete gallery photos.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveRole('master')}
                className="w-full sm:w-auto bg-[#0B1F3A] hover:bg-[#15325A] text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                Switch to Master Admin
              </button>
              <button
                onClick={() => setActiveRole('manager')}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-gray-300"
              >
                Switch to Manager Role
              </button>
            </div>
          </div>
        ) : (
          /* AUTHORIZED CONTENT: UPLOAD CONTROL + GALLERY GRID */
          <>
            {/* 1. UPLOAD CONTROL CARD */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#F5A623]/20 text-[#0B1F3A]">
                    <UploadCloud className="w-5 h-5 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">
                      Upload New Photo to Gallery
                    </h2>
                    <p className="text-xs text-gray-500">
                      Upload directly to Supabase Storage with instant categorization and captioning.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {activeRole === 'master' ? 'Master Authorized' : 'Manager Authorized'}
                </span>
              </div>

              <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Dropzone & File Picker */}
                  <div className="lg:col-span-6 flex flex-col">
                    <label className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2 block">
                      1. Select or Drag & Drop Image <span className="text-red-500">*</span>
                    </label>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center flex-1 min-h-[200px] ${
                        isDragging
                          ? 'border-[#F5A623] bg-amber-50/50 scale-[0.99]'
                          : previewUrl
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50/60'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleFileSelect(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />

                      {previewUrl ? (
                        <div className="relative group w-full flex flex-col items-center">
                          <img
                            src={previewUrl}
                            alt="Selected upload preview"
                            className="max-h-48 rounded-lg shadow-sm object-contain border border-gray-200"
                          />
                          <p className="text-xs font-bold text-gray-700 mt-2 truncate max-w-xs">
                            {selectedFile?.name}
                          </p>
                          <span className="text-[11px] text-gray-400">
                            {(selectedFile ? selectedFile.size / 1024 : 0).toFixed(1)} KB • Click to change photo
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              Drop your resin photo here, or <span className="text-blue-600 underline">browse</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Supports JPG, PNG, WEBP, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata: Category & Caption */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                    {/* Category Selection */}
                    <div>
                      <label className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2 block">
                        2. Select Product Category <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Matches official Week 3 production curriculum items.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {GALLERY_CATEGORIES.map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                              selectedCategory === cat
                                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <span>{cat}</span>
                            {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#F5A623]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Caption Input */}
                    <div>
                      <label className="text-xs font-black uppercase text-gray-700 tracking-wider mb-2 block">
                        3. Optional Short Caption
                      </label>
                      <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="e.g. Cobalt swirl resin bead with gold dust trim (Student: Chinedu W.)"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] focus:border-[#0B1F3A] bg-white placeholder-gray-400"
                        maxLength={180}
                      />
                      <span className="text-[11px] text-gray-400 block text-right mt-1">
                        {caption.length}/180 characters
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!selectedFile || isUploading}
                        className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                          !selectedFile || isUploading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                            : 'bg-[#F5A623] hover:bg-[#e0961b] text-[#0B1F3A] cursor-pointer'
                        }`}
                      >
                        {isUploading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Uploading to Supabase Storage...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-4 h-4" />
                            <span>Publish Photo to Gallery</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>

            {/* 2. GRID VIEW OF ALL UPLOADED PHOTOS */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                    <span>Uploaded Gallery Photos</span>
                    <span className="text-xs bg-gray-200 text-gray-800 font-bold px-2 py-0.5 rounded-full">
                      {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Review live gallery photos. Master and Managers can replace or delete any entry.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
                  <button
                    onClick={() => setCategoryFilter('All')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      categoryFilter === 'All'
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    All ({items.length})
                  </button>
                  {GALLERY_CATEGORIES.map((cat) => {
                    const count = items.filter((i) => i.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          categoryFilter === cat
                            ? 'bg-[#0B1F3A] text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid content */}
              {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                  <RefreshCw className="w-8 h-8 text-[#F5A623] animate-spin mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-600">Loading gallery photos from database...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-700">No photos in this category yet</h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Use the upload control above to add high-quality real resin pieces into the {categoryFilter} category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.caption || item.category}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0B1F3A]/90 text-[#F5A623] shadow-md backdrop-blur-xs">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Details & Actions */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[2rem]">
                            {item.caption || <span className="text-gray-400 italic">No caption provided</span>}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-2">
                            Uploaded {new Date(item.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        {/* Action buttons: Replace & Delete */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenReplace(item)}
                            className="flex-1 py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                            <span>Replace / Edit</span>
                          </button>

                          <button
                            onClick={() => setItemToDelete(item)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                            title="Delete photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* REPLACE / EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-black uppercase text-gray-900 tracking-tight">
                  Replace or Edit Photo
                </h3>
                <p className="text-xs text-gray-500">Update category, caption, or swap image file.</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReplaceSubmit} className="space-y-4">
              {/* Image Preview & Replacement Picker */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
                  Current Image / Replacement
                </label>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <img
                    src={replacePreviewUrl || editingItem.image_url}
                    alt="Replacement Preview"
                    className="w-20 h-20 object-cover rounded-lg border shadow-xs"
                  />
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => replaceFileInputRef.current?.click()}
                      className="text-xs font-bold text-[#0B1F3A] bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-xs hover:bg-gray-50 transition-colors"
                    >
                      Choose New Image File
                    </button>
                    <input
                      type="file"
                      ref={replaceFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          setReplaceFile(file);
                          setReplacePreviewUrl(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <p className="text-[11px] text-gray-400">
                      {replaceFile ? replaceFile.name : 'Keeping current photo unless new file is chosen'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category selector */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GALLERY_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setReplaceCategory(cat)}
                      className={`text-xs font-bold py-2 px-2 rounded-lg border text-center transition-all ${
                        replaceCategory === cat
                          ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={replaceCaption}
                  onChange={(e) => setReplaceCaption(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  placeholder="Optional short caption..."
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isReplacing}
                  className="bg-[#0B1F3A] hover:bg-[#15325A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  {isReplacing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center space-y-4 animate-scaleUp">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 uppercase">Delete Photo?</h3>
              <p className="text-xs text-gray-500 mt-1">
                This will permanently remove this {itemToDelete.category} photo from the school gallery database.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
