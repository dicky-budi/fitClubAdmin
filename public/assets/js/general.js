const loadingTag = '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'

function appendLoading(classname){
    $(loadingTag).prependTo($('.'+classname));
    $('.'+classname).css('opacity','0.3');
}

function removeLoading(classname){
    $('.sk-folding-cube').remove();
    $('.'+classname).css('opacity','1');
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
    $('.'+classname).removeClass('animated loading u-center loading-left');
    $('.'+classname).css('margin-bottom','1rem');
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