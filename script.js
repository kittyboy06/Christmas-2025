document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Logic
    const targetDate = new Date('December 25, 2025 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="time-box"><span>MERRY CHRISTMAS!</span></div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // 2. Chest Interaction
    const chest = document.getElementById('chest');
    const message = document.getElementById('message');

    chest.addEventListener('click', () => {
        chest.classList.toggle('open');
        if (chest.classList.contains('open')) {
            message.classList.remove('hidden');
            message.classList.add('show');
            // Play a sound if we had one (optional)
        } else {
            message.classList.remove('show');
            setTimeout(() => message.classList.add('hidden'), 500);
        }
    });

    // 3. Snowfall Effect
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s fall time
        snowflake.style.opacity = Math.random();

        document.body.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    setInterval(createSnowflake, 100);

    // 4. Interactive Countdown Boxes
    const timeBoxes = document.querySelectorAll('.time-box');
    timeBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            // Add wobble effect
            box.classList.remove('wobble');
            void box.offsetWidth; // trigger reflow
            box.classList.add('wobble');

            // Spawn particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.classList.add('break-particles');
                const rect = box.getBoundingClientRect();
                particle.style.left = (e.clientX - rect.left) + 'px'; // Relative to box not perfectly accurate but fine for visual
                particle.style.top = (e.clientY - rect.top) + 'px';

                // Random trajectory
                const tx = (Math.random() - 0.5) * 50 + 'px';
                const ty = (Math.random() - 0.5) * 50 + 'px';
                particle.style.setProperty('--tx', tx);
                particle.style.setProperty('--ty', ty);

                box.appendChild(particle);
                setTimeout(() => particle.remove(), 500);
            }
        });
        // Make sure time-box is relative for absolute particles
        box.style.position = 'relative';
    });
});
