async function axiosPost(url,data,option = '') {
    return new Promise(async function (resolve, reject) {
        axios({
            method: 'post',
            url: url,
            data: data,
            headers: option
        }).then((response) => {
            if(response.responseCode == '401')
                window.location.href= 'login';
            else 
                resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
}

async function axiosPut(url,data,option = '') {
    return new Promise(async function (resolve, reject) {
        axios({
            method: 'put',
            url: url,
            data: data,
            headers: option
        }).then((response) => {
            if(response.responseCode == '401')
                window.location.href= 'login';
            else 
                resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
}

async function axiosGet(url,data,option = '') {
    return new Promise(async function (resolve, reject) {
        axios({
            method: 'get',
            url: url,
            data: data,
            headers: option
        }).then((response) => {
            if(response.responseCode == '401')
                window.location.href= 'login';
            else 
                resolve(response.data);
        }, (error) => {
            reject(error);
        });
    })
}

async function axiosGetFile(url) {
    return new Promise(async function (resolve, reject) {
        axios({
            method: 'get',
            url: url,
        }).then((response) => {
            resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
}

function axiosRedirect(url) {
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        window.location.href= response.request.responseURL;
    }, (error) => {
        reject(error);
    });
}