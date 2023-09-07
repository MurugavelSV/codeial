let button = document.getElementById('update-button');
let form = document.querySelector('form');
form.style.display = 'none';
button.addEventListener('click', () => {
    return form.style.display = 'block';
});