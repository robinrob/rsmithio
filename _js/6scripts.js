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
        $siteTitle.consoleWriter({
            animation: true,
            writeDelay: 120,
            callback: function() {
                $siteSubtitle.consoleWriter({
                    animation: true,
                    initialDelay: 200,
                    writeDelay: 70
                })
            }
        })
    }

    function showTitles() {
        $siteTitle.consoleWriter({
            callback: function() {
                $siteSubtitle.consoleWriter()
            }
        })
    }

    playTitles()

    var $photo = $(".site-heading .photo")
    $photo.on("click", function() {
        // Although this happens in the jquery code - it only happens when the plugin runs for each element.
        // We want all elements cleared before start.
        $siteTitle.children(".cw-char").remove()
        $siteSubtitle.children(".cw-char").remove()
        var highestTimeoutId = setTimeout(';');
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }

        playTitles()
    })
})