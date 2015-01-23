$(function(){
    showSidebar();
    $(document).scroll(function () {
        showSidebar();
    });

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
        template: '<a href="{{link}}" class="col-md-3"><img src="{{image}}" /></a>',
        resolution: 'standard_resolution'
    });
    feed.run();
});

function showSidebar(){
    if($(document).scrollTop() >= $('#rooms').offset().top - 100){
        if($('#sidebar').hasClass('sidebar-hidden')){
            console.log("Showing sidebar")
            $('.sidebar-item').each(function(i){
                $(this).delay( i * 100).animate({right:'24px'});
            });
            $('#sidebar').addClass('sidebar-visible');
            $('#sidebar').removeClass('sidebar-hidden');
        }
    }else{
        if($('#sidebar').hasClass('sidebar-visible')){
            $('.sidebar-item').each(function(i){
                $(this).delay( i * 100).animate({right:'-150px'});
            });
            $('#sidebar').addClass('sidebar-hidden');
            $('#sidebar').removeClass('sidebar-visible');
        }
    }
}