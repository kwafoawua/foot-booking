jQuery(function ($) {

    'use strict';


    // -------------------------------------------------------------
    //  select options
    // -------------------------------------------------------------

    (function() {
          $('.select-cat').on('click', function() {
            $('this').closest('div').find('select').slideToggle(110)

        });

    }());
    
   
     // -------------------------------------------------------------
    //  Home Carousel
    // -------------------------------------------------------------

    (function( $ ) {

        //Function to animate slider captions 
        function doAnimations( elems ) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        
        //Variables on page load 
        var $myCarousel = $('#home-section'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
            
        //Initialize carousel 
        $myCarousel.carousel();
        
        //Animate captions in first slide on page load 
        doAnimations($firstAnimatingElems);
        
        //Pause carousel  
        $myCarousel.carousel('pause');
        
        //Other slides to be animated on carousel slide event 
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });  
        
    })(jQuery);



    // -------------------------------------------------------------
    //  Owl Carousel
    // -------------------------------------------------------------


    (function() {

        $("#top-featured").owlCarousel({
            items:4,
            nav:true,
            autoplay:true,
            dots:true,
			autoplayHoverPause:true,
            loop:true,
			nav:false,
			navText: [
			  "<i class='fa fa-angle-left '></i>",
			  "<i class='fa fa-angle-right'></i>"
			],
            responsive: {
                0: {
                    items: 1,
                    slideBy:1
                },
                480: {
                    items: 2,
                    slideBy:1
                },
                991: {
                    items: 3,
                    slideBy:1
                },
                1000: {
                    items: 4,
                    slideBy:1
                },
            }            

        });

    }());

    // -------------------------------------------------------------
    //  language Select
    // -------------------------------------------------------------

   (function() {

        $('.category-dropdown').on('click', '.category-change a', function(ev) {
            if ("#" === $(this).attr('href')) {
                ev.preventDefault();
                var parent = $(this).parents('.category-dropdown');
                parent.find('.change-text').html($(this).html());
            }
        });

    }());



    // -------------------------------------------------------------
    // Accordion
    // -------------------------------------------------------------

        (function () {  
            $('.collapse').on('show.bs.collapse', function() {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
                $('.list-title span').html('<i class="fa fa-minus"></i>');
            });

            $('#advanced-filter').on('hide.bs.collapse', function() {
                var id = $(this).attr('id');
                $('.list-title span').html('<i class="fa fa-plus"></i>');
            });
        }());


    // -------------------------------------------------------------
    //  Checkbox Icon Change
    // -------------------------------------------------------------
    
    (function () {

        $('input[type="checkbox"]').change(function(){
            if($(this).is(':checked')){
                $(this).parent("label").addClass("checked");
            } else {
                $(this).parent("label").removeClass("checked");
            }
        });

    }()); 

	
	 // -------------------------------------------------------------
    //  tab view change
    // -------------------------------------------------------------
  
    $('.tab-view .grid-view-tab').on('click', function() {
        $('.tab-view .grid-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab small-view-tab').addClass('grid-view-tab');
    });

     $('.tab-view .small-view-tab').on('click', function() {
        $('.tab-view .small-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .grid-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab grid-view-tab').addClass('small-view-tab');
    });

    $('.tab-view .list-view-tab').on('click', function() {
        $('.tab-view .list-view-tab').addClass('active');
        $('.tab-view .grid-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('grid-view-tab small-view-tab').addClass('list-view-tab');

    });

   


// script end
});
    
 