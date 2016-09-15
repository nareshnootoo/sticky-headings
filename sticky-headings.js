/*
 * sticky-headings.js
 * author : Naresh Kumar
 * Copyright 2015 zapbuild 
 * 
 */

(function ($) {
    /*
     * @params options a collection of settings
     * @params onscroll a callback function
     * @params onstick a callback function
     */
    $.fn.stickyheadings = function (options, onscroll, onstuck) {

        var settings = $.extend({
            offset: 0,
        }, options);

        var $stickies = $(this), //collection of sticky headers
                stack = {
                },
                scrollTop = 0,
                lastScrollTop = 0,
                eleTop = 0
                ;

        $(document).on("scroll", function () {
            lastScrollTop = scrollTop;
            scrollTop = parseInt($(window).scrollTop(), 10);

            $stickies.each(function (i) {

                eleTop = parseInt($(this).offset().top, 10);

                //Remove stuck class if (this case is only for 1st heading)
                //  there is atleast one heading in stack (at least one heading which is sticky) AND
                //  User is scrolling down.
                //  scrolling top is less then top position of 1st heading	
                if (stack.hasOwnProperty('0') && scrollTop < lastScrollTop && scrollTop <= stack[0].offset.top) {
                    $('.is_stuck').each(function () {
                        $(this).removeClass('is_stuck').css(stack[$(this).attr('index')].css).css({width: window.innerWidth + "px"});
                    });
                }


                if (((scrollTop + settings.offset) - eleTop) > 0) {
                    //Put the css properties of header in stack
                    if (!(i in stack)) {
                        stack[i] = {
                            css: {
                                position: $(this).css("position"),
                                top: $(this).css("top")
                            },
                            offset: $(this).offset()
                        };
                        $(this).attr('index', i);
                    }

                    //remove the is_stuck class if any
                    $(".is_stuck").each(function () {
                        $(this).removeClass("is_stuck")
                                .css(stack[i].css)
                                .css({width: window.innerWidth + "px"});

                    });

                    //make the current header as sticky header
                    $(this).addClass("is_stuck").css({
                        position: "fixed",
                        top: settings.offset + "px",
                        width: window.innerWidth + "px"
                    });

                    //if callback fucntion is defind call that function
                    if (typeof onstuck === "function") {
                        onstuck(this);
                    }

                }
            });
            
            //if callback fucntion is defind call that function
            if (typeof onscroll === "function") {
                onscroll(this);
            }
        });

        //fix the width of headers if window got resized.
        $(window).resize(function () {
            $stickies.css({width: window.innerWidth + "px"});
        });

    };

}(jQuery));



