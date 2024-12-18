document.addEventListener('DOMContentLoaded', function () {
    const text = "Lights Out: An Analysis of Power Outages";
    const titleElement = document.getElementById('animated-title');
    let i = 0;

    // Start in light mode
    document.body.classList.add('light-mode');

    function typeEffect() {
        if (i < text.length) {
            titleElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100); // Adjust typing speed here
        } else {
            // Typing animation complete, remove light mode
            document.body.classList.remove('light-mode');
        }
    }

    typeEffect();
});
