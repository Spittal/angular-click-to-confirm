(function() {
angular
    .module("$click-to-confirm", [])
    .directive("clickToConfirm", clickToConfirm);

    function clickToConfirm($timeout) {
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                //Get Messages
                var oldMsg = element.html();
                var newMsg = attr.clickToConfirm || "Are you sure..?";

                //Find the Click Action
                var clickAction = attr.ngClick;
                var clickActionNameForEvent = attr.ngClick.split("(")[0];

                //Transform the button into desired HTML structure
                element.css({'position':'relative','overflow':'hidden'});

                var html = "<div class='new-before-slide-out' style='top: -45px; position: absolute; width: 100%; transition: top .3s; left: 0; text-align: center'>" + newMsg + "</div>";
                html += "<div class='old-before-slide-out' style='top: 0; position: relative; text-align: center; transition: top .3s;'>" + oldMsg + "</div>";
                element.html(html);

                ///////////////////////////////////////////////animation logic

                function clickToConfirmToggle() {
                    var confirm = element.attr('data-confirm');
                    if (confirm == 'true') {
                        scope.$eval(clickAction);
                        scope.$apply();
                        slideOut();
                    } else {
                        slideIn();
                    }
                }

                function slideIn() {
                    var topOffset = $(element.children()[1]).position().top;
                    var height = element[0].clientHeight;

                    element.attr('data-confirm', true);
                    element.addClass('confirm');

                    setClickToConfirmDocumentListener();

                    $timeout(function() {
                        $(element.children()[0]).css("top",topOffset); //newText
                        $(element.children()[1]).css("top",height + 25); //oldText
                    });
                }

                function slideOut() {
                    var height = element[0].clientHeight;

                    element.attr('data-confirm', false);
                    element.removeClass('confirm');

                    $timeout(function() {
                        $(element.children()[0]).css("top",-(height + 25)); //newText
                        $(element.children()[1]).css("top",0); //OldText
                    });
                }

                //////////////////////////////////////////////////binding logic
                
                //Bind to a click on button
                element.bind('click',function () {
                    clickToConfirmToggle();
                });

                //Set up dismiss by clicking off
                function setClickToConfirmDocumentListener() {
                    $(document).on('click.bolt.clickConfim.' + clickActionNameForEvent, function(event) {
                        if (!$(event.target).closest(element[0]).length) {
                            removeClickToConfirmDocumentListener();
                            slideOut();
                            scope.$apply();
                        }
                    });
                }

                //remove dismiss by clicking off
                function removeClickToConfirmDocumentListener() {
                    $(document).off('click.bolt.clickConfim.' + clickActionNameForEvent);
                }
            }
        };
    }
})();