// ナビゲーションバーのstickyスクロール機能実装
var navbarMarginTop = 0;
$(document).ready(function() {
  $(window).on('load resize',function () {
      navbarMarginTop = window.innerWidth * 0.404761904761905;
      return navbarMarginTop;
  });
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick. 
      // console.log($(window).scrollTop())
    if ($(window).scrollTop() > navbarMarginTop ) {
      $('#Float-nav').addClass('navbar-fixed');
      $('#Float-nav').addClass('shadow');
      $('.main').css('padding-top', $('#Float-nav').outerHeight(true));
    }
    if ($(window).scrollTop() <= navbarMarginTop ) {
      $('#Float-nav').removeClass('navbar-fixed');
      $('#Float-nav').removeClass('shadow');
      $('.main').css('padding-top', 0);
    }
  });
});
