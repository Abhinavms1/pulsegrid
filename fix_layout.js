const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf-8');

// 1. Remove PULSEGRID NETWORK sidebar from Hero
const heroSidebar = `{/* Branding Sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', alignItems: 'center', gap: '30px', marginRight: '50px' }}>
            <span style={{ fontSize: '0.9rem', letterSpacing: '4px', color: 'var(--primary-red)', fontWeight: 'bold' }}>PULSEGRID NETWORK</span>
          </motion.div>`;
content = content.replace(heroSidebar, '');

// 2. Remove PULSEGRID NETWORK sidebar from Impact
const impactSidebar = `{/* Branding Sidebar */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', alignItems: 'center', gap: '30px', paddingTop: '100px' }}>
              <span style={{ fontSize: '0.9rem', letterSpacing: '4px', color: 'var(--primary-red)', fontWeight: 'bold' }}>PULSEGRID NETWORK</span>
            </motion.div>`;
content = content.replace(impactSidebar, '');

// 3. Remove 150-Word Overview Section entirely to avoid middle whitespace
const overviewSectionStart = content.indexOf('{/* 150-Word Overview Section');
const overviewSectionEnd = content.indexOf('{/* Impact Section */}');
if (overviewSectionStart !== -1 && overviewSectionEnd !== -1) {
    const overviewSection = content.substring(overviewSectionStart, overviewSectionEnd);
    content = content.replace(overviewSection, '');
}

// 4. Make Impact cards square by changing height: '450px' to aspectRatio: '1 / 1'
content = content.replaceAll("height: '450px'", "aspectRatio: '1 / 1', height: 'auto'");

// Write back
fs.writeFileSync('src/app/page.js', content, 'utf-8');
