// Modals
var tableRow = document.querySelector('.test-modal');
var modal = document.querySelector('#'+tableRow.dataset.target);
var modalClose = document.querySelector(".modal-close");
var bgClose = document.querySelector(".modal-background");

tableRow.addEventListener('click', function(event) {
    modal.classList.add('is-active');
});
modalClose.addEventListener('click', function(event) {
    modal.classList.remove('is-active');
});
bgClose.addEventListener('click', function(event) {
    modal.classList.remove('is-active');
});