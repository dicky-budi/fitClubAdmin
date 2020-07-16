
var returnedHTML = '';

$(function(){
    if(localStorage.getItem('token') == undefined || localStorage.getItem('token') == null)
        window.location.href = 'login';
})

$(document).on('click','a', async function(){
    if($(this).data('target') == undefined){
        switch($(this).data('section')){
            case "coachlist":
                $('.coachListTable').DataTable().destroy();
                $('#coachListBody').empty();
                await processCoachListData('coachListTable');
                break;
            case "memberlog":
                await processMemberLog('memberLogData')
                break;
            case "employeelog":
                await processEmployeeLog('employeeLogData')
                break;
            case "memberApproval":
                await processMemberApproval('memberApprovalData');
                break;
            default:
                break;
        }
    } else {
        switch($(this).data('target')){
            case "logout":
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
                addSpace();
                await processScheduleData('scheduleTable');
                break;
            case "classPage":
                returnedHTML = await axiosGetFile('/classPage');
                clearAndReplaceContent(returnedHTML,$(this).data('target'));
                addSpace();
                await processClassData('classTable');
                break;
            case "employee":
                returnedHTML = await axiosGetFile('/employee');
                clearAndReplaceContent(returnedHTML,$(this).data('target'));
                addSpace();
                await processCoachListData('coachListTable');
                break;
            case "log":
                returnedHTML = await axiosGetFile('/log');
                clearAndReplaceContent(returnedHTML,$(this).data('target'));
                addSpace();
                await processMemberLog('memberLogData');
                await processMemberApproval('memberApprovalData');
                break;
        }
    }
});