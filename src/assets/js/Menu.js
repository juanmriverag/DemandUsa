$(document).ready(function () {

  $(document).on('click', '.header > .icono-menu div:first-of-type .NS-btn-menu', function () {
    var iconMenu = $(this).find('.nav-var');
    $(iconMenu).toggleClass('change');
    $(document).find('body app-root > div:first-of-type').toggleClass("menu-efect");
    $(document).find('main').toggleClass("main-efect");
    NSFunctionMostrarMenus();
  });

  $(document).on('click', '.menu ul.NS-container-menus > li.NS-menu > div.NS-menu-title', function(){
    var menu = $(this).closest('li.NS-menu');
    if(!$(menu).children('.NS-menu-title').find('span').hasClass('menu-active')){
      $(document).find('.menu ul.NS-container-menus div.NS-menu-title span').removeClass('menu-active');
      $(document).find('.menu ul.NS-container-submenus').removeClass('menu-ul-efect');
      $(document).find(".menu ul.NS-container-submenus > li").removeClass('efect-menu-li');
    }
    NSFunctionMostrarSubmenus(menu);
  });

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

  $(document).on("focus", "input", function() {
    $(this).select();
  });

});

var NSFunctionMostrarMenus = function(fromComponent){
  if(fromComponent != undefined){
    $('.header > .icono-menu div:first-of-type .NS-btn-menu .nav-var').removeClass('change');
    $(document).find('body app-root > div:first-of-type').removeClass("menu-efect");
    $(document).find('main').removeClass("main-efect");
  }
  if(!$(document).find('body app-root > div:first-of-type').hasClass("menu-efect")){
    $(document).find(".menu ul.NS-container-menus li").removeClass('efect-menu-li');
    $(document).find(".menu ul.NS-container-menus ul").removeClass('menu-ul-efect');
    $(document).find('.menu div.NS-menu-title span').removeClass('menu-active');
    $(document).find('.menu ul.NS-container-submenus').removeClass('menu-ul-efect');
    $(document).find(".menu ul.NS-container-submenus > li").removeClass('efect-menu-li');
  } else {
    var items = [];
    items = $(document).find(".menu ul.NS-container-menus > li");
    var timeStart = 0;
    $.each(items, function(key, value){
       timeStart += 100;
       setTimeout(function(){
         $(value).addClass("efect-menu-li");
       }, timeStart);
    });
  }
};

var NSFunctionMostrarSubmenus = function(menu){
  if($(menu).find('.NS-container-submenus').hasClass('menu-ul-efect')){
    $(menu).find('div.NS-menu-title span').removeClass('menu-active');
    $(menu).find('.NS-container-submenus').removeClass('menu-ul-efect');
    $(menu).find("ul.NS-container-submenus > li").removeClass('efect-menu-li');
  } else {
    var items = [];
    var timeStart = 0;
    items = $(menu).find("ul.NS-container-submenus > li");
    $(menu).find('div.NS-menu-title span').addClass('menu-active');
    $(menu).find('.NS-container-submenus').addClass('menu-ul-efect');
    $.each(items, function(key, value){
      timeStart += 50;
      setTimeout(function(){
        $(value).addClass("efect-menu-li");
      }, timeStart);
    });
  }
};
