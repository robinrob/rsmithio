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

    function addConsoleWriterLinkToSubHeading() {
        var $subHeading = $("#site_subheading")
        var $link = $('<a id="console_writer_link" href="https://github.com/robinrob/console-writer" target="_blank">Console Writer</a>')
        $link.hide()
        $subHeading.append($link)
        $link.fadeIn(600)
    }

    function removeConsoleWriterLinkFromSubHeading() {
        $("#console_writer_link").remove()
    }

    function playTitles(title, subtitle) {
        removeConsoleWriterLinkFromSubHeading()
        $siteTitle.consoleWriter({
            animation: true,
            writeDelay: 120,
            text: title,
            callback: function() {
                $siteSubtitle.consoleWriter({
                    animation: true,
                    initialDelay: 200,
                    writeDelay: 70,
                    text: subtitle,
                    callback: function() {
                        addConsoleWriterLinkToSubHeading()
                    }
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

        if ($siteTitle.text().indexOf('Robin') != -1) {
            playTitles("You've found", "an easter egg!")
        } else {
            playTitles($siteTitle.attr("cw-saved-text"), $siteSubtitle.attr("cw-saved-text"))
        }
    })
})