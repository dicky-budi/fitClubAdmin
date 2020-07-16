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
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
}

async function appendMemberLog(data){
    $('.memberLogData').empty();
    $('.memberLogData').html('');
    var row = '';
    row = '<div class="row">';
    data.forEach(element => {
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

async function processMemberApproval(classname){
    appendLoading(classname);
    var approvalLog = await axiosGet('/partner/member/membershipRequest','',{
        'token': localStorage.getItem('token')
    });
    if(approvalLog.responseCode == '200'){
        removeLoading(classname);
        appendMemberApproval(approvalLog.data);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
}

async function appendMemberApproval(data){
    $('.memberApprovalData').empty();
    $('.memberApprovalData').html('');
    var row = '';
    row = '<div class="row">';
    data.forEach(element => {
        var timeDifference = moment(element.joinDate).fromNow();
        var rowData = '';
        rowData += '<div class="col-4">'+
            '<div class="tile">'+
            '<div class="tile__icon"><figure class="avatar">'+
            '<img src="https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art-thumbnail.png">'+
            '</figure></div>'+
            '<div class="tile__container">'+
            '<p class="tile__title u-no-margin">'+element.memberName+'</p>'+
            '<p class="tile__subtitle u-no-margin">Apply level : '+element.memberCategory+'</p>'+
            '<span class="info">'+timeDifference+'</span>'+
            '<div class="row"><div class="col-6"><button class="btn-success btn-small responseApproval" data-type="accept" data-load="memberApprovalData" data-place='+element.placeId+' data-id='+element.userId+' data-code='+element.code+' >Accept</button></div>'+
            '<div class="col-6"><button class="btn-danger btn-small responseApproval" data-type="reject" data-load="memberApprovalData" data-place='+element.placeId+' data-id='+element.userId+' data-code='+element.code+'>Reject</button></div></div>'+
            '</div>'+
            '</div>'+
            '</div>';
        row += rowData;
    });
    row += '</div>';
    $('.memberApprovalData').append(row);
}

$(document).on('click','.responseApproval',async function(){
    console.log($(this).data('type'));
    let userId = $(this).data('id');
    let code = $(this).data('code');
    let placeId = $(this).data('place');
    appendLoading($(this).data('load'));
    let bodyData = {
        "userId": parseInt(userId),
        "memberCode": parseInt(code),
        "placeId": parseInt(placeId),
        "status": $(this).data('type') == 'accept' ? 1 : 0
    }
    var approveResponseLog = await axiosPost('/partner/member/memberActivation',bodyData,{
        'token': localStorage.getItem('token')
    });
    if(approveResponseLog.responseCode == '200'){
        removeLoading($(this).data('load'));
        $('.memberApprovalData').empty();
        $('.memberApprovalData').html('');
        await processMemberApproval('memberApprovalData');
    } else {
        removeLoadingWithError($(this).data('load'));
        failedLoading($(this).data('load'));
    }
})