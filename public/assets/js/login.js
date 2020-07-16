$(document).on('click','.login', async function(){
    const email = $('#email').val();
    const password = $('#password').val();
    loadingButton($(this).val());
    const data = {
        "email" : email,
        "password" : password
    }
    var loginResponse = await axiosPost($(this).val()+'/partner',data);
    if(loginResponse.responseCode == '200'){
        storageSet('loginData',JSON.stringify(loginResponse.data));
        storageSet('token',loginResponse.data.accessToken);
        axiosRedirect('/index');
    } else{
        removeLoadingButton($(this).val());
        swalNotif('error','Login Failed');
    }
});