jQuery(document).ready(function () {

    var ct = '<div id="infMSG"><div id="infTextMSG"><img src="vmprices-ajaxcart-box.gif" alt="" /><br /><span>A termék a kosárba került!</span></div></div>';

    jQuery('head').prepend(ct);

});

Virtuemart.sendtocart = function (form) {
    if (Virtuemart.addtocart_popup == 1) {
        Virtuemart.cartEffect(form);
    } else {
        form.append('<input type="hidden" name="task" value="add" />');
        submitAjax(form);
        //form.submit();
    }
}

var submitAjax = function (form) {

    //form.preventDefault();

    var aURL = jQuery(form).attr('action');

    if (aURL == "#") {
        aURL = "";
    }
    var aData = jQuery(form).serialize();


    jQuery('#infMSG').addClass('show');
    setTimeout(function () {
        jQuery("#infMSG").removeClass("show");
    }, 3000);


    jQuery.ajax({
        url: aURL,
        type: "POST",
        data: aData,
        success: function (data) {
            var outPut = jQuery(data).find('div.sideCart').html();
            jQuery('body').find('div.sideCart').html(outPut);
        },
        timeout: 15000//timeout of the ajax call
    });
    return false;
}

Virtuemart.cartEffect = function (form) {

    var dat = form.serialize();

    if (usefancy) {
        jQuery.fancybox.showActivity();
    }

    jQuery.ajax({
        type: "POST",
        cache: false,
        dataType: "json",
        url: window.vmSiteurl + "index.php?option=com_virtuemart&nosef=1&view=cart&task=addJS&format=json" + window.vmLang + window.Itemid,
        data: dat
    }).done(
            function (datas, textStatus) {

                if (datas.stat == 1) {
                    var txt = datas.msg;
                } else if (datas.stat == 2) {
                    var txt = datas.msg + "<H4>" + form.find(".pname").val() + "</H4>";
                } else {
                    var txt = "<H4>" + vmCartError + "</H4>" + datas.msg;
                }
                if (usefancy) {
                    jQuery.fancybox({
                        "titlePosition": "inside",
                        "transitionIn": "fade",
                        "transitionOut": "fade",
                        "changeFade": "fast",
                        "type": "html",
                        "autoCenter": true,
                        "closeBtn": false,
                        "closeClick": false,
                        "content": txt
                    }
                    );
                } else {
                    jQuery.facebox(txt, 'my-groovy-style');
                }


                Virtuemart.productUpdate();
            });

}