$(function(){
    $(document).scroll(function () {
        if(($(document).scrollTop() >= $('#rooms').offset().top - 300)
            && $(document).scrollTop() <= $('#ig').offset().top-500){
            showSidebar();
        }else{
            hideSidebar();
        }
    });



    $(document).on('click', '#buried-bodies-button', function(){
        $('html, body').animate({scrollTop:$('#buried-bodies').position().top}, 'slow');
    })

    $(document).on('click', '#rebeccas-room-button', function(){
        $('html, body').animate({scrollTop:$('#rebeccas-room').position().top - 50}, 'slow');
    })

    $('.scroll-to-rooms').click(function(event){
        event.preventDefault();
        $('html, body').animate({scrollTop:$('#rooms').position().top - 72}, 'easeInOutExpo');
    });

    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'MYSTERYMANILA',
        clientId: 'b74a7734368849fabe400246441d36f6',
        limit: '8',
        sortBy: 'most-recent',
        template: '<a href="{{link}}" class="col-md-3 col-sm-3 col-xs-6"><img src="{{image}}" /></a>',
        resolution: 'standard_resolution'
    });
    feed.run();

    var leaderboardFeed = new Instafeed({
        target: 'leaderboard-images',
        get: 'tagged',
        tagName: 'MYSTERYMANILA',
        clientId: 'b74a7734368849fabe400246441d36f6',
        sortBy: 'most-recent',
        limit: '4',
        template: '<a href="{{link}}" class="col-md-3 col-sm-3 col-xs-6"><img src="{{image}}" /></a>',
        resolution: 'standard_resolution',
        filter: function(image){
            return image.tags.indexOf('LEADERBOARD') >= 0;
        }
    });
    leaderboardFeed.run();

    $('#glass').css('height', $('#glass-container').css('height'));
});

function showSidebar(){
    if($('#sidebar').hasClass('sidebar-hidden')){
        $('.sidebar-item').each(function(i){
            $(this).delay( i * 100).animate({right:'24px'});
        });
        $('#sidebar').addClass('sidebar-visible');
        $('#sidebar').removeClass('sidebar-hidden');
    }   
}

function hideSidebar(){
    if($('#sidebar').hasClass('sidebar-visible')){
        $('.sidebar-item').each(function(i){
            $(this).delay( i * 100).animate({right:'-150px'});
        });
        $('#sidebar').addClass('sidebar-hidden');
        $('#sidebar').removeClass('sidebar-visible');
    }
}