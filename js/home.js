var mm = mm || {};
mm.init = function(){

    mm.resetScroll();
    //mm.autoHideNavbar();
    mm.sidebar.init();

    setTimeout(function(){
        mm.runInstagramFeed();
    }, 3000);
};

mm.resetScroll = function(){
    /* Force scrolling at the top on reload */
    setTimeout(function(){
        console.log('force scroll top!');
        $(document).scrollTop(0);
    }, 300);
};

mm.autoHideNavbar = function(){
    if ($(".navbar").size()) {
        //Show navbar when mouse moves
        $(document).mousemove(function (e) {
            if ($('.navbar').hasClass('navbar-hidden')) {
                $('.navbar').removeClass('navbar-hidden').addClass('navbar-visible');
            }
            var lastMouseMove = new Date().getTime();
            var t = setTimeout(function () {
                if (new Date().getTime() - lastMouseMove > 2000 &&
                    ($(document).scrollTop() >= $('#about').offset().top) && !$('.navbar').is(':hover')) {
                    $('.navbar').removeClass('navbar-visible').addClass('navbar-hidden');
                }
            }, 2000)
        });

        //Show navbar while scrolling
        $(document).scroll(function () {
            $('.navbar.navbar-hidden').removeClass('.navbar-hidden').addClass('navbar-visible');
        });
    }
};

mm.sidebar = mm.sidebar || {};
mm.sidebar.init = function () {
    var self = this;
    $(document).scroll(function () {
        //Show sidebar when needed
        if (($(document).scrollTop() >= $('#rooms').offset().top - 300)
            && $(document).scrollTop() <= $('#ig').offset().top - 500) {
            self.show();
        } else {
            self.hide();
        }
    });
};

mm.sidebar.show = function () {
    $('#sidebar.sidebar-hidden').addClass('sidebar-visible').removeClass('sidebar-hidden');
};

mm.sidebar.hide = function () {
    $('#sidebar.sidebar-visible').addClass('sidebar-hidden').removeClass('sidebar-visible');
};


mm.bindScroll = function () {
    $(document).scroll(function () {

        //Show sidebar when needed
        if(($(document).scrollTop() >= $('#rooms').offset().top - 300)
            && $(document).scrollTop() <= $('#ig').offset().top-500){
            showSidebar();
        }else{
            hideSidebar();
        }

        $('.room-video').each(function(index, video){
            $video = $(video);
            if ($video.is(':in-viewport')){
                if ($video.data('play-status') == 'pause'){
                    video.play();
                }
            }
            else if ($video.data('play-status') == 'play'){
                video.pause();
            }
        });
    });
};

mm.runInstagramFeed = function () {
    $.getScript('/js/instafeed.min.js', function () {
        if (Instafeed) {
            new Instafeed({
                get: 'tagged',
                tagName: 'MYSTERYMANILA',
                clientId: 'b74a7734368849fabe400246441d36f6',
                limit: 18,
                sortBy: 'most-recent',
                template: '<a href="{{link}}" target="_blank" class="col-md-2 col-sm-2 col-xs-6"><img src="{{image}}" /></a>',
                resolution: 'low_resolution',
                after: function(){
                    $("#ig").show();
                }
            }).run();
        }
    });
};

$(function(){
    mm.init();
})

$(function(){


    function setPlaybackStatus(video, status){
        $(video).data('play-status', status);
    }

    $('.room-video').each(function(index, video){
        video.onplaying = function(){
            if ($(video).data('play-status') == 'pause'){
                setPlaybackStatus(video, 'play');
            }
        };
        video.onplay = function(){
            if ($(video).data('play-status') == 'pause'){
                setPlaybackStatus(video, 'play');
            }
        };
        video.onpause = function(){
            setPlaybackStatus(video, 'pause');
        };
    });

    $('.sidebar-item').click(function(){
        $('html, body').animate({scrollTop:$($(this).data('target')).position().top}, 'slow');
    });

    $('.scroll-to-rooms').click(function(event){
        event.preventDefault();
        $('html, body').animate({scrollTop:$('#rooms').position().top}, 'easeInOutExpo');
    });




    $('#glass').css('height', $('#glass-container').css('height'));
});

function scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 'easeInOutExpo');
}

