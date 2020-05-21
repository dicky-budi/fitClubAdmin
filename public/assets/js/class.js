async function processClassData(classname){
    appendLoading(classname);
    var classData = await axiosGet('class','',{
        'token': localStorage.getItem('token'),
    });
    if(classData.responseCode == '200'){
        removeLoading(classname);
        appendClassTable(classData.data);
        applyDataTable(classname);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
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