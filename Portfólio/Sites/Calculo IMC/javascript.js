    // Theme of the site (light and dark mode)
    let toggle = document.getElementById('theme');
    let body = document.querySelector('body');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('dark');
        body.classList.toggle('dark');
    });

    // Prevent any letters on the input
    document.getElementById('height-info').addEventListener('keypress', function(event) {
        if (!/[0-9,.]/.test(event.key)) {
            event.preventDefault();
        }
    });

    document.getElementById('weight-info').addEventListener('keypress', function(event) {
        if (!/[0-9,.]/.test(event.key)) {
            event.preventDefault();
        }
    });

    // Limit the max of number on the input
    document.getElementById('height-info').addEventListener('input', function() {
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        }
    });

    document.getElementById('weight-info').addEventListener('input', function() {
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }
    });

    // Clean everything on the conteiner when refreshed
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('height-info').value = '';
        document.getElementById('weight-info').value = '';
        document.getElementById('bmi').innerText = '';
        document.getElementById('text-desc').innerText = '';
    })

    // Buttons script
    document.getElementById('info-btn').addEventListener('click', () => {
        document.getElementById('info-box').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';
    });

    function clearAll() {
        document.getElementById('height-info').value = '';
        document.getElementById('weight-info').value = '';
        document.getElementById('bmi').innerText = '';
        document.getElementById('text-desc').innerText = '';
    };

    document.getElementById('info').addEventListener('submit', function(event) {
        event.preventDefault();

        const height = parseFloat(document.getElementById('height-info').value.replace(',', '.'));
        const weight = parseFloat(document.getElementById('weight-info').value.replace(',', '.'));
        const bmiCalc = (weight / Math.pow(height, 2));
        let description = '';

        if (bmiCalc < 18.85) {
            description = "You're underweight!. We recommend to do a diet and workout to improve your BMI.";

        } else if (bmiCalc < 25) {
            description = "You're good! Keep doing the good work and maintain your BMI.";
        } else if (bmiCalc < 30)  {
            description = "You're a little overweight! It would be recommended to do some workout.";
        } else {
            description = "You're overweight! Please, if possible, start a diet and start to exercise your body."
        }

        document.getElementById('text-desc').textContent = description;
        document.getElementById('bmi').textContent = bmiCalc.toFixed(2);
    });