window.addEventListener('scroll', function () {
    const reveal = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveal.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight) {
            element.classList.add('show');
        }
    });
});