var mm = mm || {};
mm.init = function(){

    //mm.autoHideNavbar();
    var width = $('.placeholder').width();
    $('.placeholder').each(function(){
        $(this).css('height', width);   
    });
    mm.scrollNavbarLinks();
    // mm.resetScroll();
    mm.initFAQ();
    mm.initFAQ2();
    mm.closeBurger();
    mm.navbar.init();

    //mm.sidebar.init();
    //mm.initVideos();
    mm.initScrollToTopLinks();
    mm.initGlass();
    //mm.initBookNowLinks();
    //mm.initScrollToTeaser();
    mm.initQuotesRotator();
    //mm.initEaseBranches();
    //mm.initScrollBranches();
    //mm.initBranchesMouseOver();
    mm.runInstagramFeed();
    $('body').trigger('scroll');

    //setTimeout(function(){
    //    mm.runFacebookWidget(),
    //    mm.runTwitterWidget()
    //}, 3000);
};


mm.scrollNavbarLinks = function () {
    $('.navbar-menu a').on('click', function(e){
        
        var $anchor = $(this);
        // console.log($(this).innerText);
        if($(this)[0].innerText=='PROMIL®'){ 
            window.location.href = "https://www.mysterymanila.com/events/promil";
        } else {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 66
            }, 1500, 'easeInOutExpo');
        }    
        
    });
};

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

mm.initBranchesMouseOver = function(){
  $('.branches-icon .branch-label').hide();
  $('.branches-icon').on('mouseenter', function(){
     $(this).find('.branch-button .branches-icon').css({opacity:1})
     $(this).find('.branch-label').fadeIn(100);
  });
  $('.branches-icon').on('mouseleave', function(){
     $(this).find('.branch-button .branches-icon').css({opacity:0.5})
     $(this).find('.branch-label').fadeOut(100);
  });
};

mm.initScrollBranches = function(){
    $('.branch-name-btn').click(function(){
        $('html, body').animate({scrollTop:$($(this).data('target')).position().top}, 'slow');
    });
};

mm.initEaseBranches = function() {

    $('.branches-button-container > a').click(function(event){
      event.stopPropagation();
      event.preventDefault();
      var $self = $(this);
      var $branch = $(this).closest('.branches-button-container');
      $('.branches-button-container').not($branch).find('li').removeClass();
      var numberOfBranch = $branch.find('li').size();
      $branch.find('li').each(function(index){
        $(this).toggleClass('transition'+(index+1)+'-'+numberOfBranch);
      });
    });

    $(document).on("click", function() {
        $('.branches-button-container li').removeClass();
    });

};

mm.initQuotesRotator = function(){
    $( '#cbp-qtrotator' ).cbpQTRotator();
};

//mm.initScrollToTeaser = function () {
//    $('#scroll-to-teaser').click(function (event) {
//        event.preventDefault();
//        $('html, body').animate({scrollTop: $('#teaser').position().top}, 'easeInOutExpo');
//    });
//};

mm.resetScroll = function(){
    /* Force scrolling at the top on reload */
    setTimeout(function(){
        $(document).scrollTop(0);
    }, 300);
};

mm.lastMouseMove = mm.lastMouseMove || new Date().getTime();
mm.mouseMoveWait = mm.mouseMoveWait || 5000;

mm.sidebar = mm.sidebar || {};
mm.sidebar.init = function () {
    var self = this;
    $(document).scroll(function () {

        var scrollTop = $(document).scrollTop();

        //Show sidebar when needed
        if ((scrollTop >= $('#rooms').offset().top - 100)
            && scrollTop <= $('#ig').offset().top - 500) {

            self.show();

            var nearest = _.min($('.room h2'), function(room){
                var diff = $(room).offset().top - scrollTop;
                if( diff < 0 ){
                    return;
                }else{
                    return diff;
                }
            });

            var nearestBranch = $(nearest).closest('.room').data('branch');

            $('.sidebar-branch').not('.sidebar-branch-'+nearestBranch).hide();
            $('.sidebar-branch-'+nearestBranch).show();

        } else {
            self.hide();
        }
    });

    $('.sidebar-item').click(function(){
        $('html, body').animate({scrollTop:$($(this).data('target')).position().top}, 'slow');
    });
    $('.branch-item').click(function(){
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
                clientId: '0cd51b94022a49f0be1e4b114f24a9ea',
                accessToken: '1162756535.0cd51b9.7b8b57dd36494ff08f9e4e5c976742b7',
                limit: 18,
                sortBy: 'most-recent',
                template: '<a href="{{link}}" target="_blank" class="col-md-2 col-sm-2 col-xs-6"><img src="{{image}}" /></a>',
                resolution: 'low_resolution',
                success: function(feed){
                    var data = feed.data.reverse();
                    $('.placeholder').each(function(index, placeholder){
                        var model = data.pop();
                        $(placeholder).html(
                            '<a href="'+ model.link +'" target="_blank">'
                            + '<img src="'+ model.images.low_resolution.url +'" />'
                            + '</a>').hide().fadeIn();
                    });
                }
            }).run();
        }
    });
};

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
    $(document).on('click', '.navbar-nav li .navbar-item', function(e){
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




mm.initGlass = function () {
    $('#glass').height($('#glass-container').height() * 1.2);
};

mm.initVideos = function () {
    var MIN_WIDTH_SCREEN_FOR_VIDEOS = 767
    if ($(window).width() >= MIN_WIDTH_SCREEN_FOR_VIDEOS) {
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
        // console.log($question);
        $('.answer').slideUp(300);
        $($question.attr('href')).fadeIn(300);
        $('.questions li').removeClass('active');
        $question.parents().eq(2).addClass('active');
        setTimeout(function(){
            $('html, body').animate({scrollTop: $question.parents(2).offset().top - 96}, 'easeInOutExpo');
        }, 300);
    });
}
mm.initFAQ2 = function() {
    $(document).on('click', '.questions2 li a', function(e){
        e.preventDefault();
        $question = $(e.target);
        // console.log($question);
        $('.answer2').slideUp(300);
        $($question.attr('href')).fadeIn(300);
        $('.questions2 li').removeClass('active');
        $question.parents().eq(2).addClass('active');
        setTimeout(function(){
            $('html, body').animate({scrollTop: $question.parents(2).offset().top - 96}, 'easeInOutExpo');
        }, 300);
    });
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
 

$(function(){
    mm.init();
    // console.log(new Date());
    // console.log(new Date('2019-09-19'));
    // if(new Date() < new Date('2019-12-24')) {
    const arrayMystery = ["titt","bambike, glorietta"];
    const rndInt = randomIntFromInterval(0,1);
    const modalID = arrayMystery[rndInt];

    console.log(rndInt);   
    $('#' + modalID).modal('show');

    setTimeout(function() {
        $('#' + modalID).modal('hide');
    }, 10000);



    // $('#titt').modal('show');

    // setTimeout(function() {
    //     $('#titt').modal('hide');
    // }, 10000);



    
    // }
});



/*social media*/

/*mm.runTripAdvisoryWidget = function () {
    $.getScript('http://www.jscache.com/wejs?wtype=socialButtonReviews&amp;uniq=813&amp;locationId=7142887&amp;color=green&amp;size=rect&amp;lang=en_PH&amp;display_version=2');
};*/

