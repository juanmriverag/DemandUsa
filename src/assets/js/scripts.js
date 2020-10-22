
$(document).ready(function () {

    $(document).on('keypress', '[data-fieldtype="money"]', function (event) {
        var characterCode = (event.which) ? event.which : event.keyCode;
        if (characterCode < 48 || characterCode > 57) {
            return false;
        }
        return true;
    });

    $(document).on('input', '[data-fieldtype="money"]', function (event) {
        var value = $(this).val();
        value = value + "";
        value = value.replace(/\D/g, "");
        if (value.length != 0) {
            value = parseInt(value, 10).toString();
        }
        if (value.length <= 0) {
            value = "0";
        }

        var newValue = '';
        var valueArray = value.split('');
        for (var x = valueArray.length - 1; x >= 0; x--) {
            var valueNumber = newValue.replace(/\D/g, "");
            if ((valueNumber.length ) % 3 == 0 && valueNumber.length  != 0 ) {
                newValue = valueArray[x] + "." + newValue
            } else {
                newValue = valueArray[x] + "" + newValue
            }
        }
        $(this).val(newValue);
    });

});