(function ($) {
    $.fn.liveInput = function (options) {
        var defaults = {
            text: '',
            audioDir: 'sounds',
            sound: false,
            cursorFadeDuration: 500,
            initialDelay: 150,
            writeDelay: 150,
            editable: true,
            css: { 'padding-left': '1em' },
            leadingCursor: false,
            leadingCursorCSS: { opacity: 0, 'margin-left': '0.05em' },
            cursorCSS: { color: 'white', 'margin-right': '0.05em' },
            callback: function() {}
        }
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

        function toBoolean(val) {
            return val === true || val === "true"
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
                class: 'li-char'
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
            if (text.length == 0) {
                callback()
            }
            else if (text.length > 0) {
                setTimeout(function() {
                    writeText(text, $cursorObj, isSoundEnabled, callback)
                }, params.writeDelay + Math.random() * params.writeDelay)
            }
        }

        // Check that char is a type-able character
        function isValidChar(char) {
            var regex = /./
            return regex.test(char)
        }

        // Check that input keyCode corresponds to a type-able character OR backspace
        function isPossibleKeyCode(keyCode) {
            return isBackSpace(keyCode) || isValidChar(String.fromCharCode(keyCode))
        }

        // Create a cursor object
        function createCursor() {
            return $('<span />', {
                text: '_',
                class: 'li-cursor'
            })
        }

        return this.each(function () {
            var $this = $(this)

            var text = $this.text()
            // Save the complete original element text, in case the animation is re-run whilst already running.
            if (!$this.attr('li-saved-text')) {
                $this.attr('li-saved-text', text)
            }

            params.text = options.text || $this.attr('li-text') || $this.attr('li-saved-text') || defaults.text
            params.cursorColor = options.cursorColor || $this.attr('li-color') || defaults.color
            params.sound = toBoolean(options.sound || $this.attr('li-sound') || defaults.sound)

            $this.css(params.css)

            var $cursor = createCursor()
            $cursor.css(params.cursorCSS)

            setTimeout(function () {
                reset()
                $this.append($cursor)
                if (params.leadingCursor) {
                    writeInvisibleCursor($cursor)
                }
                writeText(params.text, $cursor, params.sound, function() {
                    fadeOutCursor()
                    params.callback()
                })
            }, params.initialDelay)


            $this.off('focusin.liveinput focousout.liveinput keydown.liveinput keypress.liveinput keyup.liveinput keyinput.liveinput')
            $this.on('focusin.liveinput', function() {
                console.log("WANKER")
                keyPressIfSoundEnabled()
                showCursor(toggleCursor)
            })

            $this.on('focusout.liveinput', function() {
                $cursor.stop(true)
                hideCursor()
            })

            $this.on('keydown.liveinput', function liveInputKeyDown(event) {
                if ($this.is(':focus') && isBackSpace(event.keyCode)) { // backspace
                    event.type = 'keyInput'
                    $(this).trigger(event)
                    event.preventDefault()
                }
            })

            $this.on('keypress.liveinput', function liveInputKeyPress(event) {
                if ($this.is(':focus')) {
                    event.type = 'keyInput'
                    $(this).trigger(event)
                    event.preventDefault()
                }
            });

            $this.on('keyup.liveinput', function liveInputKeyUp(event) {
                if ($this.is(':focus') && isBackSpace(event.keyCode)) {
                    keyPressIfSoundEnabled()
                }
            })

            $this.on('keyInput.liveinput', function liveInputKeyInput(event) {
                var code = event.charCode || event.keyCode;
                var char = String.fromCharCode(code)

                if (isBackSpace(code)) { //backspace
                    $cursor.siblings('.li-char').last().remove()
                }
                else if (isValidChar(char)) {
                    if (char == ' ') {
                        char = '&nbsp'
                    }
                    writeChar(char, $cursor)
                    keyPressIfSoundEnabled()
                }
            });

            // Instance functions
            function reset() {
                $this.text('')
                $this.children('.li-char, .li-cursor').remove()
            }

            function keyPressIfSoundEnabled() {
                if (params.sound) {
                    keyPress()
                }
            }

            function toggleCursor() {
                var opacity = $cursor.css('opacity')
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
                $cursor.animate(
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

    $('.live-input').liveInput({
        writeDelay: 120
    })
})(jQuery)