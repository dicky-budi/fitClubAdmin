async function processScheduleData(){
    appendLoading('scheduleTable');
    var scheduleData = await axiosGet('class/schedule','',{
        'token': localStorage.getItem('token'),
    });
    if(scheduleData.responseCode == '200'){
        removeLoading('scheduleTable');
        appendScheduleTable(scheduleData.data);
    } else {
        removeLoading('scheduleTable');
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