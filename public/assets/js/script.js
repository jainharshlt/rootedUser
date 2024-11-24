

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#topHead').addClass('background');
    } else {
        $('#topHead').removeClass('background');
    }
});

$(document).ready(function() {
    $('.boxsize input[type="radio"]').click(function() {
        window.location.href = 'subscription-diet-type#DietType';
    });
    $('#DietType input[type="radio"]').click(function() {
        window.location.href = 'subscription-cuisine#Cuisine';
    });
});