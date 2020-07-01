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
    $('.memberLogData').empty();
    $('.memberLogData').html('');
    var row = '';
    row = '<div class="row">';
    data.forEach(element => {
        // var momentObj = moment(moment(element.startDate).format(moment.HTML5_FMT.DATE) + element.startTime, 'YYYY-MM-DDLT');
        // var dateTime = momentObj.format('YYYY-MM-DDTHH:mm:ss');
        // var timeDifference = moment(dateTime).fromNow();
        var timeDifference = moment(element.dateRecord).fromNow();
        var rowData = '';
        rowData += '<div class="col-4">'+
            '<div class="tile">'+
            '<div class="tile__icon"><figure class="avatar">'+
            '<img src="https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art-thumbnail.png">'+
            '</figure></div>'+
            '<div class="tile__container">'+
            '<p class="tile__title u-no-margin">'+element.memberName+'</p>'+
            '<p class="tile__subtitle u-no-margin">Class : '+element.className+'</p>'+
            '<p class="tile__subtitle u-no-margin">Coach : '+element.coachName+'</p>'+
            '<span class="info">'+timeDifference+'</span>'+
            '</div>'+
            '</div>'+
            '</div>';
        row += rowData;
    });
    row += '</div>';
    $('.memberLogData').append(row);
}