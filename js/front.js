var mm = mm || {};
mm.init = function(){

    
    //mm.autoHideNavbar();
    var width = $('.placeholder').width();
    $('.placeholder').each(function(){
        $(this).css('height', width);   
    });
    //mm.resetScroll();
    mm.initFAQ();
    mm.navbar.init();
    mm.sidebar.init();
    mm.initVideos();
    mm.initScrollToTopLinks();
    mm.initGlass();
    mm.initBookNowLinks();
    mm.initScrollToTeaser();
    mm.initQuotesRotator();
    mm.initEaseBranches();
    mm.initEaseBoracay();
    $('body').trigger('scroll');

    setTimeout(function(){
        mm.runInstagramFeed(),
        mm.runFacebookWidget(),
        mm.runTwitterWidget()
        /*mm.runInstagramWidget();*/
        /*mm.runTripAdvisoryWidget();*/
    }, 3000);
};

mm.initEaseBranches = function(){
    $('.brand-logo-button').click(function(){
        $(this).parent().find('li').each(function(index){
            $(this).toggleClass("transition" + (index + 1));
        });
    });
};

mm.initEaseBoracay = function(){
    $('.boracay-logo-button').click(function(){
        $(this).parent().find('li').each(function(index){
            $(this).toggleClass("transition" + (index + 4));
        });
    });
};

mm.initQuotesRotator = function(){
    $( '#cbp-qtrotator' ).cbpQTRotator();
};

mm.initScrollToTeaser = function () {
    $('#scroll-to-teaser').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#teaser').position().top}, 'easeInOutExpo');
    });
};

mm.resetScroll = function(){
    /* Force scrolling at the top on reload */
    setTimeout(function(){
        $(document).scrollTop(0);
    }, 300);
};

mm.lastMouseMove = mm.lastMouseMove || new Date().getTime();
mm.mouseMoveWait = mm.mouseMoveWait || 5000;

mm.navbar = mm.navbar || {};
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

mm.initAutoHideNavbar = function(){
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

mm.sidebar = mm.sidebar || {};
mm.sidebar.init = function () {
    var self = this;

    $(document).scroll(function () {
        //Show sidebar when needed
        if (($(document).scrollTop() >= $('#rooms').offset().top - 100)
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
                success: function(feed){
                    var data = feed.data.reverse();
                    $('.placeholder').each(function(index, placeholder){
                        var model = data.pop();
                        $(placeholder).html('<a href="'+ model.link +'" target="_blank">'
                                + '<img src="'+ model.images.low_resolution.url +'" /></a>').hide().fadeIn();
                    });
                }
            }).run();
        }
    });
};



mm.initGlass = function () {
    $('#glass').height($('#glass-container').height() * 1.2);
};

mm.initVideos = function () {
    if (true || $(window).width() >= 500) {
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
        window.open($(this).attr('href'), 'book_window', options);
    });
};

mm.initFAQ = function() {
    $(document).on('click', '.questions li a', function(e){
        e.preventDefault();
        $question = $(e.target);

        $('.answer').slideUp(300);
        $($question.attr('href')).fadeIn(300);
        $('.questions li').removeClass('active');
        $question.parents().eq(2).addClass('active');
        setTimeout(function(){
            $('html, body').animate({scrollTop: $question.parents(2).offset().top - 96}, 'easeInOutExpo');
        }, 300);
    });
}



$(function(){
    mm.init();
})



/*social media*/

/*mm.runTripAdvisoryWidget = function () {
    $.getScript('http://www.jscache.com/wejs?wtype=socialButtonReviews&amp;uniq=813&amp;locationId=7142887&amp;color=green&amp;size=rect&amp;lang=en_PH&amp;display_version=2');
};*/

mm.runFacebookWidget = function () {
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));    
};

mm.runTwitterWidget = function () {
    window.twttr= $.getScript('https://platform.twitter.com/widgets.js',function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};
        if(d.getElementById(id))return;
        js=d.createElement(s);js.id=id;
        fjs.parentNode.insertBefore(js,fjs);
        t._e=[];t.ready=function(f){
            t._e.push(f);};return t;
        }(document,"script","twitter-wjs"));

};

mm.runInstagramWidget = function () {
    $.getScript('http://instagramfollowbutton.com/components/instagram/v2/js/ig-follow.js', function(d,t){
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        s.parentNode.insertBefore(g,s);
    }(document,"script"));
}