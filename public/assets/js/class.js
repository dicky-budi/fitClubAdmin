$(document).on('click','.addClass', async function(){
    $(modal).insertAfter('.section');
    var addModal = await axiosGetFile('/addClass');
    $('.modal-title').html('Add Class');
    $('.modal-body').append(addModal);
});

$(document).on('click','.submitClass', async function(){
    loadingButtonWithDisabledForm('submitClass','LOADING...','.formClass');
    var name = $('.classNameNew').val();
    var description = $('.descriptionText').val();
    
    setTimeout(() => {
        removeButtonWithDisabledForm('submitClass','Add New Class','.formClass')
    }, 3000);
});

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