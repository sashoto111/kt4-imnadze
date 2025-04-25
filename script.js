document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach((slider, index) => {
        const thumb = slider.querySelector('.thumb');
        const value = slider.parentElement.querySelector('.value');
        const track = slider.querySelector('.track');
        const tick = slider.querySelector('.tick');
 let isDragging = false;
        let startX = 0;
        let startLeft = 0;

        const min = 0;
        const max = 100;
        const step = 1;

        const updateValue = (left) => {
            const value = Math.round((left / track.offsetWidth) * (max - min) + min);
            value.textContent = value;
            thumb.style.left = `${(value - min) / (max - min) * 100}%`;
            tick.style.left = `${(value - min) / (max - min) * 100}%`;
        };

        thumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startLeft = thumb.offsetLeft;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const newLeft = startLeft + deltaX;
            const clampedLeft = Math.max(0, Math.min(track.offsetWidth, newLeft));
            updateValue(clampedLeft);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Initial value
        updateValue(0);
    });
});