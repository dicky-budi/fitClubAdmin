$(document).on('click','.createSchedule', async function(){
    $('.modal-title').html('Create Coach Schedule');
    var scheduleForm = await axiosGetFile('/scheduleForm');
    if($('.formSchedule').length == 0){
        $('.modal-body').append(scheduleForm);
        applyTimePicker('startTime');
        applyTimePicker('endTime');
    }
});

$(document).on('click','.submitSchedule', async function(){
    loadingButtonWithDisabledForm('submitSchedule','LOADING...','.formSchedule');
    setTimeout(() => {
        removeButtonWithDisabledForm('submitSchedule','Submit Schedule','.formSchedule')
    }, 3000);
});

async function processScheduleData(classname){
    appendLoading(classname);
    var scheduleData = await axiosGet('class/schedule','',{
        'token': localStorage.getItem('token'),
    });
    // jgn lupa diganti nanti if operatornya
    if(scheduleData.responseCode != '200'){
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
            '<td>'+element.coachName+'</td>'+
            '<td>'+element.startTime+' - '+element.endTime+' </td>'+
            '<td><i class="material-icons">check</i></td>'+
        '</tr>';
        row += rowData;
    });
    $('#scheduleBody').append(row);
}