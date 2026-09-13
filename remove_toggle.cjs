const fs = require('fs');
const file = 'src/screens/Market.tsx';
let content = fs.readFileSync(file, 'utf8');

const toggleStart = content.indexOf('<div className="flex justify-end mb-4">');
if (toggleStart !== -1) {
  const toggleEnd = content.indexOf('</div>\n        </div>', toggleStart) + 21;
  const beforeToggle = content.substring(0, toggleStart);
  const afterToggle = content.substring(toggleEnd);
  fs.writeFileSync(file, beforeToggle + afterToggle);
  console.log("Removed toggle block");
} else {
  console.log("Could not find toggle block");
}
