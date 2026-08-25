const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf-8');

const heroOld = \        {/* Illoca-Style Hero Section */}
        <section className="mobile-hero-section" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 50px', marginLeft: '80px' }}>
          <motion.div 
            className="mobile-hero-text"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: preloaderActive ? 0 : 1, x: preloaderActive ? -50 : 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            style={{ 
              maxWidth: '600px', 
              display: 'flex', 
              flexDirection: 'column',
              background: 'rgba(6, 18, 36, 0.8)', // Slight blue background
              padding: '40px',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <p style={{ fontFamily: 'monospace', color: '#ffffff', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              (1) EMERGENCY LOGISTICS!
            </p>
            <h1 className="text-massive" style={{ fontSize: '5rem', lineHeight: '1', color: '#ffffff', marginBottom: '30px' }}>
              Routing <br/>Redefined
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', marginBottom: '40px' }}>
              Transform passive willingness into actionable, life-saving intervention with the most advanced blood supply chain grid in Kerala.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" className="btn-primary" style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: '8px', border: 'none' }}>
                Access The Grid
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#platform-impact" style={{ padding: '12px 30px', fontSize: '1rem', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollBehavior: 'smooth' }}>
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        </section>\;

const heroNew = \        {/* Illoca-Style Hero Section */}
        <section className="mobile-hero-section" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 5vw', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Branding Sidebar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', alignItems: 'center', gap: '30px', marginRight: '50px' }}>
            <span style={{ fontSize: '0.9rem', letterSpacing: '4px', color: 'var(--primary-red)', fontWeight: 'bold' }}>PULSEGRID NETWORK</span>
          </motion.div>

          <motion.div 
            className="mobile-hero-text"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: preloaderActive ? 0 : 1, x: preloaderActive ? -50 : 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column' }}
          >
            <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
              (1) EMERGENCY LOGISTICS!
            </p>
            <h1 className="text-massive" style={{ fontSize: '5rem', lineHeight: '1', color: 'var(--text-primary)', marginBottom: '30px' }}>
              Routing <br/>Redefined
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '40px' }}>
              Transform passive willingness into actionable, life-saving intervention with the most advanced blood supply chain grid in Kerala.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/blood-banks" style={{ padding: '15px 30px', fontSize: '1rem', borderRadius: '8px', border: 'none', background: '#0a0a0a', color: '#ffffff', fontWeight: 'bold', textDecoration: 'none' }}>
                Access The Grid
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#platform-impact" style={{ padding: '15px 30px', fontSize: '1rem', color: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        </section>\;
content = content.replace(heroOld, heroNew);

const impactOld = \        {/* Impact Section */}
        <section style={{ padding: '100px 5vw', background: 'transparent', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                <div style={{ maxWidth: '600px' }}>
                  <h2 className="text-massive" style={{ fontSize: '3rem', marginBottom: '20px' }}>Impact</h2>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                    Building the most advanced blood network in the world, one facility at a time across Kerala.
                  </p>
                </div>
              </div>\;

const impactNew = \        {/* Impact Section */}
        <section style={{ padding: '100px 5vw', background: 'transparent', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '50px' }}>
            
            {/* Branding Sidebar */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', alignItems: 'center', gap: '30px', paddingTop: '100px' }}>
              <span style={{ fontSize: '0.9rem', letterSpacing: '4px', color: 'var(--primary-red)', fontWeight: 'bold' }}>PULSEGRID NETWORK</span>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ flex: 1 }}>
              <div style={{ marginBottom: '60px', position: 'relative' }}>
                <h2 className="text-massive" style={{ fontSize: '7rem', lineHeight: '0.8', marginBottom: '20px', color: 'var(--text-primary)', marginLeft: '-10px' }}>Platform <br/>Impact</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', marginTop: '20px' }}>
                  Building the most advanced blood network in the world, one facility at a time across Kerala.
                </p>
              </div>\;
content = content.replace(impactOld, impactNew);

const visionOld = \<motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/about" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', border: 'none' }}>
              Explore About Us
            </motion.a>\;
const visionNew = \<motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/about" style={{ padding: '15px 40px', fontSize: '1.1rem', border: 'none', background: '#0a0a0a', color: '#ffffff', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
              Explore About Us
            </motion.a>\;
content = content.replace(visionOld, visionNew);

content = content.replaceAll("style={{ fontSize: '2.5rem', marginBottom: '5px' }}>", "style={{ fontSize: '2.5rem', marginBottom: '5px', color: '#ffffff' }}>");

fs.writeFileSync('src/app/page.js', content, 'utf-8');
