(function ($) {
    $.fn.consoleWriter = function (options) {
        var defaults = {
            text: "",
            tabindex: -1,
            audioDir: "sounds",
            sound: false,
            cursorFadeDuration: 500,
            initialDelay: 150,
            writeDelay: 150,
            editable: true,
            css: {},
            cursorCSS: { color: 'black', 'margin-right': '0.05em' },
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
            return boolOrStr === true || boolOrStr === "true"
        }

        function toStr(bool) {
            return bool ? "true" : "false"
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

        // Write char into the element containing $cursorObj and immediately preceding $cursorObj
        function writeChar(char, $cursorObj, isSoundEnabled, callback) {
            var $char = $('<span />', {
                html: char,
                class: 'cw-char'
            });
            $char.insertBefore($cursorObj)
            if (isSoundEnabled) {
                keyPress()
            }
        }

        // Write an invisible cursor character into the element containing $cursorObj and immediately preceding $cursorObj
        function writeInvisibleCursor($cursorObj) {
            var $char = createCursor()
            $char.addClass('leadingCursor')
            $char.css(params.leadingCursorCSS)
            $char.insertBefore($cursorObj)
        }

        // Write char into the element containing $cursorObj and immediately preceding $cursorObj
        function writeText(text, $cursorObj, isSoundEnabled, callback) {
            var char = text.substr(0, 1)
            text = text.slice(1)
            writeChar(char, $cursorObj, isSoundEnabled)
            if (text.length == 0 && callback) {
                callback()
            }
            else if (text.length > 0) {
                setTimeout(function() {
                    writeText(text, $cursorObj, isSoundEnabled, callback)
                }, params.writeDelay + Math.random() * params.writeDelay)
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
        function createCursor() {
            return $('<span />', {
                text: '_',
                class: 'cw-cursor'
            })
        }

        return this.each(function () {
            var me = this
            var $me = $(me)

            console.log("this: " + this)
            console.log("$me.text(): " + $me.text())
            console.log("cw-saved-text: " + $me.attr('cw-saved-text'))
            // Save the complete original element text, in case the animation is re-run whilst already running.
            if (!$me.attr('cw-saved-text')) {
                $me.attr('cw-saved-text', $me.text())

                // These are element-specific attributes that we need to set once on first run and store
                me.params = {}
                me.params.text = options.text || $me.attr('cw-text') || $me.attr('cw-saved-text') || defaults.text
                me.params.cursorColor = options.cursorColor || $me.attr('cw-color') || defaults.color
                me.params.sound = toBoolean(toStr(options.sound) || $me.attr('cw-sound') || toStr(defaults.sound))
                console.log("me.params.sound: " + me.params.sound)
                me.params.leadingCursor = toBoolean(toStr(options.leadingCursor) || $me.attr('cw-leading-cursor') || toStr(defaults.leadingCursor))

                me.$cursor = createCursor()
                // Only need to do these once
                me.$cursor.css(params.cursorCSS)
                $me.attr("tabindex", params.tabindex)
                $me.css(params.css)
            }
            
            setTimeout(function () {
                reset()
                $me.append(me.$cursor)
                if (me.params.leadingCursor) {
                    writeInvisibleCursor(me.$cursor)
                }
                writeText(me.params.text, me.$cursor, me.params.sound, function() {
                    fadeOutCursor()
                    params.callback()
                })
            }, params.initialDelay)


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
                    writeChar(char, me.$cursor)
                    keyPressIfSoundEnabled()
                }
            });

            // Instance functions
            function reset() {
                $me.text('')
                $me.children('.cw-char, .cw-cursor').remove()
            }

            function keyPressIfSoundEnabled() {
                if (me.params.sound) {
                    keyPress()
                }
            }

            function toggleCursor() {
                var opacity = me.$cursor.css('opacity')
                var callback
                if (opacity == 0) {
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
                fadeInCursor(params.cursorFadeDuration / 2, callback)
            }
        })
    }

    $('.console-writer').consoleWriter({
        writeDelay: 120
    })
})(jQuery)