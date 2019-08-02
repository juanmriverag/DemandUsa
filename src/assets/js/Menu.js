$(document).ready(function () {

  $(document).on('click', '.menu ul li:has(ul) div', function(){
    console.log('click menu 1');
    if ($($(this.parentNode).children('ul')).hasClass('menu-ul-efect')) {
      $($(this.parentNode).children('ul')).removeClass('menu-ul-efect');
      $($(this.parentNode).children('ul')).removeClass('menu-ul-efect2');
    }
    else {
      $($(document).find('.menu ul li:has(ul)').children('ul')).removeClass('menu-ul-efect');
      $($(document).find('.menu ul li:has(ul)').children('ul')).removeClass('menu-ul-efect2');
      $($(this.parentNode).children('ul')).addClass('menu-ul-efect');
      $('.sub-options').removeClass('menu-ul-efect-sub');
    }

    if (!($($(this).children('span')).hasClass('menu-active'))) {
      $(document).find('.menu ul li:has(ul) div span').removeClass('menu-active');
      $($(this).children('span')).removeClass('menu-active');
    }
    else {
      $($(this).children('span')).addClass('menu-active');
    }
  });

  $(document).on('click', '.menu ul li ul li:has(ul) span', function (e) {
    console.log('click menu 3');
    if ($($(this.parentNode).children('ul')).hasClass('menu-ul-efect-sub')) {
      $(this.parentNode.parentNode).removeClass('menu-ul-efect2');
      $(document).find('.sub-options').removeClass('menu-ul-efect-sub');
    }
    else {
      $(document).find('.menu ul li ul li ul').removeClass('menu-ul-efect-sub');
      $($(this.parentNode).children('ul')).addClass('menu-ul-efect-sub');
      $(this.parentNode.parentNode).addClass('menu-ul-efect2');
    }
  });


  $(document).on('click', '.header > .icono-menu div:first-of-type .nav-var', function () {

    console.log('click menu 1');
    var items = [];
    $(this).toggleClass('change');
    $(document).find('body app-root > div:first-of-type').toggleClass("menu-efect");
    $(document).find('main').toggleClass("main-efect");
    // $(document).find('.menu > ul:first-of-type li').toggleClass("efect-menu-li");
    // items.push({ element = $(document).find('body app-root > div:first-of-type'), style = "menu-efect" });
    // items.push({ element = $(document).find('main'), style = "menu-efect" });
    items.push($(document).find('.menu > ul:first-of-type li'));
    Array.prototype.push.apply(items, $(document).find(".menu .ContainerMenu li"));
  
    var timeStart = 0;
    // items = $(document).find(".menu .ContainerMenu li"); 
    
    $.each(items, function(key, value){
      timeStart += 50;
      console.log(timeStart);
      setTimeout(() => {
        console.log(value);
        $(value).toggleClass("efect-menu-li");
      }, timeStart);
    });

    // // Items del menu inferior
    // setTimeout(() => {
    //   $(document).find('.menu .options div:first-child > div').toggleClass("efect-menu-li");
    // }, 550);
    // // Referencias de desarrolladores

    // setTimeout(() => {
    //   $(document).find('.options > div:nth-child(2) span').toggleClass("efect-menu-li");
    // }, 650);

    // // $('.menu > ul > li > ul').removeClass('menu-ul-efect');
    // $(document).find('.menu > ul > li > ul').removeClass('menu-ul-efect2');
    // $(document).find('.menu .sub-options').removeClass('menu-ul-efect');
  });

  
  $(document).find('.content').click(function () {
      $(document).find('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $(document).find('body app-root > div:first-of-type').removeClass("menu-efect");
      $(document).find('main').removeClass('main-efect');
      $(document).find('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $(document).find('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $(document).find('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });


  $(document).on('click', '.nav', function () {
      $(document).find('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $(document).find('body app-root > div:first-of-type').removeClass("menu-efect");
      $(document).find('main').removeClass('main-efect');
      $(document).find('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $(document).find('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $(document).find('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });

  $(document).on('click', '.header > div:nth-child(2), .header > div:nth-child(3)', function () {
      $(document).find('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $(document).find('body app-root > div:first-of-type').removeClass("menu-efect");
      $(document).find('main').removeClass('main-efect');
      $(document).find('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $(document).find('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $(document).find('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $(document).find('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });

  // $('.enlarge').click(function (ev) {
  //     $('html').fullscreen();
  // });


  $(function () {
      $(document).on('click', '.enlarge', function () {
          $('html').fullscreen();
          $(this).css('display', 'none');
          $(document).find('.enlarge2').css('display', 'block ');
          return false;
      });
      $(document).on('click', '.enlarge2', function () {
          $.fullscreen.exit();
          $(this).css('display', 'none');
          $(document).find('.enlarge').css('display', 'block');
          return false;
      });
  });

  $(document).on("focus", "input", function() {
    $(this).select();
  });

});