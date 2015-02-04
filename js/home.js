var mm = mm || {};
mm.init = function(){

    mm.resetScroll();
    //mm.autoHideNavbar();
    mm.sidebar.init();
    mm.initVideos();
    mm.initScrollToTopLinks();
    mm.initGlass();
    mm.initBookNowLinks();
    mm.initScrollToRooms();
    $('body').trigger('scroll');

    setTimeout(function(){
        mm.runInstagramFeed();
    }, 3000);
};

mm.initScrollToRooms = function () {
    $('.scroll-to-rooms').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#rooms').position().top}, 'easeInOutExpo');
    });
};

mm.resetScroll = function(){
    /* Force scrolling at the top on reload */
    setTimeout(function(){
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

    $('.sidebar-item').click(function(){
        $('html, body').animate({scrollTop:$($(this).data('target')).position().top}, 'slow');
    });
};

mm.sidebar.show = function () {
    $('#sidebar.sidebar-hidden').addClass('sidebar-visible').removeClass('sidebar-hidden');
};

mm.sidebar.hide = function () {
    $('#sidebar.sidebar-visible').addClass('sidebar-hidden').removeClass('sidebar-visible');
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

mm.initGlass = function () {
    $('#glass').height($('#glass-container').height() * 1.2);
};

mm.initVideos = function () {
    if ($(window).width() >= 500) {
        $(document).scroll(function () {
            $('.room-video').each(function (index, video) {
                $video = $(video);
                if ($video.is(':in-viewport')) {
                    video.play();
                } else if (!video.paused) {
                    video.pause();
                }
            });
        });
    }
};

mm.initScrollToTopLinks = function(){
    $(document).on('click', '.scroll-to-top', function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 'easeInOutExpo');
    });
};

mm.initBookNowLinks = function() {
    $(document).on('click', '.book-now', function (e) {
        e.preventDefault();
        var width = 800;
        var height = 520;
        var left = (screen.width / 2) - (width / 2);
        var top = (screen.height / 2) - (height / 2);
        var options = 'width=' + width + ',height=' + height + ',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no,left=' + left + ',top=' + top;
        window.open('http://www.mysterymanila.com/booknow.php', 'book_window', options);
    });
};

$(function(){
    mm.init();
})


/*social media*/
   <!-- tripadvisory -->
    <script src="http://www.jscache.com/wejs?wtype=socialButtonReviews&amp;uniq=813&amp;locationId=7142887&amp;color=green&amp;size=rect&amp;lang=en_PH&amp;display_version=2">
    </script>

    <!-- facebook -->
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>

    <!-- instagram -->
    <script>(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src="http://instagramfollowbutton.com/components/instagram/v2/js/ig-follow.js";s.parentNode.insertBefore(g,s);}(document,"script"));
    </script>
    <!-- twitter -->
    <script>window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
    </script>