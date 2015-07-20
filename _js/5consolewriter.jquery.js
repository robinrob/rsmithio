(function ($) {
    $.fn.consoleWriter = function (options) {
        var defaults = {
            text: "",
            audioDir: "/sounds",
            animation: false,
            animationSound: false,
            typingSound: false,
            cursorFadeDuration: 500,
            initialDelay: 150,
            writeDelay: 150,
            cursorCSS: { 'margin-right': '0.05em', opacity: 0 },
            leadingCursor: false,
            leadingCursorCSS: { opacity: 0, 'margin-left': '0.05em' },
            callback: function() {}
        }
        options = options || {}
        var params = $.extend({}, defaults, options)

        // Common variables
        var KEYS = {
            backspace: 8
        }

        var keySounds = [
            'keypress1.mp3',
            'keypress2.mp3',
            'keypress3.mp3'
        ]

        // Common functions
        function isBackSpace(keyCode) {
            return keyCode === KEYS.backspace
        }

        function toBoolean(boolOrStr) {
            if (boolOrStr === true || boolOrStr === "true") {
                return true
            }
            else {
                return false
            }
        }

        function toBoolString(bool) {
            if (bool === true || bool === "true") {
                return "true"
            }
            else if (bool === false || bool === "false") {
                return "false"
            }
        }

        function decideParam(options) {
            for (var index = 0; index < options.length; ++index) {
                if (index === (options.length - 1)) {
                    return toBoolean(options[index])
                }
                else if (toBoolString(options[index])) {
                    return toBoolean(options[index])
                }
            }
        }

        // Get random key press sound filename
        function keySound() {
            return params.audioDir + '/' + keySounds[Math.round(Math.random() * (keySounds.length - 1))]
        }

        // Play random key press sound
        function keyPress() {
            var $audio = $('<audio></audio>')
            $audio.attr('src', keySound())
            $audio.on('ended', function () {
                $audio.remove()
            })
            $audio.trigger('play')
        }

        // Type char into the element containing $cursorObj and immediately preceding $cursorObj
        function writeChar(char, $cursorObj, isSoundEnabled, callback) {
            insertChar(char, $cursorObj)
            if (isSoundEnabled) {
                keyPress()
            }
        }

        // Insert char into the element containing $cursorObj and immediately preceding $cursorObj
        function insertChar(char, $cursorObj) {
            var $char = $('<span />', {
                html: char,
                class: 'cw-char'
            });
            $char.insertBefore($cursorObj)
        }

        // Write an invisible cursor character into the element containing $cursorObj and immediately preceding $cursorObj
        function insertInvisibleCursor($cursorObj) {
            var $char = createCursor(params.leadingCursorCSS)
            $char.insertBefore($cursorObj)
        }

        // Delay-type text into the element containing $cursorObj and immediately preceding $cursorObj
        function writeText(text, $cursorObj, isSoundEnabled, callback) {
            var char = text.substr(0, 1)
            text = text.slice(1)
            writeChar(char, $cursorObj, isSoundEnabled)
            if (text.length === 0 && callback) {
                callback()
            }
            else if (text.length > 0) {
                setTimeout(function() {
                    writeText(text, $cursorObj, isSoundEnabled, callback)
                }, params.writeDelay + Math.random() * params.writeDelay)
            }
        }

        // Insert text into the element containing $cursorObj and immediately preceding $cursorObj
        function insertText(text, $cursorObj, callback) {
            var char = text.substr(0, 1)
            text = text.slice(1)
            insertChar(char, $cursorObj)
            if (text.length === 0 && callback) {
                callback()
            }
            else if (text.length > 0) {
                insertText(text, $cursorObj, callback)
            }
        }

        // Check me char is a type-able character
        function isValidChar(char) {
            var regex = /./
            return regex.test(char)
        }

        // Check me input keyCode corresponds to a type-able character OR backspace
        function isPossibleKeyCode(keyCode) {
            return isBackSpace(keyCode) || isValidChar(String.fromCharCode(keyCode))
        }

        // Create a cursor object
        function createCursor(css) {
            var $cursor = $('<span />', {
                text: '_',
                class: 'cw-cursor'
            })
            if (css) {
                $cursor.css(css)
            }
            return $cursor
        }

        return this.each(function () {
            var me = this
            var $me = $(me)

            // On first run, save the text to use again if we call consoleWriter() again from javascript.
            if (!$me.attr('cw-saved-text')) {
                $me.attr('cw-saved-text', $me.text())
            }

            /* These are element-specific parameters & attributes. */
            me.params = {}
            me.params.text = options.text || $me.attr('cw-text') || $me.attr('cw-saved-text') || defaults.text
            me.params.cursorColor = options.cursorColor || $me.attr('cw-color') || defaults.color

            /* These parameters are all given either as javascript booleans or as html attribute strings */
            me.params.animation = decideParam([options.animation, $me.attr('cw-animation'), defaults.animation])
            me.params.sound = decideParam([options.sound, $me.attr('cw-sound'), defaults.sound])
            // If not specified, check the 'sound' parameter then fallback to default
            me.params.animationSound = decideParam([me.params.sound, options.animationSound, $me.attr('cw-animation-sound'), me.params.sound, defaults.animationSound])
            // If not specified, check the 'sound' parameter then fallback to default
            me.params.typingSound = decideParam([options.typingSound, $me.attr('cw-typing-sound'), me.params.sound, defaults.typingSound])
            me.params.leadingCursor = decideParam([options.leadingCursor, $me.attr('cw-leading-cursor'), defaults.leadingCursor])

            me.$cursor = createCursor(params.cursorCSS)

            $me.attr("tabindex", -1)

            reset()
            $me.append(me.$cursor)
            if (me.params.leadingCursor) {
                insertInvisibleCursor(me.$cursor)
            }
            /* Typewriter animation */
            if (me.params.animation) {
                showCursor()
                setTimeout(function () {
                    writeText(me.params.text, me.$cursor, me.params.animationSound, function() {
                        fadeOutCursor()
                        params.callback()
                    })
                }, params.initialDelay)
            }
            else {
                insertText(me.params.text, me.$cursor, params.callback())
            }

            $me.off('focusin.consolewriter focousout.consolewriter keydown.consolewriter keypress.consolewriter keyup.consolewriter keyinput.consolewriter')
            $me.on('focusin', function() {
                keyPressIfSoundEnabled()
                showCursor(toggleCursor)
            })

            $me.on('focusout.consolewriter', function() {
                me.$cursor.stop(true)
                hideCursor()
            })

            $me.on('keydown.consolewriter', function consolewriterKeyDown(event) {
                if ($me.is(':focus') && isBackSpace(event.keyCode)) { // backspace
                    event.type = 'keyInput'
                    $me.trigger(event)
                    event.preventDefault()
                }
            })

            $me.on('keypress.consolewriter', function consolewriterKeyPress(event) {
                if ($me.is(':focus')) {
                    event.type = 'keyInput'
                    $(this).trigger(event)
                    event.preventDefault()
                }
            });

            $me.on('keyup.consolewriter', function consolewriterKeyUp(event) {
                if ($me.is(':focus') && isBackSpace(event.keyCode)) {
                    keyPressIfSoundEnabled()
                }
            })

            $me.on('keyInput.consolewriter', function consolewriterKeyInput(event) {
                var code = event.charCode || event.keyCode;
                var char = String.fromCharCode(code)

                if (isBackSpace(code)) { //backspace
                    me.$cursor.siblings('.cw-char').last().remove()
                }
                else if (isValidChar(char)) {
                    if (char == ' ') {
                        char = '&nbsp'
                    }
                    keyPressIfSoundEnabled()
                    writeChar(char, me.$cursor)
                }
            });

            // Instance functions
            function reset() {
                $me.text('')
                $me.children('.cw-char, .cw-cursor').remove()
            }

            function keyPressIfSoundEnabled() {
                if (me.params.typingSound) {
                    keyPress()
                }
            }

            function toggleCursor() {
                var opacity = me.$cursor.css('opacity')
                if (opacity === '0') {
                    fadeInCursor(params.cursorFadeDuration, toggleCursor)
                }
                else {
                    fadeOutCursor(params.cursorFadeDuration, toggleCursor)
                }
            }

            function fadeInCursor(duration, callback) {
                fadeCursor(1, duration, callback)
            }

            function fadeOutCursor(duration, callback) {
                fadeCursor(0, duration, callback)
            }

            function fadeCursor(opacity, duration, callback) {
                me.$cursor.animate(
                    {
                        opacity: opacity
                    },
                    {
                        duration: duration,
                        complete: callback
                    }
                )
            }

            function hideCursor(callback) {
                fadeOutCursor(0, callback)
            }

            function showCursor(callback) {
                fadeInCursor(0, function() {
                    setTimeout(callback, params.cursorFadeDuration)
                })
            }
        })
    }

    $('.console-writer').consoleWriter({
        writeDelay: 120
    })
})(jQuery)