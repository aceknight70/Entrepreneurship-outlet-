const fs = require('fs');

// Fix Dashboard.tsx
let dashboard = fs.readFileSync('src/screens/Dashboard.tsx', 'utf8');
dashboard = dashboard.replace(
  "interface DashboardProps {\n  onEnterPhase: (phase: number) => void;\n}",
  "interface DashboardProps {\n  onEnterPhase: (phase: number) => void;\n  onViewChange?: (view: any) => void;\n}"
);
dashboard = dashboard.replace(
  "export function DashboardScreen({ onEnterPhase }: DashboardProps) {",
  "export function DashboardScreen({ onEnterPhase, onViewChange }: DashboardProps) {"
);
// Remove multiple onClick
const badClick = "onClick={() => { if (typeof (window as any).navigateTo === 'function') { (window as any).navigateTo('gallery'); } else { /* Hack for now since Dashboard doesnt take onViewChange */ } }}";
dashboard = dashboard.replace(badClick, "");
fs.writeFileSync('src/screens/Dashboard.tsx', dashboard);

// Fix Gallery.tsx (wrap in div with key)
let gallery = fs.readFileSync('src/screens/Gallery.tsx', 'utf8');
gallery = gallery.replace(
  /<PlaceholderImage \n              key=\{piece\.id\}\n              src=\{piece\.src\}\n              alt=\{piece\.title\}\n              label=\{piece\.title\}\n              className="h-64 sm:h-72 shadow-sm"\n            \/>/g,
  `<div key={piece.id}><PlaceholderImage src={piece.src} alt={piece.title} label={piece.title} className="h-64 sm:h-72 shadow-sm" /></div>`
);
fs.writeFileSync('src/screens/Gallery.tsx', gallery);

console.log("Fixed files");
