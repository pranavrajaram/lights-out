document.addEventListener('DOMContentLoaded', function () {
    const text = "Lights Out: An Analysis of Power Outages";
    const titleElement = document.getElementById('animated-title');
    let i = 0;

    function typeEffect() {
        if (i < text.length) {
            titleElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, 100); // Adjust typing speed here
        }
    }

    typeEffect();
});
