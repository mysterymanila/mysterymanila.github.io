$(function(){
    showSidebar();
    $(document).scroll(function () {
        showSidebar();
    });

    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'MYSTERYMANILA',
        clientId: 'b74a7734368849fabe400246441d36f6',
        limit: '8',
        sortBy: 'most-recent',
        template: '<a href="{{link}}" class="col-md-3"><img src="{{image}}" /></a>'
    });
    feed.run();
});

function showSidebar(){
    if($(document).scrollTop() >= $('#rooms').offset().top - 100){
        if(!$('#sidebar > img').hasClass('showIcon')){
            $('#sidebar > img').each(function(i){
                $(this).delay( i * 100).animate({right:'30px'});
                $(this).addClass('showIcon');
                if( $(this).hasClass('hideIcon'))
                    $(this).removeClass('hideIcon');
            });
        }
    }else{
        if(!$('#sidebar > img').hasClass('hideIcon')){
            $('#sidebar > img').each(function(i){
                $(this).delay( i * 100).animate({right:'-150px'});
                $(this).addClass('hideIcon');
                if( $(this).hasClass('showIcon'))
                    $(this).removeClass('showIcon');
            });
        }
    }
}