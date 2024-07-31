/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Leverage - Have a real factory of creative templates in your hands.
* Version  : 1.1.0
* Author   : Codings
* Support  : adm.codings@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Responsive Menu
2. Navigation 
3. Slides 
4. Gallery
5. Sign and Register Form
6. Multi-Step Form 
7. Submission Parameters 

----------------------------------------------*/

/*----------------------------------------------
1. Responsive Menu
----------------------------------------------*/

$(function () {

    'use strict';

    $(window).on('resize', function () {
        //navResponsive();
    })

    $(document).on('click', '#menu .nav-item a', function () {

        $('#menu').modal('hide');
    })
/*
    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');

        navbar.clone().appendTo(menu);
    }

    navResponsive();*/
})

/*----------------------------------------------
2. Navigation
----------------------------------------------*/

$(function () {

    'use strict';

    var position = $(window).scrollTop();
    var toTop = $('#scroll-to-top');
    var last_direction_scroll = "abajo";
    var last_position_scroll = 0;

    toTop.hide();

    $(window).scroll(function () {

        if ($("#slider").length > 0) {
            $("html").addClass('es_home');
        } else {
            $("html").removeClass('es_home');
        }

        let scroll = $(window).scrollTop();
        let navbar = $('.navbar');
        if (scroll > 84) {
            $("html").addClass('con_sombra');
            if($(".header_tools").length>0){
                $("html").addClass('con_sombra_tools');
            }
        }else{
            $("html").removeClass('con_sombra');
            $("html").removeClass('con_sombra_tools');
        }

        /*
        if (scroll > 84) {
            $(".header_tools").addClass('true_sticky');
            $("html").addClass('true_sticky');
            if ($(".header_tools").hasClass("never_sticky")) {
                $("html").addClass('never_sticky');
            } else {
                $("html").removeClass('never_sticky');
            }
        } else {
            $(".header_tools").removeClass('true_sticky');
            $("html").removeClass('true_sticky');
            if ($(".header_tools").hasClass("never_sticky")) {
                $("html").addClass('never_sticky');
            } else {
                $("html").removeClass('never_sticky');
            }
        }


        if (!navbar.hasClass('relative')) {

            if (scroll > position) {
                var cantidad_scroll = 0;
                if (last_direction_scroll == "abajo") {
                    cantidad_scroll = position - last_position_scroll;
                } else {
                    last_direction_scroll = "abajo";
                    last_position_scroll = $(window).scrollTop();
                }
                if (cantidad_scroll > 150) {


                    if (window.screen.width >= 767) {

                        navbar.fadeOut('fast');
                        $("html").removeClass('navbar-sticky');
                        if ($(".header_tools").hasClass("never_sticky")) {
                            $("html").addClass('never_sticky');
                        } else {
                            $("html").removeClass('never_sticky');
                        }

                    } else {

                        navbar.addClass('navbar-sticky');
                        $("html").addClass('navbar-sticky');
                        if ($(".header_tools").hasClass("never_sticky")) {
                            $("html").addClass('never_sticky');
                        } else {
                            $("html").removeClass('never_sticky');
                        }
                    }

                    toTop.fadeOut('fast');
                    $("html").removeClass('navbar-sticky');
                    if ($(".header_tools").hasClass("never_sticky")) {
                        $("html").addClass('never_sticky');
                    } else {
                        $("html").removeClass('never_sticky');
                    }
                }

            } else {
                var cantidad_scroll = 0;
                if (last_direction_scroll == "arriba") {
                    cantidad_scroll = last_position_scroll - position;
                } else {
                    last_direction_scroll = "arriba";
                    last_position_scroll = $(window).scrollTop();
                }
                if (cantidad_scroll > 150) {

                    if (position < 76) {

                        navbar.slideDown('fast').removeClass('navbar-sticky');
                        $("html").addClass('navbar-sticky');
                        if ($(".header_tools").hasClass("never_sticky")) {
                            $("html").addClass('never_sticky');
                        } else {
                            $("html").removeClass('never_sticky');
                        }

                    } else {

                        navbar.slideDown('fast').addClass('navbar-sticky');
                        $("html").addClass('navbar-sticky');
                        if ($(".header_tools").hasClass("never_sticky")) {
                            $("html").addClass('never_sticky');
                        } else {
                            $("html").removeClass('never_sticky');
                        }
                    }


                    if (position > 1023) {

                        if (window.screen.width >= 767) {

                            toTop.fadeIn('fast');
                        }

                    } else {

                        toTop.fadeOut('fast');

                    }

                }
            }

            position = scroll;

        }*/
    })

    $(document).on('click', '.smooth-anchor', function (event) {

        if ($.attr(this, 'href').split("#")[0] == document.location.pathname) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $("#" + $.attr(this, 'href').split("#")[1]).offset().top
            }, 500);
        }


    })

    $(document).on('click', '.smooth-anchor-pregunta', function (event) {

        event.preventDefault();

        $('html, body').animate({

            scrollTop: $($.attr(this, 'href')).offset().top - 300

        }, 500);
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {

            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {

            dropdown.parent().find('.nav-link').first().removeClass('active');

        })
    })
})

