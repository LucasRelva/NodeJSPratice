$(document).ready(function () {
    $('#value').mask('000000000000000,00', { reverse: true });
})

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
})