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

export default class OneSentence extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            textBody: 'Loading...',
            copyright: 'FANG&GUO©JUNMOOO',
        }
        // https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture
    }

    componentDidMount() {
        this.getNewImage();
    }

    getNewImage() {
        index = this.state.index + 1
        API.post('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=' + index + '&n=1', {}).then(
            result => {
                origImage = result.images[0].url;
                newImage = origImage.replace(/1920x1080/g, "1080x1920")
                copyright = result.images[0].copyright
                console.log(JSON.stringify(result) + '\n' + origImage + '\n' + newImage + '\n' + index + '\n' + JSON.stringify(this.state))
                this.setState({
                    imageUrl: 'https://cn.bing.com' + newImage,
                    index: index,
                    copyright: copyright,
                })
            }
        )
        fetch('https://www.liutianyou.com/api/?type=json&charset=utf-8').then(
            result => {
                let textBody = result._bodyText.split("s.parentNode.insertBefore(hm, s);\r\n})();\r\n</script>\r\n\r\n")[1];
                console.log(textBody);
                this.setState({
                    textBody: textBody,
                })
            },
            error => {
                alert(JSON.stringify(error))
            }
        )
    }


    render() {
        let bgImage = this.state.imageUrl;
        return (
            <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.getNewImage()} onPress={() => this.props.navigation.navigate('UtilPage')}>
                {/* <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.getNewImage()} > */}
                <ImageBackground style={{ width: width, height: height + 18, resizeMode: 'cover', }} source={{ uri: bgImage }} >
                    <View style={{ height: height * 0.5, width: width, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0)', }}>
                        <Text style={{ width: 350, backgroundColor: 'rgba(0, 0, 0, 0.3)', margin: 20, padding: 20, borderRadius: 8, color: '#fff', textAlign: 'center', textAlignVertical: 'center', fontSize: 16 }}>{this.state.textBody}</Text>
                    </View>
                    <View style={{ height: height * 0.5, width: width, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(255, 255, 255, 0)', }}>
                        <Text style={{ width: 200, backgroundColor: 'rgba(0, 0, 0, 0.5)', margin: 40, padding: 20, borderRadius: 8, color: '#fff', fontSize: 12 }}>{this.state.copyright}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}