/*----------------------------------------------
3. Slides
----------------------------------------------*/

function animationSlide(slider) {
    let image = $(slider + ' .swiper-slide-active img');
    let title = $(slider + ' .title');
    let description = $(slider + ' .description');
    let btn = $(slider + ' .btn');
    let nav = $(slider + ' nav');

    image.toggleClass('aos-animate');
    title.toggleClass('aos-animate');
    description.toggleClass('aos-animate');
    btn.toggleClass('aos-animate');
    nav.toggleClass('aos-animate');

    setTimeout(() => {

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');
        AOS.init();

    }, 100)

    if ($('.full-slider').hasClass('animation')) {

        $('.full-slider .left').addClass('off');
        $('.full-slider .left').removeClass('init');

        setTimeout(() => {

            $('.full-slider .left').removeClass('off');

        }, 200)

        setTimeout(() => {

            $('.full-slider .left').addClass('init');

        }, 1000)

    } else {

        $('.full-slider .left').addClass('init');
    }
}

function loadSlides() {
    var sliderDisabled = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: () => {
                animationSlide('.no-slider')
            }
        }
    })
}

function updateMenu() {

    AOS.init();
}

$(function () {

    'use strict';
    /*
        var fullSlider = new Swiper('.full-slider', {

            autoplay: {
                delay: 5000,
            },
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: '.swiper-pagination'
            },
            navigation: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false
            },
            on: {
                init: () => {

                    animation('.full-slider')

                    let pagination = $('.full-slider .swiper-pagination');

                    pagination.hide();

                    setTimeout(() => {

                        pagination.show();

                    }, 2000)

                },
                slideChange: () => {

                    animation('.full-slider')
                }
            }
        })

        var midSlider = new Swiper('.slider-mid', {

            autoplay: false,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1023: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        })

        var minSlider = new Swiper('.slider-min', {

            autoplay: {
                delay: 5000,
            },
            loop: true,
            slidesPerView: 2,
            spaceBetween: 15,
            breakpoints: {
                424: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1023: {
                    slidesPerView: 4,
                    spaceBetween: 15
                },
                1199: {
                    slidesPerView: 5,
                    spaceBetween: 15
                }
            },
            pagination: false,
        })

        var sliderDisabled = new Swiper('.no-slider', {

            autoplay: false,
            loop: false,
            keyboard: false,
            grabCursor: false,
            allowTouchMove: false,
            on: {
                init: () => {
                    animationSlide('.no-slider')
                }
            }
        })
        */
})

/*----------------------------------------------
4. Gallery
----------------------------------------------*/

$(function () {

    'use strict';

    $('.gallery').lightGallery({
        thumbnail: false,
        share: false
    })
})

