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

    $('.v2-calc-plus').click(function(e) {
        e.preventDefault();
        var val=$(this).parent().find('input').val()*1;
        var name=$(this).parent().find('input').attr('name');
        if (name=='clean-area') {
            val+=5;
            $(this).parent().find('input').val(val);
            calc3();
            return 0;
        }
        if (name=='level') {
            val++;
            if (val>5) val=5;
            $(this).parent().find('input').val(val);
            calc3();
            return 0;
        }
        val++;
        $(this).parent().find('input').val(val);
        calc3();
    });
    $('.v2-calc-minus').click(function(e) {
        e.preventDefault();
        var val=$(this).parent().find('input').val()*1;
        var name=$(this).parent().find('input').attr('name');
        if (name=='clean-area') {
            val-=5;
            if (val<5) val=5;
            $(this).parent().find('input').val(val);
            calc3();
            return 0;
        }
        if (name=='level') {
            val--;
            if (val<1) val=1;
            $(this).parent().find('input').val(val);
            calc3();
            return 0;
        }
        val--;
        if (val<0) val=0;
        $(this).parent().find('input').val(val);
        calc3();
    });
    $('.v2-calc select').change(function() {
        calc3();
    });
    $('.v2-calc input[type=checkbox]').change(function() {
        calc3();
    });
    $('.v2-calc-item-stars svg').click(function (e) {
        e.preventDefault();
        var index=$(this).index();
        $('.v2-calc-item-stars svg').removeClass('active')
        for (let i=0;i<=index;i++) {
            $('.v2-calc-item-stars svg').eq(i).addClass('active');
        }
        index++;
        $('input[name=level]').val(index);
        calc3();
    });
    function calc3() {
        let tp=$('select[name=kitchen-size] option:selected').attr('data-val');
        let area=$('input[name=clean-area]').val()*1;
        let w1=$('input[name=w1]').val()*1;
        let w2=$('input[name=w2]').val()*1;
        let w3=$('input[name=w3]').val()*1;
        let w4=$('input[name=w4]').val()*1;
        let level=$('input[name=level]').val()*1;
        let chandeliers=$('input[name=chandeliers]').val()*1;

        let f1=$('input[name=f1]').prop('checked');
        let f2=$('input[name=f2]').prop('checked');
        let f3=$('input[name=f3]').prop('checked');
        let f4=$('input[name=f4]').prop('checked');
        let f5=$('input[name=f5]').prop('checked');
        let f6=$('input[name=f6]').prop('checked');
        let f7=$('input[name=f7]').prop('checked');
        let f8=$('input[name=f8]').prop('checked');

        if (tp!=0) $('#calc3_tp').html($('select[name=kitchen-size]').val());
        else $('#calc3_tp').html('Выберите вид уборки');

        $('#calc3_rooms').html($('select[name=kitchen-size2]').val());
        $('#calc3_bathroom').html($('input[name=kitchen-size3]').val());
        $('#calc3_area').html(area);
        $('#calc3_area_price').html(area*tp);
        $('#calc3_w1').html(w1);
        $('#calc3_w1_price').html(w1*200);
        $('#calc3_w2').html(w2);
        $('#calc3_w2_price').html(w2*300);
        $('#calc3_w3').html(w3);
        $('#calc3_w3_price').html(w3*500);
        $('#calc3_w4').html(w4);
        $('#calc3_w4_price').html(w4*150);
        $('#calc3_chandeliers').html(chandeliers);
        $('#calc3_chandeliers_price').html(chandeliers*250);
        $('#calc3_level').html(level);

        var res=0;
        res=area*tp;
        res+=w1*200;
        res+=w2*380;
        res+=w3*500;
        res+=w4*150;
        if (level>2) res+=(level-2)*700;
        res+=chandeliers*250;

        let fcount=0;
        let fprice=0;
        if (f1) {
            res += 250;
            fcount++;
            fprice += 250;
        }
        if (f2) {
            res+=250;
            fcount++;
            fprice+=250;
        }
        if (f3) {
            res+=250;
            fcount++;
            fprice+=250;
        }
        if (f4) {
            res+=200;
            fcount++;
            fprice+=200;
        }
        if (f5) {
            res+=300;
            fcount++;
            fprice+=300;
        }
        if (f6) {
            res+=1500;
            fcount++;
            fprice+=1500;
        }
        if (f7) {
            res+=350;
            fcount++;
            fprice+=350;
        }
        if (f8) {
            res+=0;
            fcount++;
            fprice+=0;
        }
        $('#calc3_dop').html(fcount);
        $('#calc3_dop_price').html(fprice);
        $('.v2-calc-result-bottom span').html(res);
        $('input[name=calc3-full]').val(res);
    }
});



