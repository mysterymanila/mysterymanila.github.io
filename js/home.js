$(function(){
    showSidebar();
    $(document).scroll(function () {
        showSidebar();
    });
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