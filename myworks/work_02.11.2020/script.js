//alert(Date());



function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

function dateNowMax(gde)
{
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();

    var data = year+"-"+month+"-"+day;
    //alert(data);    
    gde.max = data;
}

function dateNowMin(gde)
{
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();

    var data = year+"-"+month+"-"+day;
    //alert(data);    
    gde.min = data;
}

//alert(day);
//alert(month);
//alert(year);
//alert(dateNow());