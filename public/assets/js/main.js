(function($) {
  "use strict";

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  var siteMenuClone = function() {
    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });
    setTimeout(function() {
      var counter = 0;
      $('.site-mobile-menu .has-children').each(function() {
        var $this = $(this);
        $this.prepend('<span class="arrow-collapse collapsed">');
        $this.find('.arrow-collapse').attr({
          'data-toggle': 'collapse',
          'data-target': '#collapseItem' + counter,
        });
        $this.find('> ul').attr({
          'class': 'collapse',
          'id': 'collapseItem' + counter,
        });
        counter++;
      });
    }, 1000);
    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ($this.closest('li').find('.collapse').hasClass('show')) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();
    });
    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();
      if (w > 768) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    })
    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();
      if ($('body').hasClass('offcanvas-menu')) {
        $('body').removeClass('offcanvas-menu');
        $('body').find('.js-menu-toggle').removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $('body').find('.js-menu-toggle').addClass('active');
      }
    })
    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas-menu')) {
          $('body').removeClass('offcanvas-menu');
          $('body').find('.js-menu-toggle').removeClass('active');
        }
      }
    });
  };
  siteMenuClone();
  var siteScroll = function() {
    $(window).scroll(function() {
      var st = $(this).scrollTop();
      if (st > 100) {
        $('.js-sticky-header').addClass('shrink');
      } else {
        $('.js-sticky-header').removeClass('shrink');
      }
    })
  };
  siteScroll();
  var siteSticky = function() {
    $(".js-sticky-header").sticky({
      topSpacing: 0
    });
  };
  siteSticky();
  var siteOwlCarousel = function() {
    $('.testimonial-carousel').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      margin: 0,
      autoplay: true,
      smartSpeed: 1000,
    });
  };
  siteOwlCarousel();

  $(window).on('load', function() {
    AOS.init({
      easing: 'ease',
      duration: 1000,
      once: true
    });
  });

  //Smooth Scrolling Function
  // var scroll = new SmoothScroll('.site-navigation a[href*="#"]', {
  //   speed: 800,
  //   speedAsDuration: false,
  //   easing: 'easeInOutCubic'
  // });

  // 
  $(document).ready(function() {
  
    var scrollLink = $('.scroll');
    
    // Smooth scrolling
    scrollLink.click(function(e) {
      e.preventDefault();
      $('body,html').animate({
        scrollTop: $(this.hash).offset().top
      }, 1000 );
    });
    
    // Active link switching
    // $(window).scroll(function() {
    //   var scrollbarLocation = $(this).scrollTop();
      
    //   scrollLink.each(function() {
    //     console.log($(this.hash));
    //     var sectionOffset = $(this.hash).offset().top - 100;
        
    //     if ( sectionOffset <= scrollbarLocation ) {
    //       $(this).parent().addClass('active');
    //       $(this).parent().siblings().removeClass('active');
    //     }
    //   })
      
    // })
      $(window).scroll(function () {
        console.log("hello");
          if ($(this).scrollTop() > 10) { 
              $('.site-navbar img').attr('src','/assets/img/BooXWooXhor.png');
              $('#sticky-wrapper').addClass('is-sticky');
              $('header').css({
                "position" : 'fixed',
                "top" : 0+'px',
                "z-index" : 'auto'
              })
          }
          if ($(this).scrollTop() < 10) { 
              $('.site-navbar img').attr('src','/assets/img/White.png');
              $('#sticky-wrapper').removeClass('is-sticky');
              $('header').attr('style', ' ');
          }
      })
      
      $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > 100) {
          $('.js-sticky-header').addClass('shrink');
        } else {
          $('.js-sticky-header').removeClass('shrink');
        }
      })
    
  })

  


})(jQuery);