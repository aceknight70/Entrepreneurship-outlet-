import { supabase } from './supabase';

export type GalleryCategory = 'Bead' | 'Earring' | 'Pendant' | 'Keyholder' | 'Decorative Piece';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Bead',
  'Earring',
  'Pendant',
  'Keyholder',
  'Decorative Piece'
];

export interface GalleryItem {
  id: string;
  image_url: string;
  category: GalleryCategory;
  caption: string | null;
  uploaded_by?: string | null;
  created_at: string;
}

const LOCAL_STORAGE_KEY = 'day_spring_gallery_items';

// Default initial items to ensure a rich experience right away
const INITIAL_DEMO_ITEMS: GalleryItem[] = [
  {
    id: 'demo-1',
    image_url: 'https://images.unsplash.com/photo-1611080922847-7585a73f9f91?auto=format&fit=crop&w=800',
    category: 'Earring',
    caption: 'Teardrop resin earrings with embedded gold leaf and oceanic blue tint.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'demo-2',
    image_url: 'https://images.unsplash.com/photo-1599643478524-fb66f70a0922?auto=format&fit=crop&w=800',
    category: 'Pendant',
    caption: 'Polished gemstone-shaped pendant with eco mica powder swirls.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'demo-3',
    image_url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10ee?auto=format&fit=crop&w=800',
    category: 'Keyholder',
    caption: 'Hexagonal keyholder cast with recycled glass chip accents.',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'demo-4',
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800',
    category: 'Bead',
    caption: 'Spherical amber and turquoise beads drilled for jewellery stringing.',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'demo-5',
    image_url: 'https://images.unsplash.com/photo-1618423771880-2bcfa4b6f10c?auto=format&fit=crop&w=800',
    category: 'Decorative Piece',
    caption: 'Geode-style resin coaster with crushed clear crystal border.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

function getStoredLocalItems(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read from localStorage', err);
  }
  // Initialize with demo items
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ITEMS));
  } catch {
    // Ignore storage quota errors
  }
  return INITIAL_DEMO_ITEMS;
}

