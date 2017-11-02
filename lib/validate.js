goog.provide('APP.VALIDATE');
goog.require('APP.EVENT');
goog.require('CORE');

(function(EVENT){

    EVENT['_window'] || (EVENT['_window'] = []);

    /** @const */

    EVENT['_window'] = EVENT['_window'].concat([{

        on: 'keypress',
        if: '.form-validate',
        do: validateInputs,
        stopBubble: false,
        preventDefault: false
    },{

        on: 'keyup',
        if: '.form-validate',
        do: validateInputs,
        stopBubble: false,
        preventDefault: false
    }]);

    var support_keypress = false;

    /** @const */

    var validate_charset_integer = "0123456789";

    /**
     * @const
     * @this {HTMLElement}
     */

    function validateInputs(event){

        if(this.dataset && (this.dataset['validateType'] === 'integer')){

            var value = this.value, has_changed = false;

            if(value){

                for(var i = 0; i < value.length; i++){

                    if((this.dataset['validateCharset'] || validate_charset_integer).indexOf(value[i]) === -1){

                        value = value.replace(value[i], '');
                        has_changed = true;
                    }
                }
            }
            else{

                // NOTE: inputs with type="number" returns empty value if special chars
                // are in there, e.g. from copy & paste

                this.value = '';
            }

            if(has_changed) this.value = value;

            if(event.type === 'keypress') support_keypress = true;
            else if(support_keypress) return;

            var is_valid = true;
            var charcode;
            var charvalue;

            if(support_keypress){

                charcode = event.charCode;
                charvalue = String.fromCharCode(charcode);
            }
            else{

                charvalue = event.keyCode || event.which;
                charcode = String(charvalue).charCodeAt(0);
            }

            if((charcode < 48) || (charcode > 57)){

                is_valid = false;
            }
            else{

                var current_value = parseInt(value + (support_keypress ? charvalue : ''), 10);

                if(this.dataset['validateMin'] && (current_value < parseInt(this.dataset['validateMin'], 10))){

                    is_valid = false;
                }
                else if(this.dataset['validateMax'] && (current_value > parseInt(this.dataset['validateMax'], 10))){

                    is_valid = false;
                }
            }

            if(is_valid === false){

                if(!support_keypress) {

                    this.value = value.substring(0, value.length - 1)
                }

                return CORE.preventEvent(event, /* prevent default: */ true, /* stop bubble: */ false);
            }
        }
    };

})(APP.EVENT);
