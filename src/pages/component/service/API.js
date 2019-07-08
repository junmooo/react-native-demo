import qs from 'qs'

/**
 * 后台数据请求基类
 * 基于Fetch实现，封装Promise返回
 */
// var BaseUrl = 'https://elife.icbc.com.cn/OFSTCUST/';
// var BaseUrl = 'http://122.21.141.139/OFSTCUST/';
// var BaseUrl = 'https://ofst-1812-gn-nova-app1.sdc.cs.icbc/OFSTCUST/';

const API = {

    get: (url, params) => {
        return fetch(url + '?' + params)
    },
    post: (url, params) => {
        let promise = new Promise((resolve, reject) => {
            console.log('POST URL>>>:' + url);
            console.log('POST PARAM>>>:' + qs.stringify(params));
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: qs.stringify(params),
            }).then(
                (response) => response.json(),
                (response) => {
                    alert(JSON.stringify(response))
                })
                .then((jsonData) => {
                    //close()
                    console.log('RES数据>>>' + JSON.stringify(jsonData));
                    resolve(jsonData)
                    // if (jsonData.res === '0') {
                    // resolve(jsonData)
                    // } else {
                    //     reject(jsonData)
                    // }
                }).catch((err) => {
                    //close()
                    // setTimeout(() => {

                    reject({ 'error': err, 'errorCode': '1' })
                    // let toast = Toast.show({
                    //     position: 'center',
                    //     mask: true,
                    //     hasMask: false,
                    //     text: '请检查网络',
                    // });
                    //     setT:imeout(() => Toast.hide(toast), 3000);
                    // } , 3000);
                })
        })
        return promise
    }
}

export default API