
var returnedHTML = '';

$(function(){
    if(localStorage.getItem('token') == undefined || localStorage.getItem('token') == null)
        window.location.href = 'login';
})

$(document).on('click','a', async function(){
    switch($(this).data('target')){
        case "login":
            storageClearAll();
            returnedHTML = axiosRedirect('/login');
            break;
        case "dashboard":
            returnedHTML = await axiosGetFile('/dashboard');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            break;
        case "schedule":
            returnedHTML = await axiosGetFile('/schedule');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            addSectionPadding();
            await processScheduleData();
            break;
        case "classPage":
            returnedHTML = await axiosGetFile('/classPage');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            addSectionPadding();
            await processClassData();
            break;
        case "employee":
            returnedHTML = await axiosGetFile('/employee');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            addSectionPadding('10px');
            await processCoachListData();
            break;
        case "attendance":
            returnedHTML = await axiosGetFile('/attendance');
            clearAndReplaceContent(returnedHTML,$(this).data('target'));
            break;
    }
});