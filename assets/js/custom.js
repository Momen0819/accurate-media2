(function($) {
    'use strict';

    // Smooth Scrolling for Navigation Links
    $('.navbar-nav .nav-link, .mobile-nav .mean-nav ul li a, .learn-btn, a[href^="#"]').on('click', function(e) {
        // Only handle links that start with #
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const target = $(hash);
            
            if (target.length) {
                // Calculate offset based on screen size
                let offset = 80; // Default offset for desktop
                if ($(window).width() <= 991) {
                    offset = 60; // Smaller offset for mobile
                }
                
                $('html, body').animate({
                    scrollTop: target.offset().top - offset // Responsive offset for navbar
                }, 800, 'swing'); // 800ms duration with swing easing
                
                // Update active nav link (only for navigation links, not all anchor links)
                if ($(this).hasClass('nav-link') || $(this).closest('.mean-nav').length) {
                    $('.navbar-nav .nav-link, .mobile-nav .mean-nav ul li a').removeClass('active');
                    $(this).addClass('active');
                }
                
                // Close mobile menu if open
                if ($('.mobile-nav .mean-nav').hasClass('mean-nav-open')) {
                    $('.mobile-nav .mean-nav').removeClass('mean-nav-open');
                    $('.mobile-nav .meanmenu-reveal').removeClass('meanclose');
                }
            }
        }
    });

    // Update active nav link on scroll
    $(window).on('scroll', function() {
        let current = '';
        const sections = $('section, div[id]');
        const navLinks = $('.navbar-nav .nav-link, .mobile-nav .mean-nav ul li a');
        
        sections.each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionHeight = $(this).height();
            if ($(window).scrollTop() >= sectionTop && $(window).scrollTop() < sectionTop + sectionHeight) {
                current = $(this).attr('id');
            }
        });
        
        navLinks.each(function() {
            $(this).removeClass('active');
            if ($(this).attr('href') === '#' + current) {
                $(this).addClass('active');
            }
        });
    });

    // Mean Menu JS
    jQuery('.mean-menu').meanmenu({ 
        meanScreenWidth: "991"
    });

    // Navbar Area
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >150){  
            $('.navbar-area').addClass("sticky-nav");
        }
        else{
            $('.navbar-area').removeClass("sticky-nav");
        }
    });

    // FAQ Accordion JS
	$('.accordion').find('.accordion-title').on('click', function(){
		// Adds Active Class
		$(this).toggleClass('active');
		// Expand or Collapse This Panel
		$(this).next().slideToggle('fast');
		// Hide The Other Panels
		$('.accordion-content').not($(this).next()).slideUp('fast');
		// Removes Active Class From Other Titles
		$('.accordion-title').not($(this)).removeClass('active');		
	});

    // Brand Slider 
     $('.brand-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 2
            },
            568:{
                items: 3
            },
            768:{
                items: 5
            },
            1000:{
                items: 5
            }
        }
    })

    // Portfolio Slider 
    $('.portfolio-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='bx bx-left-arrow-alt'></i>",
            "<i class='bx bx-right-arrow-alt'></i>"
        ],
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    })

    // Testimonial Slider 
    $('.testimonial-item-slider').owlCarousel({
        loop: true,
        items: 1,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='bx bx-left-arrow-alt'></i>",
            "<i class='bx bx-right-arrow-alt'></i>"
        ],
    })

    // Service Slider 
    $('.service-slider').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='bx bx-left-arrow-alt'></i>",
            "<i class='bx bx-right-arrow-alt'></i>"
        ],
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    })

    // Tabs
    $('#tabs-item li a').on('click', function(e) {
        $('#tabs-item li, #prices-content .active').removeClass('active').removeClass('fadeInUp');
        $(this).parent().addClass('active');
        var activeTab = $(this).attr('href');
        $( activeTab).addClass('active fadeInUp');
        e.preventDefault();
    });	

    // Popup Video 
    $('.play-btn').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Client Slider 
    $('.client-slider').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: [
            "<i class='bx bx-left-arrow-alt'></i>",
            "<i class='bx bx-right-arrow-alt'></i>"
        ],
        responsive:{
            0:{
                items: 1
            },
            768:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    })

    // Search Botton
    $('.close-btn').on('click',function() {
        $('.search-overlay').fadeOut();
        $('.search-btn').show();
        $('.close-btn').removeClass('active');
    });
    $('.search-btn').on('click',function() {
        $(this).hide();
        $('.search-overlay').fadeIn();
        $('.close-btn').addClass('active');
    });

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // Handle The Invalid Form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly");
        } else {
            // Everything Looks Good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function() {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function() {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
        
    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://hibootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Back To Top Js
    $('body').append('<div id="toTop" class="top-btn"><i class="bx bx-chevrons-up"></i></div>');
    $(window).on('scroll',function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    }); 
    $('#toTop').on('click',function(){
        $("html, body").animate({ scrollTop: 0 }, 0);
        return false;
    });

    // WOW JS
    new WOW().init();

    // Floating WhatsApp Icon Enhancement
    $('.whatsapp-btn').on('click', function() {
        // Add click animation
        $(this).addClass('clicked');
        setTimeout(function() {
            $('.whatsapp-btn').removeClass('clicked');
        }, 300);
        
        // Optional: Track click analytics
        console.log('WhatsApp button clicked');
    });

    // Preloader JS
    jQuery(window).on('load',function(){
        jQuery(".preloader").fadeOut(500);
    });

    // Switch Btn
    //$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");


})(jQuery);

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('bonsa_theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('bonsa_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('bonsa_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('slider').checked = true;
    }
})();


