/* esambinohsieh.me v1 scripts
   WeiCheng Hsieh
   January 2014
*/

// Scroll to top on page refresh
$(window).unload(function () {
    $('body').scrollTop(0);
    $(document).scrollTop(0);
});

$(document).ready(function () {

    // Store div calls in variables 
    var work_icon = $('.work-icon');
    var work_icon_grid = $('.work-icon-grid');
    var work_icon_mobile = $('.work-icon-mobile');
    var work_icon_grid_mobile = $('.work-icon-grid-mobile');
    var project_imgs = $('.project-imgs');
    var project_element = $('.project');

    // All links except logo open in new tab
    $('a').attr("target", "_blank");
    $('a.logo').attr("target", "_self");

    // On load calculations
    var transitionwidth = 980;
    // Center background
    var bgImg = $('#bg');
    var startwidth = 1200;
    var startheight = 800;
    var ratio = startheight / startwidth;
    var imagewidth = $(this).width();
    var imageheight = $(this).height();
    var browserwidth = $(window).width();
    var browserheight = $(window).height();

    function fullscreen() {
        if ((browserheight / browserwidth) > ratio) {
            bgImg.height(browserheight);
            bgImg.width(browserheight / ratio);
        } else {
            bgImg.width(browserwidth);
            bgImg.height(browserwidth * ratio);
        };

        bgImg.css('right', 0);
        bgImg.css('top', (browserheight - bgImg.height()) / 2);
    };

    // Height of hero image
    $('.hero-container').height(browserheight);
    $('.content').css('top', browserheight);

    $('#bg').delay(50).fadeIn(600, function () {
        // Fade in work icons one by one
        $(".work-icons li").each(function (index) {
            $(this).delay(500 + index * 100).fadeIn(700);
        });
    });;

    // On resize
    $(window).resize(function () {
        browserheight = $(window).height();
        $('.hero-container').height(browserheight);
        $('.content').css('top', browserheight);

        if (browserwidth <= transitionwidth) {
            $('.work-icon-grid-mobile').css('position', 'relative');
        } else if (browserwidth > transitionwidth) {
            work_icon.show();
            if (project_element.is(':visible')) {
                shrinknav();
                $('nav').show();
                work_icon.show();
            } else {
                work_icon_grid.css('position', 'absolute');
            };
        };
    });

    // Check height of browser and adjust
    function heightchanges() {
        if (browserheight <= 700 && browserwidth >= transitionwidth) {
            $('.work-icon-grid').css('padding', '0 0 3% 0');
            if (browserheight <= 500) {
                $('.logo').hide();
                if (browserheight <= 400) {
                    $('.hero-content').hide();
                }
            }
        } else {
            $('.hero-content').show();
            $('.logo').show();
            if (browserwidth >= transitionwidth) {
                if (project_element.is(':visible')) {
                    work_icon_grid.css('padding', '0');
                } else {
                    work_icon_grid.css('padding', '0 0 13% 0');
                };
            } else {
                work_icon_grid.css('padding', '0');
            }
        };
    }

    // Enable mobile classes
    function mobilenav() {
        if (browserwidth <= transitionwidth) {
            work_icon_grid.removeClass('work-icon-grid').addClass('work-icon-grid-mobile')
            $('.work-icons li').removeClass('work-icon white').addClass('work-icon-mobile');
        } else {
            $('.work-icon-grid-mobile').removeClass('work-icon-grid-mobile').addClass('work-icon-grid');
            $('.work-icons li').removeClass('work-icon-mobile').addClass('work-icon white');
        };
    };

    // Shrink project nav
    function shrinknav() {
        $('.work-icon-grid, .work-icon-grid ul').css('height', 80);
        $('.work-icon-grid ul').css('width', 400);
        work_icon_grid.css('padding', 0);
        work_icon_grid.css('background', '#eee');
        work_icon.removeClass('white');
        work_icon.addClass('black');
        $('.work-icon p').detach();

        work_icon.css('width', 80);
        work_icon.css('height', 80);
    };

    $(window).resize(function () {
        imagewidth = $(this).width();
        imageheight = $(this).height();
        browserwidth = $(window).width();
        browserheight = $(window).height();
        fullscreen();
        mobilenav();
        heightchanges();
        // if ($('.project').is(':visible') || browserwidth >= 1000){
        //     shrinknav();
        // };
    });

    // Functions initialized on load
    heightchanges()
    fullscreen();
    mobilenav();

    // Label scrolling
    $('.work-label').click(function () {
        $(jQuery.browser.webkit ? "body" : "html").animate({ 'scrollTop': browserheight }, 400);
    });
    $('.about-label').click(function () {
        $(jQuery.browser.webkit ? "body" : "html").animate({ 'scrollTop': about_pos }, 400);
    });


    // Project transitions for mobile
    work_icon_mobile.live('click', function () {
        var project = $(this).attr('id');
        $('.active').removeClass('active');
        $(this).addClass('active');

        if (project_element.is(':visible')) {
            if ($('#open-' + project).is(':visible')) {
                return false;
            } else {
                project_element.fadeOut(400);
                $('#open-' + project).fadeIn(400);
            };
        }
        else {
            $('#open-' + project).slideDown(400);
        };
    });

    // Transitions on clicking project
    work_icon.live('click', function () {
        var project = $(this).attr('id');
        $('.active').removeClass('active');
        $(this).addClass('active');
        console.log('#open-' + project);
        $('.work-icon-grid h3').hide();

        // Selecting another project
        if (project_element.is(':visible')) {
            if ($('#open-' + project).is(':visible')) {
                $(jQuery.browser.webkit ? "body" : "html").animate({ 'scrollTop': browserheight }, 400);
            } else {
                $(jQuery.browser.webkit ? "body" : "html").animate({ 'scrollTop': browserheight }, 400, function () {
                    project_element.fadeOut(400);
                    $('#open-' + project).fadeIn(400);
                });
            }
        }
            // First time pressing on a project
        else {
            work_icon_grid.animate({ 'opacity': 0 }, 200, function () {
                shrinknav();
            });

            $('#open-' + project).slideDown(400, function () {
                $(jQuery.browser.webkit ? "body" : "html").animate({ 'scrollTop': browserheight }, 400);
            });

            work_icon_grid.delay(1000).animate({ 'opacity': 1 }, 200);
            $('nav').delay(1200).fadeIn(400);
        };
    });

    // Change positioning of project nav on scroll
    $(document).scroll(function () {
        browserheight = $(window).height();
        about_pos = $('.about-me').offset().top;

        if (project_element.is(':visible') && browserwidth > transitionwidth) {

            if ($(document).scrollTop() >= browserheight && $(document).scrollTop() <= about_pos - 80) {
                work_icon_grid.css('position', 'fixed');
                work_icon_grid.css('top', 0);
                project_imgs.css('padding-top', 80);
            } else if ($(document).scrollTop() > about_pos - 80) {
                work_icon_grid.css('position', 'absolute');
                work_icon_grid.css('top', about_pos - 80);
            } else {
                work_icon_grid.css('position', 'relative');
                work_icon_grid.css('top', '0');
                project_imgs.css('padding-top', 0);
            };
        };
    });

    // Show project name 
    if (project_element.is(':visible')) {
        work_icon.hover(function () {
            $(this).children().hide();
        });
    } else {
        work_icon.hover(function () {
            if (browserwidth >= transitionwidth) {
                $(this).children().fadeIn(190);
            };
        },
        function () {
            $(this).children().fadeOut(150);
        });
    };

}); // End doc.ready