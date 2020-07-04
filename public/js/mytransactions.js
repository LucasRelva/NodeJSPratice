$(document).ready(function () {
    $('.money').mask('000.000.000.000.000,00', { reverse: true });
})

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
})

    