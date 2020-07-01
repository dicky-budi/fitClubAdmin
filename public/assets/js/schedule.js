$(document).on('click','.createSchedule', async function(){
    $(modal).insertAfter('.section');
    appendLoading('contentPlace');
    var getClass = await axiosGet('/class','',{
        'token': localStorage.getItem('token'),
    });
    var getCoach = await axiosGet('/coachlist','',{
        'token': localStorage.getItem('token'),
        'placeid': JSON.parse(localStorage.getItem('loginData')).partnerId
    });
    var getPlace = await axiosGet('/place','',{
        'token': localStorage.getItem('token'),
    });
    removeLoading('contentPlace');
    var scheduleForm = await axiosGetFile('/scheduleForm');
    $('.modal-title').html('Create Coach Schedule');
    $('.modal-body').append(scheduleForm);
    getClass.data.forEach(appendClass);
    getCoach.data.forEach(appendCoach);
    getPlace.data.forEach(appendPlace);
    applyTimePicker('startTime');
    applyTimePicker('endTime');
});

$(document).on('click','.switchScheduleTag', async function(){
    $(modal).insertAfter('.section');
    var getCoachSchedule = await axiosGet('/coach/class/schedule','',{
        'token': localStorage.getItem('token'),
    });
    var switchSchedule = await axiosGetFile('/switchSchedule');
    $('.modal-title').html('Switch Coach Schedule');
    $('.modal-body').append(switchSchedule);
    $('.scheduleDataFrom').select2();
    $('.scheduleDataTo').select2();
    getCoachSchedule.data.forEach(appendCoachSwitchSchedule);
});

$(document).on('click','.formOverlay, .closeHeader,.formOverlaySwitch, .closeHeaderSwitch', async function(){
    $('.modalSection').remove();
    $('.modalSwitchSection').remove();
});

$(document).on('click','.submitSchedule', async function(){
    var coachId = parseInt($('.coachNameSchedule').val());
    var className = parseInt($('.classNameSchedule').val());
    var startDate = $('.dateSchedule').val();
    var endDate = $('.endDateSchedule').val();
    var splitStart = $('.startTime').val().split(' ');
    var splitAngkaStart = '';
    if(splitStart[1] == 'PM'){
        var splitAgain = splitStart[0].split(':');
        splitAngkaStart = (parseInt(splitAgain[0]) + 12).toString() + ":" + splitAgain[1];
    } else {
        splitAngkaStart = splitStart[0];
    }
    var splitEnd = $('.endTime').val().split(' ');
    var splitAngkaEnd = '';
    if(splitEnd[1] == 'PM'){
        var splitAgain = splitEnd[0].split(':');
        splitAngkaEnd = (parseInt(splitAgain[0]) + 12).toString() + ":" + splitAgain[1];
    } else {
        splitAngkaEnd = splitEnd[0];
    }
    var placeId = parseInt($('select#coachNameSchedule').val());
    // var placeId = JSON.parse(localStorage.getItem('loginData')).partnerId;
    var sendData = {
        "coachId": coachId,
        "classId": className,
        "startDate": startDate,
        "endDate": endDate,
        "startTime": splitAngkaStart,
        "endTime": splitAngkaEnd,
        "placeId":placeId
    };
    loadingButtonWithDisabledForm('submitSchedule','LOADING...','.formSchedule');
    var addSchedule = await axiosPost('submitSchedule',sendData,{
        'token': localStorage.getItem('token'),
    });
    if(addSchedule.responseCode == '200'){
        removeButtonWithDisabledForm('submitSchedule','Submit Schedule','.formSchedule')
        $('.closeHeader').click();
        swalNotif('success','Success create schedule');

        var returnedHTML = await axiosGetFile('/schedule');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processScheduleData('scheduleTable');
    } else{
        removeButtonWithDisabledForm('submitSchedule','Submit Schedule','.formSchedule')
        swalNotif('error','Create Schedule Failed');
    }
});

