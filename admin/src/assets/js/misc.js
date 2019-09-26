function initMisc() {



    (function($) {
        'use strict';
        $(function() {
            var body = $('body');
            var contentWrapper = $('.content-wrapper');
            var scroller = $('.container-scroller');
            var footer = $('.footer');
            var sidebar = $('.sidebar');

            //Close other submenu in sidebar on opening any

            sidebar.on('show.bs.collapse', '.collapse', function() {
                sidebar.find('.collapse.show').collapse('hide');
            });


            //Change sidebar and content-wrapper height
            applyStyles();

            function applyStyles() {

                //setting content wrapper height
                setTimeout(function() {
                    if (contentWrapper.outerHeight() < (sidebar.outerHeight() - footer.outerHeight())) {
                        contentWrapper.css({
                            'min-height': sidebar.outerHeight() - footer.outerHeight()
                        });
                    }

                    if (sidebar.outerHeight() < (contentWrapper.outerHeight() + footer.outerHeight())) {
                        sidebar.css({
                            'min-height': contentWrapper.outerHeight() + footer.outerHeight()
                        });
                    }

                }, 10);


                //Applying perfect scrollbar
                $('.product-chart-wrapper, .table-responsive').perfectScrollbar();
            }

            $('.sidebar [data-toggle="collapse"]').on("click", function(event) {
                //Updating content wrapper height to sidebar height on expanding a menu in sidebar
                var clickedItem = $(this);
                console.log(clickedItem);
                if (clickedItem.attr('aria-expanded') === 'false') {
                    var scrollTop = scroller.scrollTop() - 20;
                } else {
                    var scrollTop = scroller.scrollTop() - 100;
                }
                setTimeout(function() {
                    if (contentWrapper.outerHeight() + footer.outerHeight() !== sidebar.outerHeight()) {
                        applyStyles();
                        scroller.animate({ scrollTop: scrollTop }, 350);
                    }
                }, 400);
            });

            //checkbox and radios
            $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
        });
    })(jQuery);
}