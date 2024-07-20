$(document).ready(function() {
    $(".header__burger").click(function(event) {
        $(".header__burger,.header__menu").toggleClass("active");
        $("body").toggleClass("lock");
    });
    $(".play-button__button").on("mouseenter", function(event) {
        setTimeout(
            function() {
                $(".play-button__img").delay(8000).toggleClass("active");
            }, 500);
    });
    $(".play-button__button").on("mouseleave", function(event) {
        $(".play-button__img").delay(8000).toggleClass("active");
    });
});
// 15:30
// https://youtu.be/chJQofBSx94
// https://youtu.be/chJQofBSx94?t=931