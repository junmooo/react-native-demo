import React, {
    AsyncStorage
}from 'react-native';

class DeviceStorage {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }

0.
    /**
     * 保存
     * @param key/、
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, value);
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    /**
     * clear
     * @param 
     * @returns {*}
     */
    static clear() {
        return AsyncStorage.clear();
    }
    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static getAllKeys() {
        return AsyncStorage.getAllKeys();
    }
}

export default DeviceStorage;