$(document).on('click','.submitSwitchSchedule', async function(){
    var selfScheduleId = parseInt($('select#scheduleDataFrom').val());
    var selfCoachId = parseInt($('select#scheduleDataFrom').find(':selected').data('coachid'));
    var destScheduleId = parseInt($('select#scheduleDataTo').val());
    var destCoachId = parseInt($('select#scheduleDataTo').find(':selected').data('coachid'));

    var sendDataSwitch = { 
        "idSelfSchedule": selfScheduleId,
        "selfId":selfCoachId,
        "targetSchedule": destScheduleId,
        "targetCoach": destCoachId
    };

    console.log('sendd',sendDataSwitch);
    loadingButtonWithDisabledForm('submitSwitchSchedule','LOADING...','.switchSchedule');
    var addSchedule = await axiosPut('switchSchedule',sendDataSwitch,{
        'token': localStorage.getItem('token'),
    });
    if(addSchedule.responseCode == '200'){
        removeButtonWithDisabledForm('submitSwitchSchedule','Switch Schedule','.switchSchedule')
        $('.closeHeader').click();
        swalNotif('success','Success switch schedule');

        var returnedHTML = await axiosGetFile('/schedule');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processScheduleData('scheduleTable');
    } else{
        removeButtonWithDisabledForm('submitSwitchSchedule','Switch Schedule','.switchSchedule')
        swalNotif('error','Switch Schedule Failed');
    }
});


async function processScheduleData(classname){
    appendLoading(classname);
    var placeId = JSON.parse(localStorage.getItem('loginData')).partnerId;
    var scheduleData = await axiosGet('class/schedule','',{
        'token': localStorage.getItem('token'),
        'place':placeId

    }); 
    // jgn lupa diganti nanti if operatornya
    if(scheduleData.responseCode == '200'){
        removeLoading(classname);
        appendScheduleTable(scheduleData.data);
        applyDataTable(classname);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
}

function appendScheduleTable(data){
    var row = '';
    data.forEach(element => {
        rowData = '<tr>' +
            '<td>'+element.scheduleId+'</td>'+
            '<td>'+element.className+'</td>'+
            '<td>'+element.coachName+'</td>';
            if(moment(element.startDate).format('DD MMMM YYYY') == moment(element.endDate).format('DD MMMM YYYY')){
                rowData += '<td>'+moment(element.startDate).format('DD MMMM YYYY')+' </td>';
            }else {
                rowData += '<td>'+moment(element.startDate).format('DD MMMM YYYY')+' - '+moment(element.endDate).format('DD MMMM YYYY')+' </td>';
            }
            rowData += '<td>'+element.startTime+' - '+element.endTime+' </td>'+
        '</tr>';
        row += rowData;
    });
    $('#scheduleBody').append(row);
}

$(document).on('change','#scheduleDataFrom', function() {
    var date = $(this).find(":selected").data('date');
    var classData = $(this).find(":selected").data('class');
    var coachName = $(this).find(":selected").data('coach');
    $('.dateSwitch').val(date);
    $('.className').val(classData);
    $('.coachName').val(coachName);
});

$(document).on('change','#scheduleDataTo', function() {
    var date = $(this).find(":selected").data('date');
    var classData = $(this).find(":selected").data('class');
    var coachName = $(this).find(":selected").data('coach');
    $('.dateScheduleTo').val(date);
    $('.classScheduleTo').val(classData);
    $('.coachNameTo').val(coachName);
});

function appendClass(data,index){
    var tag = '<option value='+data.id+'>'+data.name+'</option>';
    $('.classNameSchedule').append(tag);
}

function appendCoach(data,index){
    var tag = '<option value='+data.id+'>'+data.name+'</option>';
    $('.coachNameSchedule').append(tag);
}

function appendPlace(data,index){
    var tag = '<option value='+data.id+'>'+data.name+'</option>';
    $('.placeNameSchedule').append(tag);
}

function appendCoachSwitchSchedule(data,index){
    var tag = '<option value='+data.scheduleId+' data-coachId='+data.coach_id+' data-class="'+data.class_name+'" data-coach="'+data.coach_name+'" data-date="'+moment(data.class_start_date).format('DD MMMM YYYY')+'">'+moment(data.class_start_date).format('DD MMMM YYYY')+ ' - '+data.class_name+' - '+data.coach_name+' </option>';
    $('.scheduleDataFrom').append(tag);
    $('.scheduleDataTo').append(tag);
}