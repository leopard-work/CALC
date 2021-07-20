import 'reset-css';
import 'inputmask';
import 'air-datepicker';
import 'inputmask/dist/jquery.inputmask.min';
import 'air-datepicker/dist/css/datepicker.min.css';
import 'jquery-form-styler/dist/jquery.formstyler.css';
import '../css/jquery.formstyler.theme.css';
import 'jquery-form-styler/dist/jquery.formstyler.theme.css';
require('./jquery.formstyler.min.js');



$(document).ready(function () {
    $('input[name=phone]').inputmask("+7 (999) 999-9999");
    $('input[type=checkbox], select').styler();
    $('.v2-calc-date').datepicker({
        minDate: new Date()
    });
});



