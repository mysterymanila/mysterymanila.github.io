var mm = "" || {}
mm.initMain = function(){
    mm.closeBurger();
    mm.navbar.init();
}

mm.closeBurger = function(){
    $('body').bind('click', function(e) {
        if($(e.target).closest('.navbar').length == 0) {
            // click happened outside of .navbar, so hide
            var opened = $('.navbar-collapse').hasClass('collapse in');
            if ( opened === true ) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
};


mm.initAutoHideNavbar = function(){
    mm.navbar.show = function(){
        if ($('.navbar').hasClass('navbar-hidden')) {
            $('.navbar').removeClass('navbar-hidden').addClass('navbar-visible');
        }
    }
    mm.navbar.hide = function(){
        if (!$('.navbar').hasClass('navbar-hidden')){
            $('.navbar').removeClass('navbar-visible').addClass('navbar-hidden');
        }
    }
    mm.navbar.autoHide = function(){
        mm.lastMouseMove = new Date().getTime();
        var t = setTimeout(function () {
            if (new Date().getTime() - mm.lastMouseMove > mm.mouseMoveWait &&
                ($(document).scrollTop() >= $('#teaser').offset().top) && !$('.navbar').is(':hover')) {
                mm.navbar.hide();
            }
        }, mm.mouseMoveWait);
    };

    if ($(".navbar").size()) {
        //Show navbar when mouse moves
        $(document).mousemove(function (e) {
            mm.navbar.show();
            mm.navbar.autoHide();
        });
        //Show navbar while scrolling
        $(document).scroll(function () {
            mm.navbar.show();
        });
    }
};

mm.navbar.init = function(){
    $(document).on('click', '.navbar-nav li a', function(e){
        e.preventDefault();
        var target = $($(this).attr('href'));
        var top = target.offset().top;
        $('html, body').animate({scrollTop: top - 32 }, 'easeInOutExpo', function(){
            var adjustedTop = target.offset().top;
            $('html, body').animate({scrollTop: adjustedTop - 32});
        });
    });
    mm.initAutoHideNavbar();
};
$(function(){
    mm.initMain();
})