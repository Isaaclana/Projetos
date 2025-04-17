// Retrieves previously stored username
let currentUser = localStorage.getItem("name");

// If the username has changed or does not exist, we reset the points
const storedUser = localStorage.getItem("currentUser");
if (!storedUser || storedUser !== currentUser) {
    localStorage.setItem("currentUser", currentUser); // Atualiza o nome do usuário salvo
    localStorage.setItem("points", 50); // Reseta os pontos
}

// User
if (currentUser) {
    document.getElementById("user-name").textContent = currentUser;
    document.getElementById("user-name-explanation").textContent = currentUser;
}

// Retrieves points from localStorage if they exist; otherwise, sets 50
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 50;

// If reset was requested, we reset the points and remove the flag
if (localStorage.getItem("resetFlag") === "true") {
    points = 50;
    localStorage.removeItem("resetFlag");
    localStorage.setItem("points", points);
}

document.getElementById("points").textContent = points;

function salvarPontos() {
    localStorage.setItem("points", points);
}

// Alert box
function showAlert(message) {
    document.getElementById("problem-span").textContent = message;
    document.getElementById("alert-box").style.display = 'flex';
}

function closeAlert() {
    document.getElementById("alert-box").style.display = 'none';
}

// Start the game after the confirmation
document.getElementById("btn-confirm").addEventListener("click", function() {
    document.getElementById("explanation-area").style.display = 'none';
    document.getElementById("bet-area").style.display = 'flex';
})

// Prevent any letter on the input
document.getElementById("bet-dice").addEventListener("keypress", function(event) {
    if (event.key < "0" || event.key > "9") {
        event.preventDefault();
    }
});

document.getElementById("bet-value").addEventListener("keypress", function(event) {
    if (event.key < "0" || event.key > "9") {
        event.preventDefault();
    }
});

document.getElementById("bet-dice").addEventListener("input", function() {
    if (this.value.length > 2) {
        this.value = this.value.slice(0, 2);
    }
});

// Gambling script to roll the dices
function rollDices() {
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').value = dice1Value;
    document.getElementById('dice2').value = dice2Value;

    return dice1Value + dice2Value;
}

// Box to reset the game
function verificarDerrota() {
    if (points <= 0) {
        document.getElementById("reset-box").style.display = 'block';
        document.getElementById("bet-area").style.display = 'none'
    }
}

function reset() {
    localStorage.setItem("resetFlag", "true");
    location.reload();
}

function noReset() {
    localStorage.removeItem("currentUser"); // Remove current user to reset points when switching
    window.location.href = "../login/login.html";
}

document.getElementById("betting").addEventListener("submit", function(event) {
    event.preventDefault();

    const diceBetValue = parseInt(document.getElementById("bet-dice").value);
    const betValue = parseInt(document.getElementById("bet-value").value);

    if (isNaN(betValue) || betValue <= 0) {
        showAlert("Please enter a valid bet amount");
        return;
    } else if (betValue > points) {
        showAlert("You don't have enough points to place this bet.");
        return;
    }

    if (isNaN(diceBetValue) || diceBetValue <= 0) {
        showAlert("Please enter a valid guess amount");
        return;
    }

    const diceSum = rollDices();

    // Verifica se o usuário tem pontos suficientes
    points -= betValue;
    document.getElementById("points").textContent = points;
    salvarPontos();

    // Agora, verifica se o usuário ganhou ou perdeu após a atualização dos pontos
    if (diceSum === diceBetValue) {
        let winBet = "Congratulations! You won the bet.";
        document.getElementById("message").style.color = 'green';
        document.getElementById('message').innerHTML = winBet;
        points += betValue * 3;  // Adiciona os pontos ganhos
        document.getElementById("points").textContent = points;
        salvarPontos();
    } else {
        let lostBet = `You lost the bet. The dice sum was ${diceSum}.`;
        document.getElementById("message").style.color = 'red';
        document.getElementById('message').innerHTML = lostBet;
    }

    verificarDerrota();
});
