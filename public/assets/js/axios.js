async function axiosPost(url,data,option = '') {
    axios.post(url,data,option).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });;
}

async function axiosGet(url,data,option = '') {
    axios.get(url,data,option).then((response) => {
        console.log(response);
        return response;
    }, (error) => {
        console.log(error);
    });;
}

function axiosRedirect(url) {
    axios.get(url).then((response) => {
        window.location.href= response.request.responseURL;
    }, (error) => {
        console.log(error);
    });;
}