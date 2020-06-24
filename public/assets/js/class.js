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
    var sendData = {
        "className": name,
        "description": description
    };
    var addClass = await axiosPost('submitClass',sendData,{
        'token': localStorage.getItem('token'),
    });
    if(addClass.responseCode == '200'){
        removeButtonWithDisabledForm('submitClass','Add New Class','.formClass');
        $('.closeHeader').click();
        swalNotif('success','Success create class');

        returnedHTML = await axiosGetFile('/classPage');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processClassData('classTable');
    } else {
        removeButtonWithDisabledForm('submitClass','Add New Class','.formClass');
        swalNotif('error','Create Class Failed');
    }
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
            // '<td>'+element.id+'</td>'+
            '<td>'+element.name+'</td>'+
            '<td>'+element.descript+'</td>'+
            '<td><a href="#modals"><button class="btn-primary btn-animated deleteClass" data-id='+element.id+' data-name="'+element.name+'">Delete</button></a></td>'
        '</tr>';
        row += rowData;
    });
    $('#classBody').append(row);
}

$(document).on('click','.deleteClass',function(){
    let idClass = $(this).data('id');
    callNotifDelete($(this).data('name'),async function(){
        // console.log("woe");
        await deleteClass(idClass);
    });
})

async function deleteClass(id){
    var deleteData = {
        "classId": id,
    };
    console.log('del',deleteData);
    var deleteClass = await axiosPost('deleteClass',deleteData,{
        'token': localStorage.getItem('token'),
    });
    if(deleteClass.responseCode == '200'){
        swalNotif('success','Success delete class');
        returnedHTML = await axiosGetFile('/classPage');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processClassData('classTable');
    } else {
        swalNotif('error','Delete Class Failed');
    }
}