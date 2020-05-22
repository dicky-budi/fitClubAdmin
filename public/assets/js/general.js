const loadingTag = '<div class="sk-folding-cube" style="z-index:99"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'
const modal = '<section class="modalSection">'+
'<div class="modal modal-large modal-animated--zoom-in" id="modals">'+
    '<a href="#" class="modal-overlay close-btn formOverlay" aria-label="Close"></a>'+
    '<div class="modal-content" role="document">'+
        '<div class="modal-header">'+
            '<a href="#" class="u-pull-right closeHeader" aria-label="Close"><span class="icon"><i class="fa fa-wrapper fa-times"></i></span></a>'+
            '<div class="modal-title"></div>'+
        '</div>'+
        '<div class="modal-body">'+
        '</div>'+
    '</div>'+
'</div>'+
'</section>';


function applyTimePicker(idname){
    $('#'+idname).timepicker({ 'scrollDefault': 'now','timeFormat': 'h:i A',
        'disableTimeRanges': [
            ['9:00 PM', '11:59 PM'],
            ['1:00 AM', '7:00 AM']
        ] 
    });
}

function clearModal(){
    $('.modal-title').html('');
    $('.modal-body').empty();
    $('.modal-body').html('');
}

function clearModalSwitch(){
    $('.modal-title-switch').html('');
    $('.modal-body-switch').empty();
    $('.modal-body-switch').html('');
}

function applyDataTable(classname){
    $('.'+classname).DataTable({
        "responsive": true,
        "searching": false,
        "info" : false,
        "paging": false,
        "autoWidth": false,
    });
    $('.'+classname).parent().css('min-width','100%');
    $('.dataTable thead').addClass('bg-warning-light');
    $('.dataTable tfoot').addClass('bg-warning-light');
}

function appendLoading(classname){
    $(loadingTag).prependTo($('.'+classname));
    $('.'+classname).css('opacity','0.3');
    $('.'+classname).css('pointer-events','none');
}

function failedLoading(classname){
    $('.'+classname).children().not('tbody').css('opacity','0.2');
}

function removeLoading(classname){
    $('.sk-folding-cube').remove();
    $('.'+classname).css('opacity','1');
    $('.'+classname).css('pointer-events','auto');
}

function removeLoadingWithError(classname){
    $('.sk-folding-cube').remove();
    $('.'+classname).css('opacity','1');
    var splitted = splitCamelToArray(classname);
    if($('.toast'+classname).length == 0)
        toast('error',splitted,classname);
    if($('.refreshButton').length == 0)
        addRefreshButton(classname);
}

function addRefreshButton(classname){
    var colspanCount = $('.'+classname).find('thead:first-child tr')[0].childElementCount;
    var tbody = $('.'+classname).find('tbody').attr('id');
    $('<tr class="refreshButton" data-refresh="'+classname+'"><td colspan='+colspanCount+'><a href="#"><button class="btn-large" style="width:25%; margin:0 auto;"><i class="fa-wrapper fa fa-sync pad-right"></i>REFRESH</button></a></td></tr>').appendTo('#'+tbody);
}

function toast(type,text,classname){
    $('<div class="toast toast--'+type+' toast'+classname+'"><p>Failed loading '+text+'</p></div>').insertBefore('.'+classname);
    $('<div class="toast toast--'+type+' toast'+classname+'"><p>Failed loading '+text+'</p></div>').insertAfter('.'+classname);
    setTimeout(() => {
        $('.toast'+classname).slideUp('slow', function () {
            $('.toast'+classname).remove();
        });
    }, 1500);
}

function splitCamelToArray(word) {
    var result = word.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0) + result.slice(1);
    var finalSplit = finalResult.split(' ');
    return finalSplit[0] + ' data';
}

function clearAndReplaceContent(tag,target){
    $('li').removeClass('selected');
    $('.'+target).addClass('selected');
    $('.contentPlace').empty();
    $('.contentPlace').html('');
    $('.contentPlace').html(tag);
}

function clearAndReplaceContentData(tag){
    $('.contentPlace').empty();
    $('.contentPlace').html('');
    $('.contentPlace').html(tag);
}

function addSpace(){
    $('.contentPlace').children().each(function () {
        if($(this).find('table').length == 0)
            $(this).prepend('<space class="large"></space>')
    });
}

function loadingButtonWithDisabledForm(classname,text='',formId){
    if(text == '')
        $('.'+classname).text('loading');
    else
        $('.'+classname).text(text);
    $('.'+classname).addClass('animated loading u-center loading-left');
    $('.'+classname).css('margin-bottom','1rem');
    $(formId).find('input , select, textarea').each(function(e){
        $(this).attr('disabled',true);
    })
    $('.formOverlay').removeAttr('href');
    $('.closeHeader').remove();
}

function removeButtonWithDisabledForm(classname,text='',formId){
    $('.'+classname).text(text);
    $('.'+classname).removeClass('animated loading u-center loading-left');
    $(formId).find('input , select, textarea').each(function(e){
        $(this).attr('disabled',false);
    })
    $('.formOverlay').attr('href','#target');
    $('.modal-header').prepend('<a href="#components" class="u-pull-right closeHeader" aria-label="Close"><span class="icon"><i class="fa fa-wrapper fa-times"></i></span></a>');
}

function loadingButton(classname,text = ''){
    if(text == '')
        $('.'+classname).text('loading');
    else
        $('.'+classname).text(text);
    $('.'+classname).addClass('animated loading u-center loading-left');
    $('.'+classname).css('margin-bottom','1rem');
}

function removeLoadingButton(classname){
    $('.'+classname).text(classname);
    $('.'+classname).removeClass('animated loading u-center loading-left');
    $('.'+classname).css('margin-bottom','1rem');
}

function swalNotif(type,text){
    Swal.fire({
        title: text,
        icon: type,
        confirmButtonText: 'OK'
    })
}

function storageSet(key,value){
    localStorage.setItem(key,value);
}

function storageGet(key){
    localStorage.getItem(key);
}

function storageClearAll(){
    localStorage.clear();
}

$(document).on('click','.refreshButton', async function(){
    switch($(this).data('refresh')){
        case 'scheduleTable':
            await processScheduleData();
            break;
        default:
            break;
    }
});