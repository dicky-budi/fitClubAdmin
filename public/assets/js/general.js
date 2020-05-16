const loadingTag = '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'

function appendLoading(classname){
    $(loadingTag).prependTo($('.'+classname));
    $('.'+classname).css('opacity','0.3');
}

function failedLoading(classname){
    $('.'+classname).children().not('tbody').css('opacity','0.2');
}

function removeLoading(classname){
    $('.sk-folding-cube').remove();
    $('.'+classname).css('opacity','1');
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

function addSectionPadding(padding = ''){
    $('.contentPlace').children().each(function () {
        if(padding == '')
            $(this).css('padding','20px');
        else
            $(this).css('padding',padding);
    });
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