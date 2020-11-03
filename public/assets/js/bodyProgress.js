$(document).on('click','.addBodyProgress', async function(){
    $(modal).insertAfter('.section');
    var addModal = await axiosGetFile('/addBodyProgress');
    $('.modal-title').html('Add Body progress');
    $('.modal-body').append(addModal);
});

$(document).on('click','.submitBodyProgress', async function(){
    loadingButtonWithDisabledForm('submitBodyProgress','LOADING...','.formBodyProgress');
    var name = $('.bodyProgressNameNew').val();
    var sendData = {
        "categoryName": name,
    };
    var addClass = await axiosPost('submitBodyProgress',sendData,{
        'token': localStorage.getItem('token'),
    });
    if(addClass.responseCode == '200'){
        removeButtonWithDisabledForm('submitBodyProgress','Add New Category','.formBodyProgress');
        $('.closeHeader').click();
        swalNotif('success','Success create body progress category');

        returnedHTML = await axiosGetFile('/bodyProgress');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processBodyProgressData('bodyProgressTable');
    } else {
        removeButtonWithDisabledForm('submitBodyProgress','Add New Category','.formBodyProgress');
        swalNotif('error','Create Body Progress Category Failed');
    }
});

async function processBodyProgressData(classname){
    appendLoading(classname);
    var bodyProgress = await axiosGet('bodyProgressData','',{
        'token': localStorage.getItem('token'),
    });
    if(bodyProgress.responseCode == '200'){
        removeLoading(classname);
        appendBodyProgressTable(bodyProgress.data);
        applyDataTable(classname);
    } else {
        removeLoadingWithError(classname);
        failedLoading(classname);
    }
}

function appendBodyProgressTable(data){
    var row = '';
    $('#bodyProgressBody').empty();
    data.forEach(element => {
        console.log('a',element);
        rowData = '<tr>' +
            '<td>'+element.categoryName+'</td>'+
            '<td><a href="#modals"><button class="btn-primary btn-animated deleteBodyProgress" data-id='+element.id+' data-name="'+element.categoryName+'">Delete</button></a></td>'
        '</tr>';
        row += rowData;
    });
    $('#bodyProgressBody').append(row);
}

$(document).on('click','.deleteBodyProgress',function(){
    let idBodyProgress = $(this).data('id');
    callNotifDeleteCustomText(async function(){
        await deleteBodyProgress(idBodyProgress);
    },'Are you sure to delete ' + $(this).data('name') + ' category?');
})

async function deleteBodyProgress(id){
    var deleteData = {
        "idCategory": id,
    };
    console.log('del',deleteData);
    var deleteClass = await axiosDelete('deleteBodyProgress',deleteData,{
        'token': localStorage.getItem('token'),
    });
    if(deleteClass.responseCode == '200'){
        swalNotif('success','Success delete category');
        returnedHTML = await axiosGetFile('/bodyProgress');
        clearAndReplaceContent(returnedHTML,$(this).data('target'));
        addSpace();
        await processBodyProgressData('bodyProgressTable');
    } else {
        swalNotif('error','Delete Category Failed');
    }
}