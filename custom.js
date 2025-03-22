document.querySelector('.apply-customization').addEventListener('click', function() {
    let selectedColor = document.getElementById('color').value;
    let selectedPattern = document.getElementById('pattern').value;

    // Get visible section
    let sections = document.querySelectorAll(".category-section");
    let visibleSection = null;

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            visibleSection = section;
        }
    });

    if (visibleSection) {
        visibleSection.querySelectorAll('.customizable-image').forEach(img => {
            img.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        });
    }
});
