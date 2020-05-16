async function processClassData(){
    appendLoading('classTable');
    var classData = await axiosGet('class','',{
        'token': localStorage.getItem('token'),
    });
    if(classData.responseCode == '200'){
        removeLoading('classTable');
        appendClassTable(classData.data);
    } else {
        removeLoading('classTable');
    }
}

function appendClassTable(data){
    var row = '';
    data.forEach(element => {
        rowData = '<tr>' +
            '<td>'+element.id+'</td>'+
            '<td>'+element.name+'</td>'+
            '<td>'+element.descript+'</td>'+
        '</tr>';
        row += rowData;
    });
    $('#classBody').append(row);
}