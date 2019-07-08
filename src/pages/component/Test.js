import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage,
    Image,
    Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import moment from 'moment';
import Calendars from '../component/CalenderComponet';
import DeviceStorage from '../component/DeviceStorage';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
const rnfsPath = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath
export default class Calender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // myDate: moment(new Date()).format('YYYY年MM月DD日'),
        }
        console.log(rnfsPath);

    }
    static navigationOptions = ({ navigation, screenProps }) => ({});
    componentDidMount() {

    }

    _readFile = (fileName, callback) => {
        RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
            .then(result => alert(JSON.stringify(result)));
    };


    //删除
    asRemove = (k) => {
        let _that = this;
        AsyncStorage.removeItem('key', function (error, result) {
            if (error) {
                alert('删除失败')
                return null;
            } else {
                alert('删除完成\n' + JSON.stringify(result))
                return result;
            }
        })
    }
    //存储
    asSet = (k, v) => {
        let _that = this;
        AsyncStorage.setItem('key', 'HEY BODY', function (error, result) {
            if (error) {
                alert('读取失败')
            } else {
                _that.asGet()
            }
        })
    }

    //获取
    asGet = () => {
        let _that = this;
        console.log('读取')
        AsyncStorage.getItem('key', function (error, result) {
            if (error) {
                alert('读取失败')
                return null;
            } else {
                alert('读取完成\n' + JSON.stringify(result))
                return result;
            }
        })
    }

    //删库
    asClear() {
        AsyncStorage.clear(function (error, result) {
            if (error) {
                alert('删库失败')
                return null;
            } else {
                alert('删库完成\n' + JSON.stringify(result))
                return result;
            }
        })
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={{ width: width, height: 0.75 * width, borderWidth: 2, backgroundColor: '#f00' }} source={{uri: '//storage%2Femulated%2F0%2FDCIM%2FCamera%2FIMG_20190609_192225_1.jpg'}} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: width * 0.9 }}>
                            <TouchableOpacity style={styles.bottomButtonStyle} onPress={() => this.asGet()}>
                                <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>get</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtonStyle} onPress={() => { this.asRemove() }}>
                                <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtonStyle} onPress={() => { this.asSet() }}>
                                <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtonStyle} onPress={() => { this.asClear() }}>
                                <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>clear</Text>
                            </TouchableOpacity>
                            {/* <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>央视新闻客户端29日讯，据华为公司最新消息，华为已提起诉讼并将于周二提出简易判决动议。
source={require('/DCIM/Camera/IMG_20190609_192225_1.jpg')}

这一声明也发表在了美国《华尔街日报》等媒体上</Text> */}
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    },
    bottomButtonStyle: {
        marginVertical: 20,
        height: height * 0.1,
        width: width * 0.9,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 200,
        borderRadius: 5,
        width: width * 0.9,
        shadowColor: '#000',

        marginBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
    },

});