function saveStoredLocalItems(items: GalleryItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export const galleryService = {
  /**
   * Fetches all gallery records. Attempts Supabase first, falls back to local storage if offline or unconfigured.
   */
  async getGalleryItems(): Promise<{ items: GalleryItem[]; isSupabaseConnected: boolean; error?: string }> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        items: getStoredLocalItems(),
        isSupabaseConnected: false,
        error: 'Supabase credentials not configured in environment variables. Running in resilient local storage mode.'
      };
    }

    try {
      const { data, error } = await supabase
        .from('gs_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase query error (gs_gallery table might need creation):', error.message);
        return {
          items: getStoredLocalItems(),
          isSupabaseConnected: false,
          error: error.message
        };
      }

      if (data && data.length > 0) {
        return { items: data as GalleryItem[], isSupabaseConnected: true };
      }

      // If Supabase table exists but is empty, check if we should return local or empty
      const local = getStoredLocalItems();
      return { items: local, isSupabaseConnected: true };
    } catch (err: any) {
      console.warn('Network or Supabase exception:', err);
      return {
        items: getStoredLocalItems(),
        isSupabaseConnected: false,
        error: err.message || 'Unknown network error'
      };
    }
  },

  /**
   * Uploads an image file to Supabase storage bucket 'gallery' or converts to DataURL fallback,
   * then inserts a record into gs_gallery.
   */
  async uploadPhoto({
    file,
    category,
    caption,
    uploadedBy
  }: {
    file: File;
    category: GalleryCategory;
    caption?: string;
    uploadedBy?: string | null;
  }): Promise<{ item: GalleryItem; isSupabaseConnected: boolean; error?: string }> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `uploads/${cleanFileName}`;

    let imageUrl = '';
    let isSupabaseConnected = false;
    let uploadError = '';

    if (supabaseUrl && supabaseKey) {
      try {
        // Attempt upload to Supabase Storage bucket 'gallery'
        const { error: storageError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (!storageError) {
          const { data: publicUrlData } = supabase.storage
            .from('gallery')
            .getPublicUrl(filePath);

          imageUrl = publicUrlData.publicUrl;
          isSupabaseConnected = true;
        } else {
          uploadError = storageError.message;
          console.warn('Supabase Storage upload warning:', storageError.message);
        }
      } catch (err: any) {
        uploadError = err.message;
        console.warn('Supabase Storage exception:', err);
      }
    }

    // If Supabase storage is not configured or failed, read file as base64 DataURL for offline persistence
    if (!imageUrl) {
      imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const newItem: GalleryItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      image_url: imageUrl,
      category,
      caption: caption?.trim() || null,
      uploaded_by: uploadedBy || null,
      created_at: new Date().toISOString()
    };

    // Try inserting into Supabase gs_gallery table
    if (isSupabaseConnected) {
      try {
        const payload: any = {
          image_url: newItem.image_url,
          category: newItem.category,
          caption: newItem.caption,
          created_at: newItem.created_at
        };

        // If uploaded_by is provided and valid, include it
        if (uploadedBy) {
          payload.uploaded_by = uploadedBy;
        }

        const { data, error: insertError } = await supabase
          .from('gs_gallery')
          .insert([payload])
          .select()
          .single();

        if (insertError) {
          console.warn('Supabase insert failed, caching locally:', insertError.message);
          uploadError = insertError.message;
        } else if (data) {
          newItem.id = data.id;
        }
      } catch (err: any) {
        console.warn('Supabase insert exception:', err);
      }
    }

    // Always mirror to local storage for instant sync and offline reliability
    const currentItems = getStoredLocalItems();
    saveStoredLocalItems([newItem, ...currentItems]);

    return {
      item: newItem,
      isSupabaseConnected,
      error: uploadError || undefined
    };
  },

  /**
   * Replaces an existing gallery photo or updates its category & caption.
   */
  async replacePhoto({
    id,
    file,
    category,
    caption
  }: {
    id: string;
    file?: File;
    category: GalleryCategory;
    caption?: string;
  }): Promise<{ item: GalleryItem; error?: string }> {
    let newImageUrl: string | undefined;

    if (file) {
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `uploads/${cleanFileName}`;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          const { error: storageError } = await supabase.storage
            .from('gallery')
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (!storageError) {
            const { data: publicUrlData } = supabase.storage
              .from('gallery')
              .getPublicUrl(filePath);
            newImageUrl = publicUrlData.publicUrl;
          }
        } catch (err) {
          console.warn('Failed to upload replacement to Supabase storage:', err);
        }
      }

      if (!newImageUrl) {
        newImageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    }

    // Update in Supabase if possible
    try {
      const updateData: any = {
        category,
        caption: caption?.trim() || null
      };
      if (newImageUrl) {
        updateData.image_url = newImageUrl;
      }

      await supabase
        .from('gs_gallery')
        .update(updateData)
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }

    // Update local storage
    const localItems = getStoredLocalItems();
    let updatedItem: GalleryItem | null = null;
    const updatedList = localItems.map((item) => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          category,
          caption: caption !== undefined ? caption.trim() || null : item.caption,
          image_url: newImageUrl || item.image_url
        };
        return updatedItem;
      }
      return item;
    });

    saveStoredLocalItems(updatedList);

    if (!updatedItem) {
      throw new Error('Gallery item not found');
    }

    return { item: updatedItem };
  },

  /**
   * Deletes a gallery record from gs_gallery and local storage.
   */
  async deletePhoto(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await supabase
        .from('gs_gallery')
        .delete()
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }

    const localItems = getStoredLocalItems();
    const filtered = localItems.filter((item) => item.id !== id);
    saveStoredLocalItems(filtered);

    return { success: true };
  }
};
