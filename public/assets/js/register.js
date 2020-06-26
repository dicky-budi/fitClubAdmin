$(document).on('click','.regis', async function(){
    $(modal).insertAfter('.section');
    var addModal = await axiosGetFile('/register');
    $('.modal-title').html('Register Partner');
    $('.modal-body').append(addModal);
});

$(document).on('click','.regisPartner', async function(){
    let emailRegis = $('.emailRegis').val();
    let phoneRegis = $('.phoneNumberRegis').val();
    let sendRegister = {
        'filter':'partner',
        'name':$('.partnerRegis').val(),
        'address':$('#addressRegis').val(),
        'phone':$('.phoneNumberRegis').val(),
        'gender':parseInt($('select#genderRegis').val()),
        'email':$('.emailRegis').val(),
        'password':$('.passwordRegis').val()
    };
    var regisPartner = await axiosPost('registerPartner',sendRegister);
    if(regisPartner.responseCode == '200'){
        $('.closeHeader').click();
        $('.formRegister').remove()
        swalNotif('success','Success register');

        $(modal).insertAfter('.section');
        var addModal = await axiosGetFile('/otp');
        $('.modal-title').html('Confirm OTP');
        $('.modal-body').append(addModal);
        $('#emailRegisPartner').val(emailRegis);
        $('#phoneRegisPartner').val(phoneRegis);

    }else {
        swalNotif('error','Fail partner registration');
    }
});

$(document).on('click','.otpRegis', async function(){
    let sendOTP = {
        'email':$('#emailRegisPartner').val(),
        'phone':$('#phoneRegisPartner').val(),
        'otpCode':$('.otpCodeRegis').val(),
    };

    var regisPartner = await axiosPut('registerOTP',sendOTP);
    if(regisPartner.responseCode == '200'){
        swalNotif('success','OTP has been confirmed');
        axiosRedirect('');
    }else {
        swalNotif('error','Failed confirm OTP');
    }
});