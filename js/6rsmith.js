$(function () {
    var $document = $('html')
    var $siteTitle = $(".site-heading h1")
    var $siteSubtitle = $(".site-heading h2")

    $(".bstooltip").each(function(index, element) {
        var $el = $(element)
        $el.attr({
            "data-toggle": "tooltip",
            "data-trigger": "manual",
            animation: true
        })
        $el.tooltip()

        $el.on("mouseover.rsmith focusin.rsmith", function() {
            console.log("over")
            $el.tooltip('show')
        })

        $document.on("click.rsmith", function(event) {
            if (event.target != $el) {
                $el.tooltip('hide')
            }
        })

        $el.on("click.rsmith", function(event) {
            event.stopPropagation()
        })
    })

    function playTitles() {
        $siteTitle.liveInput({
            writeDelay: 120,
            callback: function() {
                $siteSubtitle.liveInput({
                    initialDelay: 200,
                    writeDelay: 90,
                })
            }
        })
    }

    playTitles()

    var $photo = $(".site-heading .photo")
    $photo.on("click", function() {
        // Although this happens in the jquery code - it only happens when the plugin runs for each element.
        // We want all elements cleared before start.
        $siteTitle.children(".char").remove()
        $siteSubtitle.children(".char").remove()
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }

        playTitles()
    })
})
