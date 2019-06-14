//thisMenujs
$(document).ready(function () {

  $('.menu ul li:has(ul) div').click(function (e) {
      // console.log("click1");
      if ($($(this.parentNode).children('ul')).hasClass('menu-ul-efect')) {
          $($(this.parentNode).children('ul')).removeClass('menu-ul-efect');
          $($(this.parentNode).children('ul')).removeClass('menu-ul-efect2');
      }
      else {
          $($('.menu ul li:has(ul)').children('ul')).removeClass('menu-ul-efect');
          $($('.menu ul li:has(ul)').children('ul')).removeClass('menu-ul-efect2');
          $($(this.parentNode).children('ul')).addClass('menu-ul-efect');
          $('.sub-options').removeClass('menu-ul-efect-sub');
      }

      if (!($($(this).children('span')).hasClass('menu-active'))) {
          $('.menu ul li:has(ul) div span').removeClass('menu-active');
          $($(this).children('span')).removeClass('menu-active');
      }
      else {
          $($(this).children('span')).addClass('menu-active');
      }
  });

  $('.menu ul li ul li:has(ul) span').click(function (e) {
    // console.log("click2");
      if ($($(this.parentNode).children('ul')).hasClass('menu-ul-efect-sub')) {
          $(this.parentNode.parentNode).removeClass('menu-ul-efect2');
          $('.sub-options').removeClass('menu-ul-efect-sub');
      }
      else {
          $('.menu ul li ul li ul').removeClass('menu-ul-efect-sub');
          $($(this.parentNode).children('ul')).addClass('menu-ul-efect-sub');
          $(this.parentNode.parentNode).addClass('menu-ul-efect2');
      }
  });


  $('.header > .icono-menu div:first-of-type .nav-var').click(function () {
        
     setTimeout(() => {
        $(this).toggleClass('change');
      }, 600);

      setTimeout(() => {
        $('body app-root > div:first-of-type').toggleClass("menu-efect");
        $('main').toggleClass('main-efect');
      }, 0);


      // Items del menu
      setTimeout(() => {
        $('.menu > ul li:nth-child(1)').toggleClass("efect-menu-li");
      }, 250);
      setTimeout(() => {
        $('.menu > ul li:nth-child(2)').toggleClass("efect-menu-li");
      }, 300);
      setTimeout(() => {
        $('.menu > ul li:nth-child(3)').toggleClass("efect-menu-li");
      }, 350);
      setTimeout(() => {
        $('.menu > ul li:nth-child(4)').toggleClass("efect-menu-li");
      }, 350);
      setTimeout(() => {
        $('.menu > ul li:nth-child(5)').toggleClass("efect-menu-li");
      }, 400);
      setTimeout(() => {
        $('.menu > ul li:nth-child(6)').toggleClass("efect-menu-li");
      }, 450);
      setTimeout(() => {
        $('.menu > ul li:nth-child(7)').toggleClass("efect-menu-li");
      }, 500);
      setTimeout(() => {
        $('.menu > ul li:nth-child(8)').toggleClass("efect-menu-li");
      }, 550);

      setTimeout(() => {
        $('.menu > ul li:nth-child(9)').toggleClass("efect-menu-li");
      }, 600);

      setTimeout(() => {
        $('.menu > ul li:nth-child(10)').toggleClass("efect-menu-li");
      }, 650);

      setTimeout(() => {
        $('.menu > ul li:nth-child(11)').toggleClass("efect-menu-li");
      }, 700);



      // Items del menu inferior
      setTimeout(() => {
        $('.menu .options div:first-child > div').toggleClass("efect-menu-li");
      }, 550);
      // Referencias de desarrolladores

      setTimeout(() => {
        $('.options > div:nth-child(2) span').toggleClass("efect-menu-li");
      }, 650);


      // $('.menu > ul > li > ul').removeClass('menu-ul-efect');
      $('.menu > ul > li > ul').removeClass('menu-ul-efect2');
      $('.menu .sub-options').removeClass('menu-ul-efect');
    });

  
  $('.content').click(function () {
      $('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $('body app-root > div:first-of-type').removeClass("menu-efect");
      $('main').removeClass('main-efect');
      $('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });

  $('.nav').click(function () {
      $('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $('body app-root > div:first-of-type').removeClass("menu-efect");
      $('main').removeClass('main-efect');
      $('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });

  $('.header > div:nth-child(2), .header > div:nth-child(3)').click(function () {
      $('.header > .icono-menu div:first-of-type .nav-var').removeClass('change');
      $('body app-root > div:first-of-type').removeClass("menu-efect");
      $('main').removeClass('main-efect');
      $('.menu > ul li:nth-child(1)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(2)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(3)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(4)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(5)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(6)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(7)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(8)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(9)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(10)').removeClass("efect-menu-li");
      $('.menu > ul li:nth-child(11)').removeClass("efect-menu-li");

      $('.options > div:nth-child(2) span').removeClass("efect-menu-li");
      $('.menu .options div:first-child > div').removeClass("efect-menu-li");
  });

  // $('.enlarge').click(function (ev) {
  //     $('html').fullscreen();
  // });


  $(function () {
      $('.enlarge').click(function () {
          $('html').fullscreen();
          $(this).css('display', 'none');
          $('.enlarge2').css('display', 'block ');
          return false;
      });
      $('.enlarge2').click(function () {
          $.fullscreen.exit();
          $(this).css('display', 'none');
          $('.enlarge').css('display', 'block');
          return false;
      });
  });

});