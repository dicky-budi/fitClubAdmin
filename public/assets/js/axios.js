async function axiosPost(url,data,option = '') {
    axios.post(url,data,option).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });;
}

async function axiosGet(url,data,option = '',todo) {
    axios.get(url,data,option).then((response) => {
        console.log(response);
        if(todo != undefined && todo != null ){
            todo();
        }
        return response;
    }, (error) => {
        console.log(error);
    });;
}

async function axiosGetFile(url,todo) {
    return new Promise(async function (resolve, reject) {
        axios.get(url).then((response) => {
            resolve(response.data);
        }, (error) => {
            reject(error);
        });;
    });
}

function axiosRedirect(url) {
    axios.get(url).then((response) => {
        window.location.href= response.request.responseURL;
    }, (error) => {
        console.log(error);
    });;
}