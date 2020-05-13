

var returnedHTML = '';
$(document).on('click','a', async function(){
    switch($(this).data('target')){
        case "dashboard":
            returnedHTML = await axiosGetFile('/dashboard');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            break;
        case "schedule":
            returnedHTML = await axiosGetFile('/schedule');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            addSectionPadding();
            break;
        case "employee":
            returnedHTML = await axiosGetFile('/employee');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            break;
        case "attendance":
            returnedHTML = await axiosGetFile('/attendance');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            break;
    }
});

function clearAndReplaceContent(tag,target){
    $('li').removeClass('selected');
    $('.'+target).addClass('selected');
    $('.contentPlace').empty();
    $('.contentPlace').html('');
    $('.contentPlace').html(tag);
}

function addSectionPadding(){
    $('.contentPlace').children().each(function () {
        $(this).css('padding','20px');
    });
}