var signin = document.querySelector('.button.is-medium');

signin.addEventListener('click', function(event) {
    document.getElementById("g-icon").hidden = true;
    signin.classList.add('is-loading');
});