/*----------------------------------------------
5. Sign and Register Form
----------------------------------------------*/

$(document).on('click', 'a[data-target="#register"]', function () {

    $('#sign').modal('hide');
})

$(document).on('click', 'a[data-target="#sign"]', function () {

    $('#register').modal('hide');
})

/*----------------------------------------------
6. Multi-Step Form
----------------------------------------------*/

$(function () {

    'use strict';

    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    $('#msform').css('height', $('#msform').height());

    function next(button, group, show, hide) {

        $(document).on('click', button, function () {

            $(group + ' .form-control').each(function () {

                var minlength = $(this).attr('minlength');

                if ($(this).val() == null || $(this).val() == '') {

                    var value = 0;

                } else {

                    var value = $(this).val().length;
                }

                if (Number(minlength) <= Number(value)) {

                    $(this).removeClass('invalid').addClass('valid');

                } else {

                    $(this).removeClass('valid').addClass('invalid');
                }
            })

            let field = $(group).find('.form-control').length;
            let valid = $(group).find('.valid').length;

            if (field == valid) {

                if (animating) return false;
                animating = true;

                current_fs = $(this).parents().eq(1);
                next_fs = $(this).parents().eq(1).next();

                $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

                next_fs.show();

                current_fs.animate({

                    opacity: 0

                }, {
                    step: function (now, mx) {

                        scale = 1 - (1 - now) * 0.2;
                        left = (now * 50) + '%';
                        opacity = 1 - now;

                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'position': 'absolute'
                        })

                        next_fs.css({
                            'left': left,
                            'opacity': opacity
                        })
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    easing: 'easeInOutBack'
                })

                $(hide).hide();
                $(show).show();

                if (button == '#next-2') {
                    $('#progressbar').addClass('complete');
                }

                if (button == '#next-3') {

                    $('.form .intro').css('opacity', '0');
                    $(button).parents().eq(5).find('.message').addClass('active');

                    // Here the form is sent.
                    $('#msform').submit();
                }
            }
        })

    }

    next('#next-1', '#group-1', '#step-2, #text-2', '#step-1, #text-1');
    next('#next-2', '#group-2', '#step-3, #text-3', '#step-2, #text-2');
    next('#next-3', '#group-3', '#step-4', '#step-3');

    function prev(button, show, hide) {

        $(document).on('click', button, function () {

            if (animating) return false;
            animating = true;

            current_fs = $(this).parents().eq(1);
            previous_fs = $(this).parents().eq(1).prev();

            $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

            previous_fs.show();
            current_fs.animate({

                opacity: 0

            }, {
                step: function (now, mx) {

                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + '%';
                    opacity = 1 - now;

                    current_fs.css({

                        'left': left
                    })

                    previous_fs.css({

                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    })
                },
                duration: 800,
                complete: function () {

                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            })

            $(hide).hide();
            $(show).show();

            if (button == '#prev-3') {
                $('#progressbar').removeClass('complete');
            }
        })
    }

    prev('#prev-2', '#step-1, #text-1', '#step-2, #text-2');
    prev('#prev-3', '#step-2, #text-2', '#step-3, #text-3');
})

/*----------------------------------------------
7. Submission Parameters
----------------------------------------------*/
$(function () {

    'use strict';

    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $('#msform').submit(function (event) {

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find('input, select, button, textarea');

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request
        // Note: we disable elements AFTER the form data has been serialized
        // Disabled form elements will not be serialized
        $inputs.prop('disabled', true);

        // Fire off the request
        request = $.ajax({
            url: 'php/mail.php', // Enter your back-end URL here
            type: 'post',
            data: serializedData
        })

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {

            // Log a message to the console
            //console.log('Hooray, it worked!');
        })

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {

            // Log the error to the console
            //console.error(textStatus, errorThrown);
        })

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {

            // Reenable the inputs
            $inputs.prop('disabled', false);
        })
    })
})


