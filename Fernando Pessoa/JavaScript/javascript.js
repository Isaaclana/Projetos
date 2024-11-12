let toggle = document.getElementById("dark-light");
let body = document.querySelector("body");

// Função para aplicar o modo slavo no localStorage 
function applySavedMode() {
    const savedMode = localStorage.getItem('theme') || 'light';
    if (savedMode === 'dark') {
        toggle.classList.add('dark');
        body.classList.add('dark');
    } else {
        toggle.classList.remove('dark');
        body.classList.remove('dark');
    };
};

// Alterna entre dark e light mode e salva a preferência
toggle.addEventListener('click', () => {
    const isDarkMode = toggle.classList.toggle('dark');
    body.classList.toggle('dark', isDarkMode);

    // Salva a preferência no localStorage
    const selectedMode = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', selectedMode);    
});

// Aplica o modo salvo ao carregar a página
applySavedMode();