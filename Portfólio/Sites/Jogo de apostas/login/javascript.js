function showAlert(message) {
    document.getElementById("problem-span").textContent = message;
    document.getElementById("alert-box").style.display = 'flex';
}

function closeAlert(){
    document.getElementById("alert-box").style.display = 'none';
}

// Login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    const name = document.getElementById("name").value;
    const check18 = document.getElementById("checkbox18").checked;
    
    if (!name) {
        showAlert("Please insert a name");
        return;
    };

    if(!check18) {
        showAlert("You need to have 18 years or more to create an account!");
        return;
    };
    
    // Salva o nome no localStorage
    localStorage.setItem("name", name);

    // Redireciona para a próxima página
    window.location.href = "../gambling/gambling.html";
});