$(document).tooltip({
    content: function () {
        if ($(this).closest(".formEditPregunta").length > 0) {
            return false;
        } else if ($(this).closest(".tox-tinymce-aux").length > 0) {
            return false;
        } else {
            return $(this).prop('title');

        }
    }
});
/*----------------------------------------------
4. Progress Bar
----------------------------------------------*/

function enableTooltip() {

}

function scrollToTop() {
    $('html, body').animate({scrollTop: 0}, 800);
}

function scrollToTopIn0() {
    $('html, body').animate({scrollTop: 0}, 0, "", function () {
        $(window).scroll();
    });
}

function initCounterReact(n_preguntas) {
    initCounter('.counter.skills', '.counter.skills .radial', 0, n_preguntas)
}

function initCounterReactInit(n_preguntas) {
    initCounter('.counter.skills', '.counter.skills .radial', 200, n_preguntas)
}

function initCounter(section, item, duration, n_preguntas) {
    $(".counter.skills .radial").each(function () {

        var percent = $(this).attr("data-percent");

        //console.log(n_preguntas)

        $("#tiempo_total").html(" Tiempo total:  <b>" + secondsText(54 * n_preguntas) + "</b>")


        porcentaje1 = 100 / (54 * n_preguntas) * percent;

        var pcolor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        var scolor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
        if (check_5_min((54 * n_preguntas) - ((54 * n_preguntas) / 100 * porcentaje1))) {
            $(".item_reloj").addClass("red");
            pcolor = 'rgba(255, 0, 0, 1)';
            scolor = 'rgba(255, 0, 0, 1)';
        } else {
            $(".item_reloj").removeClass("red");
        }


        if (percent > 0) {
            porcentaje2 = 100 / (54 * n_preguntas) * (percent - 1);
        } else {
            porcentaje2 = 0;
        }


        if ($(section).hasClass('odd')) {
            var tmode = 'rgba(255, 255, 255, 0.075)';
        } else {
            var tmode = 'rgba(0, 0, 0, 0.075)';
        }

        if ($(section).hasClass('preloader') || $(section).hasClass('skills')) {
            var symbol = '<i>%</i>';
        } else {
            var symbol = '';
        }

        $(this).radialProgress({
            value: porcentaje1 / 100,
            animationStartValue: porcentaje2 / 100,
            startAngle: -(Math.PI / 2),
            size: 80,
            thickness: 5,
            lineCap: 'butt',
            emptyFill: tmode,
            animation: {
                duration: duration,
                easing: "radialProgressEasing"
            },
            fill: {
                gradient: [[pcolor, 0.1], [scolor, 1]],
                gradientAngle: Math.PI / 4
            }
        })
    })
}

function secondsToHms(d) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? this.pad(h, 2) + (h == 1 ? ":" : ":") : "00:";
    var mDisplay = m > 0 ? this.pad(m, 2) + (m == 1 ? ":" : ":") : "00:";
    var sDisplay = s > 0 ? this.pad(s, 2) + (s == 1 ? "" : "") : "00";
    return hDisplay + mDisplay + sDisplay;
}

function pad(str, max) {
    return str.length < max ? pad("0" + str, max) : str;
}

function secondsText(d) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var texto = "";
    var textohora = "hora";
    if (h > 1) {
        textohora = "horas"
    }
    var textominuto = "minuto";
    if (m > 1) {
        textominuto = "minutos"
    }
    if (h > 0 && m > 0) {
        texto += h + " " + textohora + " y " + m + " " + textominuto
    } else if (h > 0 && m == 0) {
        texto += h + " " + textohora
    } else if (h == 0 && m > 0) {
        texto += m + " " + textominuto
    }
    return texto;
}

function check_5_min(d) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    if (h == 0 && m < 5) {
        return true;
    } else if (s < 0 || m < 0 || h < 0) {
        return true;
    } else {
        return false;
    }
}