(function($) {
  $.fn.accordion = function(options) {
    var defaults = {
      heading: "h2",
      paragraph: "p",
      duration: 600,
      callback: function() {}
    }
    var params = $.extend({}, defaults, options)

    return this.each(function() {
      var headings = $(this).children(params.heading)
      var paragraphs = $(this).children(params.paragraph)

      var animateAccordion = function(elem, duration, callback) {
        var easing = "easeInSine"
        paragraphs.stop(true, true).slideUp(duration, easing, callback)
        $(elem).stop(true, true).slideDown(duration, easing, callback)
      }

      paragraphs.not(":first").hide()
      $(this).on("click", params.heading, function() {
        var para = $(this).next()
        // It's .next() because 'this' is referring to a header,
        // and the related paragraph comes next in the DOM of
        // this page.
        if(!para.is(":visible")) {
          para.trigger("showParagraph")
        }
      })

      $(this).on("showParagraph", params.paragraph, function() {
        animateAccordion(this, params.duration, params.callback)
      })
    })
  }
})(jQuery)
