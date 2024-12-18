document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('animated-title');
    const text = "LIGHTS OUT";
    let index = 0;
    
    // Make title visible
    titleElement.style.visibility = 'visible';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    titleElement.appendChild(cursor);

    // Type out text
    function typeText() {
        if (index < text.length) {
            titleElement.insertBefore(
                document.createTextNode(text[index]),
                cursor
            );
            index++;
            setTimeout(typeText, 100);
        } else {
            // After typing finishes, wait 1 second then turn lights out
            setTimeout(turnLightsOut, 1000);
        }
    }

    function turnLightsOut() {
        // Add dark theme class to body
        document.body.classList.add('lights-out');
        
        // Make content visible
        const content = document.querySelector('.content-container');
        if (content) {
            content.classList.add('visible');
        }

        // Optional: remove cursor after lights out
        setTimeout(() => {
            cursor.style.display = 'none';
        }, 1000);
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);
});