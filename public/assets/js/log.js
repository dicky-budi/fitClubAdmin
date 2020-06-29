async function processMemberLog(classname){
    appendLoading(classname);
    var placeId = JSON.parse(localStorage.getItem('loginData')).partnerId;
    var memberLog = await axiosGet('/class/memberClass/history','',{
        'token': localStorage.getItem('token'),
        'place': placeId
    });
    if(memberLog.responseCode == '200'){
        removeLoading(classname);
        appendMemberLog(memberLog.data);
        // applyDataTable(classname);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
    // setTimeout(() => {
    //     removeLoading(classname);
    // }, 3000);
}

async function appendMemberLog(data){
    var row = '';
    var rowData = '';
    
    data.forEach(element => {
        row = '<div class="row">';
        rowData += '<div class="col-6">'+
            '<div class="tile">'+
            '<div class="tile__icon"><figure class="avatar">'+
            '<img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">'+
            '</figure></div>'+
            '<div class="tile__container">'+
            '<p class="tile__title u-no-margin">'+element.memberId+'</p>'+
            '<p class="tile__subtitle u-no-margin">'+element.className+'</p>'+
            '<span class="info">23 minutes ago</span>'
            '</div>'+
            '</div>'+
            '</div>';
        row += rowData;
        row += '</div>';
    });
    
    $('.memberLogData').append(row);
}