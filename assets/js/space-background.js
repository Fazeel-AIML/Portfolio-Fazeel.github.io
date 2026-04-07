/* ===== SPACE BACKGROUND ANIMATION ===== */

class SpaceBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.starCount = 250; // Number of twinkling stars

        // Assets
        this.astronautImg = new Image();
        this.astronautImg.src = 'assets/img/astronaut.png';
        this.meteoroidImg = new Image();
        this.meteoroidImg.src = 'assets/img/meteoroid.png';

        // Floating objects instances
        this.astronauts = [];
        this.maxAstronauts = 2; // Exactly two astronauts
        this.meteoroids = [];
        this.maxMeteoroids = 5; // Exactly 5 meteoroids

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resize(); // This handles stars
        
        // Initialize objects inside the canvas at specific positions
        
        // Astronauts: One top left, one top right
        this.spawnAstronaut(this.canvas.width * 0.10, this.canvas.height * 0.15);
        this.spawnAstronaut(this.canvas.width * 0.90, this.canvas.height * 0.15);

        // Meteoroids: 5 unique positions
        this.spawnAsteroid(this.canvas.width * 0.15, this.canvas.height * 0.50); // middle center left
        this.spawnAsteroid(this.canvas.width * 0.85, this.canvas.height * 0.50); // middle center right
        this.spawnAsteroid(this.canvas.width * 0.50, this.canvas.height * 0.85); // middle center bottom
        this.spawnAsteroid(this.canvas.width * 0.10, this.canvas.height * 0.85); // bottom extreme left
        this.spawnAsteroid(this.canvas.width * 0.50, this.canvas.height * 0.15); // middle top
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Don't recreate objects here otherwise they jump, just recreate stars
        this.createStars(); 
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random(),
                alphaChange: (Math.random() * 0.02) + 0.005,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    createShootingStar() {
        const startX = Math.random() * this.canvas.width * 1.5;
        const startY = 0;
        const length = Math.random() * 100 + 30;
        const speed = Math.random() * 15 + 10;
        const angle = Math.PI / 4; // 45 degrees
        this.shootingStars.push({
            x: startX, y: startY, length: length, speed: speed,
            vx: -Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            alpha: 1.0, active: true
        });
    }

    spawnAsteroid(startX = null, startY = null) {
        if (this.meteoroids.length < this.maxMeteoroids) {
            let cx = startX !== null ? startX : Math.random() * this.canvas.width;
            let cy = startY !== null ? startY : Math.random() * this.canvas.height;
            
            const speedX = (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1);
            const speedY = (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1);
            const scale = Math.random() * 0.05 + 0.08; 
            const rotationSpeed = (Math.random() - 0.5) * 0.005;

            this.meteoroids.push({
                x: cx, y: cy, vx: speedX, vy: speedY, 
                rotation: Math.random() * Math.PI * 2, 
                rotationSpeed: rotationSpeed, scale: scale
            });
        }
    }

    spawnAstronaut(startX = null, startY = null) {
        if (this.astronauts.length < this.maxAstronauts) {
            let cx = startX !== null ? startX : Math.random() * this.canvas.width;
            let cy = startY !== null ? startY : Math.random() * this.canvas.height;

            const speedX = (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1);
            const speedY = (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1);
            const scale = 0.13; 

            this.astronauts.push({
                x: cx, y: cy, vx: speedX, vy: speedY, 
                rotation: Math.random() * Math.PI * 2, scale: scale
            });
        }
    }

    update() {
        // Twinkling stars
        this.stars.forEach(star => {
            star.alpha += star.alphaChange * star.direction;
            if (star.alpha <= 0) {
                star.alpha = 0; star.direction = 1;
                star.x = Math.random() * this.canvas.width;
                star.y = Math.random() * this.canvas.height;
            } else if (star.alpha >= 1) {
                star.alpha = 1; star.direction = -1;
            }
        });

        // Shooting stars
        if (Math.random() < 0.015) this.createShootingStar();
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            let ss = this.shootingStars[i];
            ss.x += ss.vx; ss.y += ss.vy;
            if (ss.x < -200 || ss.y > this.canvas.height + 200) {
                this.shootingStars.splice(i, 1);
            }
        }

        // Spawn new objects if they disappear for some reason
        if (this.meteoroids.length < this.maxMeteoroids) this.spawnAsteroid();
        if (this.astronauts.length < this.maxAstronauts) this.spawnAstronaut();

        // Update astronauts
        for (let i = this.astronauts.length - 1; i >= 0; i--) {
            let a = this.astronauts[i];
            a.x += a.vx; a.y += a.vy;
            a.rotation += 0.001; // slow tumble
            
            // Stay inside bounding box, bounce off edges
            if (a.x < 80 || a.x > this.canvas.width - 80) a.vx *= -1;
            if (a.y < 80 || a.y > this.canvas.height - 80) a.vy *= -1;
        }

        // Update meteoroids
        for (let i = this.meteoroids.length - 1; i >= 0; i--) {
            let m = this.meteoroids[i];
            m.x += m.vx; m.y += m.vy;
            m.rotation += m.rotationSpeed;
            
            // Stay inside bounding box, bounce off edges
            if (m.x < 80 || m.x > this.canvas.width - 80) m.vx *= -1;
            if (m.y < 80 || m.y > this.canvas.height - 80) m.vy *= -1;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw twinkling stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this.ctx.fill();
        });

        // Draw shooting stars
        this.shootingStars.forEach(ss => {
            this.ctx.beginPath();
            this.ctx.moveTo(ss.x, ss.y);
            this.ctx.lineTo(ss.x - ss.vx * (ss.length / ss.speed), ss.y - ss.vy * (ss.length / ss.speed));
            let gradient = this.ctx.createLinearGradient(
                ss.x, ss.y, ss.x - ss.vx * (ss.length / ss.speed), ss.y - ss.vy * (ss.length / ss.speed)
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        });

        // Object Opacity - Unfaded as requested
        this.ctx.globalAlpha = 1.0; 
        
        // Removed the globalCompositeOperation = 'screen' 
        // because the dark bounding box is now permanently deleted from the images!

        // Draw Astronauts
        if (this.astronautImg.complete) {
            this.astronauts.forEach(a => {
                this.ctx.save();
                this.ctx.translate(a.x, a.y);
                this.ctx.rotate(a.rotation);
                this.ctx.scale(a.scale, a.scale);
                this.ctx.drawImage(this.astronautImg, -this.astronautImg.width / 2, -this.astronautImg.height / 2);
                this.ctx.restore();
            });
        }

        // Draw Meteoroids
        if (this.meteoroidImg.complete) {
            this.meteoroids.forEach(m => {
                this.ctx.save();
                this.ctx.translate(m.x, m.y);
                this.ctx.rotate(m.rotation);
                this.ctx.scale(m.scale, m.scale);
                this.ctx.drawImage(this.meteoroidImg, -this.meteoroidImg.width / 2, -this.meteoroidImg.height / 2);
                this.ctx.restore();
            });
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new SpaceBackground('space-canvas');
});
