async function processMemberLog(classname){
    appendLoading(classname);
    var memberLog = await axiosGet('/class/memberClass/history','',{
        'token': localStorage.getItem('token'),
    });
    if(memberLog.responseCode == '200'){
        removeLoading(classname);
        console.log('data',memberLog)
        // appendCoachListTable(classData.data);
        // applyDataTable(classname);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
    // setTimeout(() => {
    //     removeLoading(classname);
    // }, 3000);
}

async function processEmployeeLog(classname){
    // appendLoading(classname);
    // var classData = await axiosGet('coachlist','',{
    //     'token': localStorage.getItem('token'),
    // });
    // if(classData.responseCode == '200'){
    //     removeLoading(classname);
    //     appendCoachListTable(classData.data);
    //     applyDataTable(classname);
    // } else {
    //     removeLoadingWithError(classname);
    //     failedLoading(classname);
    // }
    // setTimeout(() => {
    //     removeLoading(classname);
    // }, 3000);
}