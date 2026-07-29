AOS.init({
  duration: 800,
  easing: 'slide'
});

(function($) {

  "use strict";

  $(window).stellar({
    responsive: false,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });

  var fullHeight = function() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function(){
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  var loader = function() {
    setTimeout(function() { 
      if($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  $.Scrollax();

  var carousel = function() {
    $('.carousel-cause').owlCarousel({
      autoplay: true,
      center: true,
      loop: true,
      items:1,
      margin: 30,
      stagePadding:0,
      nav: true,
      navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
      responsive:{
        0:{
          items: 1,
          stagePadding: 0
        },
        600:{
          items: 2,
          stagePadding: 50
        },
        1000:{
          items: 3,
          stagePadding: 100
        }
      }
    });
  };
  carousel();

  $('nav .dropdown').hover(function(){
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function(){
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  $('#dropdown04').on('show.bs.dropdown', function () {
    console.log('show');
  });

  var scrollWindow = function() {
    $(window).scroll(function(){
      var $w = $(this),
          st = $w.scrollTop(),
          navbar = $('.ftco_navbar'),
          sd = $('.js-scroll-wrap');

      if (st > 150) {
        if ( !navbar.hasClass('scrolled') ) {
          navbar.addClass('scrolled'); 
        }
      } 
      if (st < 150) {
        if ( navbar.hasClass('scrolled') ) {
          navbar.removeClass('scrolled sleep');
        }
      } 
      if ( st > 350 ) {
        if ( !navbar.hasClass('awake') ) {
          navbar.addClass('awake'); 
        }
        
        if(sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if ( st < 350 ) {
        if ( navbar.hasClass('awake') ) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if(sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
      BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
      iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
      Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
      Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
      any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  var counter = function() {
    $('#section-counter').waypoint( function( direction ) {
      if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
        $('.number').each(function(){
          var $this = $(this),
            num = $this.data('number');
          $this.animateNumber(
            {
              number: num,
              numberStep: comma_separator_number_step
            }, 7000
          );
        });
      }
    } , { offset: '95%' } );
  }
  counter();

  var contentWayPoint = function() {
    var i = 0;
    $('.ftco-animate').waypoint( function( direction ) {
      if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function(){
          $('body .ftco-animate.item-animate').each(function(k){
            var el = $(this);
            setTimeout( function () {
              var effect = el.data('animate-effect');
              if ( effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if ( effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if ( effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            },  k * 50, 'easeInOutExpo' );
          });
        }, 100);
      }
    } , { offset: '95%' } );
  };
  contentWayPoint();

  var OnePageNav = function() {
    $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
      e.preventDefault();
      var hash = this.hash,
          navToggler = $('.navbar-toggler');
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, 'easeInOutExpo', function(){
        window.location.hash = hash;
      });

      if ( navToggler.is(':visible') ) {
        navToggler.click();
      }
    });
    $('body').on('activate.bs.scrollspy', function () {
      console.log('nice');
    })
  };
  OnePageNav();

  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('#appointment_date').datepicker({
    'format': 'm/d/yyyy',
    'autoclose': true
  });

  $('#appointment_time').timepicker();

  // ============ DONATION POPUP ============
  var WHATSAPP_NUMBER = '2349162876822';
  var BANK_NAME = 'GTBank';
  var ACCOUNT_NAME = 'Leeyah Haven Foundation';
  var ACCOUNT_NUMBER = '0123456789';

  $(document).on('click', '.donate-btn-trigger', function(e) {
    e.preventDefault();
    $('#donationModal').modal('show');
  });

  $('#sendDonationBtn').on('click', function() {
    var amount = $('#donationAmount').val();
    var cause = $('#donationCause').val();
    var name = $('#donorName').val();

    if (!amount || amount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    if (!cause) {
      alert('Please select a donation cause.');
      return;
    }

    var message = 'Hello! I want to make a donation.%0A';
    message += 'Name: ' + (name || 'Anonymous') + '%0A';
    message += 'Amount: $' + amount + '%0A';
    message += 'Cause: ' + cause + '%0A';
    message += 'Bank: ' + BANK_NAME + '%0A';
    message += 'Account Name: ' + ACCOUNT_NAME + '%0A';
    message += 'Account Number: ' + ACCOUNT_NUMBER;

    var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message;
    window.open(whatsappUrl, '_blank');
  });

  // ============ DYNAMIC CONTENT FROM localStorage ============
  function loadDynamicContent() {
    // Load causes from localStorage
    var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
    if (causes.length > 0 && $('.carousel-cause').length) {
      var owlHtml = '';
      causes.forEach(function(c) {
        owlHtml += '<div class="item"><div class="cause-entry">';
        owlHtml += '<a href="#" class="img" style="background-image: url(' + c.image + ');"></a>';
        owlHtml += '<div class="text p-3 p-md-4">';
        owlHtml += '<h3><a href="#">' + c.title + '</a></h3>';
        owlHtml += '<p>' + c.description + '</p>';
        owlHtml += '<span class="donation-time mb-3 d-block">Last donation ' + c.lastDonation + '</span>';
        owlHtml += '<div class="progress custom-progress-success">';
        owlHtml += '<div class="progress-bar bg-primary" role="progressbar" style="width: ' + c.progress + '%" aria-valuenow="' + c.progress + '" aria-valuemin="0" aria-valuemax="100"></div></div>';
        owlHtml += '<span class="fund-raised d-block">$' + c.raised + ' raised of $' + c.goal + '</span>';
        owlHtml += '</div></div></div>';
      });
      $('.carousel-cause').html(owlHtml);
      $('.carousel-cause').owlCarousel('destroy');
      carousel();
    }

    // Load events from localStorage
    var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
    if (events.length > 0) {
      $('.events-container .row.d-flex').each(function() {
        var $container = $(this);
        var isHomepage = $container.closest('#home-events').length > 0;
        var limit = isHomepage ? 3 : events.length;
        var html = '';
        for (var i = 0; i < Math.min(limit, events.length); i++) {
          var e = events[i];
          html += '<div class="col-md-4 d-flex ftco-animate">';
          html += '<div class="blog-entry align-self-stretch">';
          html += '<a href="blog-single.html" class="block-20" style="background-image: url(\'' + e.image + '\');"></a>';
          html += '<div class="text p-4 d-block">';
          html += '<div class="meta mb-3">';
          html += '<div><a href="#">' + e.date + '</a></div>';
          html += '<div><a href="#">Admin</a></div>';
          html += '<div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div></div>';
          html += '<h3 class="heading mb-4"><a href="#">' + e.title + '</a></h3>';
          html += '<p class="time-loc"><span class="mr-2"><i class="icon-clock-o"></i> ' + e.time + '</span> <span><i class="icon-map-o"></i> ' + e.location + '</span></p>';
          html += '<p>' + e.description + '</p>';
          html += '<p><a href="event.html">Join Event <i class="ion-ios-arrow-forward"></i></a></p>';
          html += '</div></div></div>';
        }
        $container.html(html);
      });
    }

    // Load blog posts from localStorage
    var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
    if (blogs.length > 0) {
      $('.blog-container .row.d-flex').each(function() {
        var $container = $(this);
        var blogSection = $container.closest('.blog-section');
        var isHomepage = blogSection.length && blogSection.find('h2').text().indexOf('Latest') !== -1;
        var limit = isHomepage ? 3 : blogs.length;
        var html = '';
        for (var i = 0; i < Math.min(limit, blogs.length); i++) {
          var b = blogs[i];
          html += '<div class="col-md-4 d-flex ftco-animate">';
          html += '<div class="blog-entry align-self-stretch">';
          html += '<a href="blog-single.html" class="block-20" style="background-image: url(\'' + b.image + '\');"></a>';
          html += '<div class="text p-4 d-block">';
          html += '<div class="meta mb-3">';
          html += '<div><a href="#">' + b.date + '</a></div>';
          html += '<div><a href="#">Admin</a></div>';
          html += '<div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div></div>';
          html += '<h3 class="heading mt-3"><a href="#">' + b.title + '</a></h3>';
          html += '<p>' + b.description + '</p>';
          html += '</div></div></div>';
        }
        $container.html(html);
      });
    }
  }

  loadDynamicContent();

})(jQuery);
