document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Transition
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // Wait for 3 seconds (animation duration) then fade out
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        
        // After fade out completes, hide splash and show main content
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Allow a tiny delay for display:block to apply before adding opacity class
            setTimeout(() => {
                mainContent.classList.add('visible');
            }, 50);
            
        }, 1000); // 1s matches the CSS transition duration
    }, 2500);


    // Blood Drip Button Effect
    const bloodBtn = document.getElementById('request-blood-btn');

    bloodBtn.addEventListener('click', function(e) {
        // Create the drip element
        let drip = document.createElement('span');
        drip.classList.add('drip');
        
        // Calculate coordinates relative to the button
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Set coordinates
        drip.style.left = `${x}px`;
        drip.style.top = `${y}px`;
        
        // Append to button
        this.appendChild(drip);
        
        // Remove after animation completes (1 second)
        setTimeout(() => {
            drip.remove();
        }, 1000);
    });
});
