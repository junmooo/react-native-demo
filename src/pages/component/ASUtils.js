/**
 * Created by yeshaojian on 17/3/22.
 */

var ASUtils = {};

//set
ASUtils.asSet = function (k, v) {
    AsyncStorage.setItem(k, JSON.stringify(v), function (error, result) {
        if (error) {
            alert('保存失败')
            return false
        } else {
            alert('保存成功'+k+'--'+JSON.stringify(v))
            return true
        }
    })
};
//get
ASUtils.asGet = (k, v) => {
    AsyncStorage.getItem(k, function (error, result) {
        if (error) {
            alert('读取失败')
            return false
        } else {
            return true
        }
    })
}


global.ASUtils = ASUtils;