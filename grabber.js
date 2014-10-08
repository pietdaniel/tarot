$(document).ready(function() {
    $('#image_upload_form').submit(function() {
        $('div#ajax_upload_demo img').attr('src', 'img/loading.gif')
    });
    $('iframe[name=upload_to]').load(function() {
        var result = $(this).contents().text();
        if (result != '') {
            if (result == 'Err:big') {
                $('div#ajax_upload_demo img').attr('src', 'img/s.png');
                $("#ajax_upload_demo").append("<b>Error:</b> The image file is too large!<br />It must be 300kb or less.<br /><br />");
                return
            }
            if (result == 'Err:format') {
                $('div#ajax_upload_demo img').attr('src', 'img/s.png');
                $("#ajax_upload_demo").append("<b>Error:</b> Invalid format.<br />Only standard image files are acceptable.<br /><br />");
                return
            }
            if (result != 'Err:big' && result != 'Err:format') {
                var oresolution = $("#resolution").val();
                var ocolor = $("#color").val();
                var strout = "<table cellpadding='0' cellspacing='10' border='0'><tr><td><b>Original:</b></td><td><b>ASCII:</b></td></tr><tr><td><img src='uploads/" + $(this).contents().text() + "' /></td><td id='theasc'><img src='uploads/" + $(this).contents().text() + "' asciify='true' asciiresolution='" + oresolution + "' ";
                if ($('#color').is(":checked")) {
                    var strout = strout + "asciicolor='true' "
                }
                var strout = strout + "/></td></tr></table><br /><b><a href='index.php'>Restart</a></b>";
                $("#ajax_upload_demo").html(strout);
                jsAscii()
            }
        }
    })
});