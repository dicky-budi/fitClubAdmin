async function processCoachListData(){
    appendLoading('coachListTable');
    var classData = await axiosGet('coachlist','',{
        'token': localStorage.getItem('token'),
    });
    if(classData.responseCode == '200'){
        removeLoading('coachListTable');
        appendCoachListTable(classData.data);
    } else {
        removeLoadingWithError('coachListTable');
        failedLoading('coachListTable');
    }
}

function appendCoachListTable(data){
    var row = '';
    data.forEach(element => {
        if(element.gender == 1)
            element.gender = 'Male';
        else
            element.gender = 'Female';
        rowData = '<tr>' +
            '<td>'+element.id+'</td>'+
            '<td>'+element.name+'</td>'+
            '<td>'+element.address+'</td>'+
            '<td>'+element.gender+'</td>'+
            '<td>'+element.placeName+'</td>'+
        '</tr>';
        row += rowData;
    });
    $('#coachListBody').append(row);
}