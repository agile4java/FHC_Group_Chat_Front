  $(document).ready(function () {   
    $('.nav.mobile-nav').on('click', function () {
        //$('.mobile-header, .all-the-header, .container-hider').toggleClass('open');
        $('.mobile-header, .all-the-header, .container-hider').toggleClass('open').promise().done(function () {
            if ($("#mobileHeader").hasClass("open")) {
                console.log('send', 'event', 'global nav link', 'click', 'hamburger');
                ga('send', 'event', 'global nav link', 'click', 'hamburger', 0);
            }
        });
        $('.mobile-quick-tasks').toggleClass('open');
        $('body').toggleClass('noScroll');
        //closeTypeAhead();
    });    
    
    
	var s_pageName = $(location).attr('pathname');
	
	if (s_pageName === '/') {
		s_pageName = 'marshfieldclinic|home|index';  // if we are at the root, set the pageName to this value
	};
    
    $('html').click(function () {
        $('.top-level-nav > li.hasKids.active').removeClass('active');
        //menuscroll
        //$('body').removeClass('noScroll');
        $('.all-the-header').removeClass('openDesktop');
        $('.container-hider').removeClass('openDesktop');
    });
    

    $('.top-level-nav').click(function (event) {
        event.stopPropagation();
    });
    $('.top-level-nav > li.hasKids > a').click(function (event) {
        var $clickedLi = $(this);
        $clickedLi.parent().siblings().removeClass('active');
        if ($clickedLi.parent().hasClass('active')) {
            $clickedLi.parent().removeClass('active');
            //menuscroll
            //$('body').removeClass('noScroll');
            $('.all-the-header').removeClass('openDesktop');
            $('.container-hider').removeClass('openDesktop');            
        } else {
            $clickedLi.parent().addClass('active');
            //menuscroll
            //$('body').addClass('noScroll');
            $('.all-the-header').addClass('openDesktop');
            $('.container-hider').addClass('openDesktop');           
        }
    });
    $('.dir.locations > a.heading').on('click', function(){
        if(!$(this).hasClass('active')){
            $('a.heading').removeClass('active');
            $(this).addClass('active');
            $(this).parent().children('ul').addClass('active');
            
        }else{
            $(this).removeClass('active');
            $('body').find('ul').removeClass('active');
        }

    });    
    
  
    $('.header-test-button').click(function (event) {
        event.preventDefault();
         if($('#newSearchInput').val() !== ''){             
             // send to search 
             window.location = '/Search/?k=' + $('#newSearchInput').val(); 
         } 

    });
        

        $('#newSearchInput').keydown(function (e) {
        if (e.keyCode == 13 && $('#newSearchInput').val() !== '') {
        
            var searchTerm = $('#newSearchInput').val();
            window.location.href = '/Search/?k=' + searchTerm;
            return false;
        }
        else {
            return true;
        }
        });

       $('.top-level-nav > li.hasKids > ul > li > div > button').click(function (event) { 
        event.preventDefault();
         if($('#docSearchInput').val() !== ''){ 
             // send to search 
             window.location = '/doctors/search/?k=' + $('#docSearchInput').val(); 
         } 
        });

/* keyup was not working due to event listener conflicts 
$(document).on('keyup', '#docSearchInput', function (event) { 
});*/
/* AJK 03/09/2018 -- this logic was moved to doctorsTypeAhead.js
       $('#docSearchInput').keydown(function (e) {
        if (e.keyCode == 13 && $('#docSearchInput').val() !== '') {
            
                     
            var searchTerm = $('#docSearchInput').val();
            window.location.href = '/doctors/search/?k=' + searchTerm;
            return false;
        }
        else {
            return true;
        }
        });*/
        
     $('#newSearchInput').click(function(){ 
         $(this).val(''); 
     }); 

     $('#docSearchInput').click(function(){ 
         $(this).val(''); 
     }); 
        
    $('.top-level-nav > li.hasKids > ul.explore > li > ul > li').click(function (event) {
        window.location=$(this).find("a").attr("href"); 
        return false;
    });
    
    function evaluateWindow(){
        var body = $('body');
        if (window.innerWidth < 998) {
            $('#globalNav-doctorsButton').attr('href', '/doctors');
            body.addClass('mobile');
            body.removeClass('desktop');
            $('.mobile-header').show();
        } else {
            $('#globalNav-doctorsButton').attr('href', '#');
            body.removeClass('mobile');
            body.addClass('desktop');
            $('.mobile-header').hide();
        }
    }    
    
    $(window).resize(function () {
        evaluateWindow();
    });    
    evaluateWindow(); 

});

 


