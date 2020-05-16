
$(document).on('click','.login', async function(){
    const email = $('#email').val();
    const password = $('#password').val();
    loadingButton('login');
    var data = {
        "email" : email,
        "password" : password
    }
    var loginResponse = await axiosPost('login',data);
    if(loginResponse.responseCode == '200'){
        storageSet('loginData',JSON.stringify(loginResponse.data));
        storageSet('token',loginResponse.data.accessToken);
        axiosRedirect('/index');
    } else{
        removeLoadingButton('login');
        Swal.fire({
            title: 'Error!',
            text: 'Login Failed',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
});