const fs = require('fs');

const file = 'src/screens/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes("import { PlaceholderImage }")) {
  content = content.replace(
    "import { DiagonalBanner }",
    "import { DiagonalBanner }\nimport { PlaceholderImage } from '../components/PlaceholderImage';\nimport { Image as ImageIcon } from 'lucide-react';"
  );
}

// Add the dedicated gallery entry and student upload gallery above Phase 1
const gallerySection = `
        {/* Gallery Links & Student Uploads */}
        <div className="mb-10 space-y-6">
          <button 
            onClick={() => { if (typeof (window as any).navigateTo === 'function') { (window as any).navigateTo('gallery'); } else { /* Hack for now since Dashboard doesnt take onViewChange */ } }}
            className="w-full bg-[#F5A623] text-[#0B1F3A] p-6 rounded-xl shadow-md border border-[#F5A623] hover:bg-[#e0961b] transition-colors flex items-center justify-between group"
            id="gallery-btn"
          >
            <div className="text-left">
              <h2 className="font-black text-xl uppercase tracking-wider mb-1">Inspiration Gallery</h2>
              <p className="font-medium text-sm">Browse finished pieces for ideas and craft references.</p>
            </div>
            <ImageIcon className="w-8 h-8 transform group-hover:scale-110 transition-transform" />
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-black text-gray-900 uppercase tracking-wider mb-4">My Uploads</h3>
            <p className="text-gray-500 text-sm mb-6">Your submitted homework photos will appear here as you progress through the weeks.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=400" 
                alt="My Mould (Week 4)" 
                label="My Mould (W4)"
                className="h-32 sm:h-40"
              />
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400" 
                alt="Production Photo (Week 6)" 
                label="Production (W6)"
                className="h-32 sm:h-40"
              />
              <PlaceholderImage 
                src="https://images.unsplash.com/photo-1611080922847-7585a73f9f91?auto=format&fit=crop&w=400" 
                alt="Finished Piece (Week 7)" 
                label="Finished Piece (W7)"
                className="h-32 sm:h-40"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">`;

content = content.replace('<div className="space-y-6">', gallerySection);

fs.writeFileSync(file, content);

// Update App.tsx to pass an onViewChange to Dashboard so the gallery button can work properly.
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  "return <DashboardScreen onEnterPhase={(phase) => {",
  "return <DashboardScreen onViewChange={setCurrentView} onEnterPhase={(phase) => {"
);
fs.writeFileSync('src/App.tsx', appContent);

// Update Dashboard.tsx signature
let dContent = fs.readFileSync(file, 'utf8');
dContent = dContent.replace(
  "export function DashboardScreen({ onEnterPhase }: { onEnterPhase: (phase: number) => void }) {",
  "export function DashboardScreen({ onEnterPhase, onViewChange }: { onEnterPhase: (phase: number) => void, onViewChange?: (view: any) => void }) {"
);
dContent = dContent.replace(
  "id=\"gallery-btn\"",
  "onClick={() => { if (onViewChange) onViewChange('gallery'); }}"
);
fs.writeFileSync(file, dContent);

console.log("Updated Dashboard with Galleries");
