// Modals
var rootEl = document.documentElement;
var container = document.querySelector(".container");
var tableRows = container.querySelectorAll("tbody tr");
var modalCloses = document.querySelectorAll(".modal-close");
var bgCloses = document.querySelectorAll(".modal-background");

if (tableRows.length > 0) {
    tableRows.forEach(function (el) {
        var modal = document.querySelector('#'+el.dataset.target);
        el.addEventListener('click', function () {
            modal.classList.add('is-active');
            rootEl.classList.add('is-clipped');
        });
    });
}

if (modalCloses.length > 0) {
    modalCloses.forEach(function (el) {
        el.addEventListener('click', function () {
            el.parentNode.classList.remove('is-active');
            rootEl.classList.remove('is-clipped');
        });
    });
}

if (bgCloses.length > 0) {
    bgCloses.forEach(function (el) {
        el.addEventListener('click', function () {
            el.parentNode.classList.remove('is-active');
            rootEl.classList.remove('is-clipped');
        });
    });
}
