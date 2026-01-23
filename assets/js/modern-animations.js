// Modern Animated Background with Neural Network Mouse Interaction
class ModernBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -100, y: -100 }; // Start off-screen

        // AI Theme colors
        this.colors = {
            particle: 'rgba(0, 243, 255, 0.5)', // Cyan glow
            line: 'rgba(112, 0, 255, 0.15)', // Purple connection
            mouseLine: 'rgba(0, 243, 255, 0.3)' // Cyan mouse connection
        };

        this.init();
    }

    init() {
        // Setup canvas
        this.canvas.id = 'animated-bg';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1; 
            pointer-events: none;
        `;
        // Position canvas over the video but under the content
        // Video is z-index: -2, Overlay is z-index: -1
        // We'll set this to z-index: 0 but with pointer-events: none so clicks pass through
        this.canvas.style.zIndex = '0';

        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.resize();
        this.createParticles();
        this.animate();

        // Event listeners
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        document.addEventListener('mouseleave', () => {
            this.mouse.x = -100;
            this.mouse.y = -100;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles(); // Re-create nicely distributed particles
    }

    createParticles() {
        this.particles = [];
        // Density based on screen size
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1, // varied sizes
                speedX: (Math.random() - 0.5) * 0.4, // Slow drift
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colors.particle;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.colors.particle;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Connect to other particles (Neural connections)
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.colors.line;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });

            // Connect to Mouse (Interactive Neural Activation)
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) { // Interaction radius
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.colors.mouseLine;
                this.ctx.lineWidth = 1; // Stronger connection to user
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();

                // Slight attraction to mouse (Magnetic effect)
                if (distance > 50) {
                    particle.x += dx * 0.005;
                    particle.y += dy * 0.005;
                }
            }
        });
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, this.options);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ModernBackground();
        new ScrollAnimations();
    });
} else {
    new ModernBackground();
    new ScrollAnimations();
}
