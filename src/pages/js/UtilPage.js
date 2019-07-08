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
    WebView,
    Modal,
    ListView,
    FlatList,
    Image,
    ImageBackground,
} from 'react-native';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import Calendars from '../component/CalenderComponet';
import ImagePicker from 'react-native-image-picker';
import API from '../component/service/API';
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class UtilPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            realtime: {},
        }
        // https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
    }

    componentDidMount() {

        // this.getSimpleWeather();
        this.getWepiaoUrl();
    }

    getWepiaoUrl() {

        fetch('http://v.juhe.cn/wepiao/query?key=c871abe5b9889021d19e6b11b72188d5').then(
            result => {
                data = JSON.parse(result._bodyText).result
                console.log('result::::::::::::::::' + JSON.stringify(data));
                this.setState({
                    h5weixin: data.h5weixin,
                    h5url: data.h5url,
                })
            },
            error => {
                alert(JSON.stringify(error))
            }
        )
    }
    getSimpleWeather() {

        fetch('http://apis.juhe.cn/simpleWeather/query?city=%E5%8C%97%E4%BA%AC&key=3db9d1347a186cea7ea21ce46354dee8').then(
            result => {
                weather = JSON.parse(result._bodyText).result
                this.setState({
                    realtime: weather.realtime,
                    futureWeather: weather.future,
                })
            },
            error => {
                alert(JSON.stringify(error))
            }
        )
    }


    render() {
        let realtime = this.state.realtime;
        // alert(JSON.stringify(this.state))
        return (
            <View style={styles.container}>
                {/* this.props.navigation.navigate('RNWebView', { url: 'https://ofst-1810-gn-nova-app1.sdc.cs.icbc/OFSTCARDWEB/dist/#/apply/city', method: 'GET', header: '', body: '' }) }} */}
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('WebContainer', { url: this.state.h5url, method: 'GET', header: '', body: '' })} >
                    <ImageBackground style={{ width: width * 0.85, height: width * 0.42, resizeMode: 'cover', marginTop: 30, alignContent: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 20 }} source={require('../../images/movie.gif')} >
                        <Text style={{ margin: 20, padding: 20, borderRadius: 8, color: '#fff', textAlign: 'center', textAlignVertical: 'center', fontSize: 28 }}>电       影</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('Constellation', { param: '没有啦' })} >
                    <ImageBackground style={{ width: width * 0.85, height: width * 0.42, resizeMode: 'cover', marginTop: 30, alignContent: 'center', justifyContent: 'center' }} imageStyle={{ borderRadius: 20 }} source={require('../../images/movie.gif')} >
                        <Text style={{ margin: 20, padding: 20, borderRadius: 8, color: '#fff', textAlign: 'center', textAlignVertical: 'center', fontSize: 28 }}>星       座</Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        flex: 1,
        height: height,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // borderWidth: 1
    },
})