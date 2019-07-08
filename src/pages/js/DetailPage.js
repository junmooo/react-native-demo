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
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

//图片选择器参数设置
let options = {
    title: '请选择图片来源',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    cancelButtonTitle: '取消',
    // customButtons: [
    //   {name: 'hangge', title: 'hangge.com图片'},
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

//导入 nativeImageSource函数
let nativeImageSource = require('nativeImageSource');
export default class Calender extends Component {


    // static defaultProps =
    //     {
    //         DetailPageKey: 'DetailPage_' + this.props.navigation.state.params.myDate,
    //         DetailBgImageKey: 'DetailBgImage_' + this.props.navigation.state.params.myDate,
    //     }
    constructor(props) {
        super(props);
        // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        let mydate = this.props.navigation.state.params.myDate;
        this.state = {
            // myDate: moment(new Date()).format('YYYY年MM月DD日'),
            origPage: [],
            isShow: false,
            content: '',
            conformBtn: false,
            index: '',
            imageModal: false,
            bgImageModal: false,
            bgImage: '',
            myDate: mydate,
        }
        this._renderRow = this._renderRow.bind(this);
    }
    static navigationOptions = ({ navigation, screenProps }) => ({});

    componentDidMount() {
        let _that = this;
        let myDate = this.state.myDate;
        let DetailPageKey = 'DetailPage_' + myDate;
        let DetailBgImageKey = 'DetailBgImage_' + myDate;
        AsyncStorage.getItem(DetailPageKey, function (error, result) { _that.setState({ origPage: JSON.parse(result) || [] }) });
        AsyncStorage.getItem(DetailBgImageKey, function (error, result) { _that.setState({ bgImage: JSON.parse(result) || [] }) });
    }

    close() {
        this.setState({ isShow: false, bgImageModal: false, imageModal: false, conformBtn: false })
    }


    edit(index, type, section, value) {
        // alert(index + type + section + value)
        let _that = this;
        let pagesStr = JSON.stringify(this.state.origPage);
        let pages = JSON.parse(pagesStr);


        if (index >= pages.length) {
            if (type == 'image') {
                pages[index] = { content: null, style: { width: width * 0.9, paddingHorizontal: 30, resizeMode: 'cover', height: width * 0.41, borderRadius: 8, marginVertical: 5 }, type: 'image' }
            } else {
                pages[index] = { content: null, style: { width: width * 0.9, paddingHorizontal: 30, fontSize: 18, color: '#000', }, type: 'Text' }
            }
        }
        if (type == 'text') {
            pages[index].content = value
        } else if (type == 'style') {
            pages[index].style.width = width * 0.9;
            switch (section + '') {
                case 'fontSize':
                    pages[index].style.fontSize = value;
                    break;
                case 'color':
                    pages[index].style.color = value;
                    break;
                case 'align':
                    pages[index].style.textAlign = value;
                    break;
                case 'textDecoration':
                    value == "粗体" ? pages[index].style.fontWeight = '900' : null;
                    value == "斜体" ? pages[index].style.fontStyle = 'italic' : null;
                    value == "下划线" ? pages[index].style.textDecorationLine = 'underline' : null;
                    value == "中划线" ? pages[index].style.textDecorationLine = 'line-through' : null;
                    value == "不修饰" ? pages[index].style.textDecorationLine = 'none' : null;
                    break;
                default:
            }
        } else if (type == 'image') {
            if (section == 'style') {
                // alert(JSON.stringify(value));
                pages[index].style.width = value.imageWidth / 10 * width;
                pages[index].style.height = value.imageHeight / 10 * width;
                pages[index].style.borderRadius = value.imageRedius;
            } else {
                pages[index].content = value
            }
        } else if (type == 'bgImage') {
            this.setState({
                bgImage: value
            }, () => _that.asSet('DetailBgImage_' + _that.state.myDate, _that.state.bgImage))
        }
        this.setState({
            origPage: pages
        }, () => _that.asSet('DetailPage_' + _that.state.myDate, _that.state.origPage))
    }

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
        // alert(k+JSON.stringify(v))
        let _that = this;
        AsyncStorage.setItem(k, JSON.stringify(v), function (error, result) {
            if (error) {
                alert('存储失败' + JSON.stringify(error))
            } else {
                _that.asGet(k)
            }
        })
    }

    //获取
    asGet = (k) => {
        let _that = this;
        console.log('读取')
        AsyncStorage.getItem(k, function (error, result) {
            if (error) {
                alert('读取失败')
                return null;
            } else {
                if (k.indexOf("DetailPage_") != -1) {
                    _that.setState({ origPage: result ? JSON.parse(result) : [] });
                    console.log(k + JSON.stringify(result) + decodeURIComponent(result))
                    return result;
                } else if (k.indexOf("DetailBgImage_") != -1) {
                    _that.setState({ bgImage: result ? JSON.parse(result) : [] })
                    console.log(k + JSON.stringify(result))
                }

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

    _renderRow(rowData) {
        // alert(JSON.stringify(rowData))
        let type = rowData.item.type;
        let style = rowData.item.style;
        let content = rowData.item.content;
        let index = rowData.index;
        return (
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                {
                    type == 'Text' ?
                        <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.setState({ content: content, index: index }, (this.setState({ isShow: true })))}>
                            <Text style={style}>{content}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.setState({ imageWidth: style.width / width * 10, index: index, imageHeight: style.height / width * 10, imageRedius: style.borderRadius, }, (this.setState({ imageModal: true })))}>
                            <Image style={style} source={content} />
                        </TouchableOpacity>
                }
            </View>
        )
    }

    //选择照片按钮点击
    choosePic(index, type) {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // Image.getSize(response.uri, (imageWidth, imageHeight) => {
                //     alert(typeof (response.uri) + response.uri + typeof (imageWidth) + '' + typeof (imageHeight))
                //     height1 = width * imageHeight / imageWidth; //按照屏幕宽度进行等比缩放
                //     alert(imageWidth + 'imageWidth' + imageHeight + 'imageHeight' + width + 'width' + height1 + 'height1')
                // alert(type)
                if (type == 'image') {
                    this.edit(index, type, width * 0.6, source);
                } else if (type == 'bgImage') {
                    // alert(JSON.stringify(source))
                    this.edit(index, type, width * 0.6, source);
                }
                // }, () => alert('获取高度报错了'));

                // let orderImage = Image.resolveAssetSource(require('../../images/launchimage.jpg'));
                // alert('orderImage:::::'+JSON.stringify(orderImage))

            }
        });
    }
    render() {
        // alert(JSON.stringify(this.state))
        return (
            <ImageBackground style={{ width: width, height: height + 18, resizeMode: 'cover', }} source={this.state.bgImage} >

                <View style={styles.container}>
                    <FlatList
                        data={this.state.origPage}
                        extraData={this.state}
                        keyExtractor={item => item.id}
                        renderItem={(rowData) => this._renderRow(rowData)}
                        handleMethod={({ viewableItems }) => this.handleViewableItemsChanged(viewableItems)}
                    // renderFooter={this._renderFooter.bind(this)}
                    // renderHeader={this._rendHeader.bind(this)}
                    // onResponderMove={(e)=> {this._onResponderMove(e)}}
                    // onResponderRelease={(e)=> {this._onResponderRelease(e)}}
                    // onEndReached={() => { alert('到底了'); }}
                    />
                    {/* <TouchableOpacity activeOpacity={0.9} onPress={() => this.addTitle("", "2", "hahahahahaha", "color:red")}> */}
                    {/* <Image source={this.state.avatarSource} style={styles.image} /> */}
                    <View style={{ alignItems: 'flex-end', width: width, padding: 20, }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.asClear()}>
                            <Text style={{ height: 30, textAlignVertical: 'center', width: 110, textAlign: 'center', backgroundColor: '#aaf', fontSize: 20, color: '#fff', borderRadius: 15 }}>ASCLEAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.asGet('DetailPage_' + this.state.myDate)}>
                            <Text style={{ height: 30, textAlignVertical: 'center', width: 110, textAlign: 'center', backgroundColor: '#aaf', fontSize: 20, color: '#fff', borderRadius: 15 }}>ASGET</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.setState({ content: '', index: this.state.origPage.length, conformBtn: true })}>
                            <Text style={{ height: 30, textAlignVertical: 'center', width: 110, textAlign: 'center', backgroundColor: '#aaf', fontSize: 20, color: '#fff', borderRadius: 15 }}>长按编辑</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity activeOpacity={0.9} onPress={this.choosePic.bind(this)}>
                    <Text style={{ height: height * 0.05, textAlignVertical: 'center', width: width, textAlign: 'center' }}>选择照片</Text>
                </TouchableOpacity> */}

                    <View>
                        <Modal
                            transparent={true}
                            animationType="fade"
                            visible={this.state.isShow}
                            onRequestClose={() => { this.close() }}
                        >
                            <View style={styles.modelBlock}>
                                <View style={styles.modelCon}>

                                    <View style={{ backgroundColor: '#efefef', padding: 30, height: height * 0.19, width: '100%', justifyContent: 'space-evenly', marginTop: 30 }}>
                                        {/* <TextInput multiline={true} style={{textAlign: 'center',textAlignVertical:'center', height: height * 0.065,fontSize: 15, width: '100%',backgroundColor:'#ccc',marginBottom:20,borderRadius:5}}/> */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-evenly', }}>
                                            <ModalDropdown style={styles.styleInput} options={[10, 14, 18, 20, 22, 24, 28, 32,]} dropdownStyle={styles.dropdownStyle} onSelect={(index, value) => this.edit(this.state.index, 'style', 'fontSize', value)} >
                                                <Text multiline={true} style={styles.selectBtnText}>选择字体大小</Text>
                                            </ModalDropdown>
                                            <ModalDropdown style={styles.styleInput} options={['#000', '#f00', '#00f', '#0f0', '#fDD3D3']} dropdownStyle={styles.dropdownStyle} onSelect={(index, value) => this.edit(this.state.index, 'style', 'color', value)}>
                                                <Text multiline={true} style={styles.selectBtnText}>选择字体颜色</Text>
                                            </ModalDropdown>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }} >
                                            <ModalDropdown style={styles.styleInput} options={['center', 'left', 'right', 'justify']} dropdownStyle={styles.dropdownStyle} onSelect={(index, value) => this.edit(this.state.index, 'style', 'align', value)}>
                                                <Text multiline={true} style={styles.selectBtnText}>选择文字排序</Text>
                                            </ModalDropdown>
                                            <ModalDropdown style={styles.styleInput} options={["粗体", "斜体", "下划线", "中划线", '不修饰']}
                                                onSelect={(index, value) => this.edit(this.state.index, 'style', 'textDecoration', value)}
                                            >
                                                <Text multiline={true} style={styles.selectBtnText}>选择文字样式</Text>
                                            </ModalDropdown>
                                        </View>
                                    </View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={2}
                                        style={styles.msgText}
                                        value={this.state.content}
                                        placeholder={'点我写下你的心情~'}
                                        onChangeText={(text) => this.setState({ content: text })}
                                    />
                                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', }}>
                                        <Text onPress={() => this.close()} style={styles.sureBtn}>取消</Text>
                                        <Text style={{ borderColor: '#ccc', borderWidth: 0.2, borderTopWidth: 0.5, height: 25, }} />
                                        <Text onPress={() => { this.edit(this.state.index, 'text', 'content', this.state.content); this.close() }} style={styles.sureBtn}>确定</Text>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View>
                        <Modal
                            transparent={true}
                            animationType='slide'
                            visible={this.state.conformBtn}
                            onRequestClose={() => { this.close() }}
                        >
                            <View style={styles.modelBlock}>
                                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: width * 0.7, borderRadius: 10 }}>
                                    <Text onPress={() => { this.choosePic('', 'bgImage'); this.setState({ conformBtn: false, }) }} style={styles.selectBtn}>设置背景图</Text>
                                    {/* <Text style={{ borderColor: '#ccc', borderWidth: 0.2, borderTopWidth: 0.5, height: 25, }} /> */}
                                    <Text onPress={() => { this.choosePic(this.state.origPage.length, 'image'); this.setState({ conformBtn: false, }) }} style={styles.selectBtn}>插入图片</Text>
                                    {/* +<Text style={{ borderColor: '#ccc', borderWidth: 0.2, borderTopWidth: 0.5, height: 25, }} /> */}
                                    <Text onPress={() => {
                                        this.setState({ isShow: true, content: '', conformBtn: false, index: this.state.origPage.length, });
                                    }} style={styles.selectBtn}>输入文字</Text>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={this.state.imageModal}
                            onRequestClose={() => { this.close() }}
                        >
                            <View style={styles.modelBlock}>
                                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: width * 0.7, height: height * 0.5, borderRadius: 10 }}>
                                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: height * 0.42, }}>
                                        <View style={styles.widthWrapStyle}>
                                            <Text style={styles.widthLabelStyle}>宽度</Text>
                                            <TextInput keyboardType='numeric' style={styles.widthInputStyle} onChangeText={(text) => this.setState({ imageWidth: parseFloat(text) })}>{this.state.imageWidth || ''}</TextInput>
                                        </View>
                                        <View style={styles.widthWrapStyle}>
                                            <Text style={styles.widthLabelStyle} >高度</Text>
                                            <TextInput keyboardType='numeric' style={styles.widthInputStyle} onChangeText={(text) => this.setState({ imageHeight: parseFloat(text) })}>{this.state.imageHeight || ''}</TextInput>
                                        </View>
                                        <View style={styles.widthWrapStyle}>
                                            <Text style={styles.widthLabelStyle}>圆角大小</Text>
                                            <TextInput style={styles.widthInputStyle} keyboardType='numeric' onChangeText={(text) => this.setState({ imageRedius: parseFloat(text) })}>{this.state.imageRedius || ''}</TextInput>
                                        </View>
                                        <View style={styles.widthWrapStyle}>
                                            <Text style={styles.widthLabelStyle} >图片样式</Text>
                                            <Text style={styles.imageStyleBtn} >覆盖</Text>
                                            <Text style={styles.imageStyleBtn} >包含</Text>
                                            <Text style={styles.imageStyleBtn} >拉伸</Text>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end', }}>
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <Text onPress={() => this.setState({ imageModal: false, })} style={styles.sureBtn}>取消</Text>
                                            <Text style={{ borderColor: '#ccc', borderWidth: 0.2, borderTopWidth: 0.5, height: 25, }} />
                                            <Text onPress={() => { this.setState({ imageModal: false, }), this.edit(this.state.index, 'image', 'style', { imageWidth: this.state.imageWidth, imageHeight: this.state.imageHeight, imageRedius: this.state.imageRedius }) }} style={styles.sureBtn}>确定</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </Modal>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    // webViewContainer: {
    //     backgroundColor: '#CCC',
    //     width: width,
    //     height: height * 0.8,
    // },
    container: {
        paddingTop: 20,
        flex: 1,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // borderWidth: 1
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
        height: 50,
        borderRadius: 5,
        width: width * 0.9,
        shadowColor: '#000',
        backgroundColor: 'white',
        textAlign: 'center',
    },
    modelBlock: {
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#dd0ff0',
        width: '100%',
        height: '100%',

        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modelCon: {
        width: '80%',
        height: height * 0.80,
        // marginTop: -70,

        borderTopColor: '#efefef',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    msgText: {
        textAlign: 'center',
        padding: 30,
        height: height * 0.50,
        fontSize: 15,
        width: '100%',
        // borderWidth:1,


    },
    sureBtn: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: height * 0.06,
        width: 80,
        fontSize: 18,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
    },
    selectBtn: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: height * 0.08,
        width: '100%',
        fontSize: 18,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
    },
    styleInput: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: height * 0.065,
        fontSize: 15,
        width: '48%',
        backgroundColor: '#dfdfdf',
        borderRadius: 5
    },
    selectBtnText: {
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%'
    },
    dropdownStyle: { height: 182, width: '30%' },
    image: {
        height: width * 0.44,
        width: width * 0.9,
        alignSelf: 'center',
        borderRadius: 8,
        // resizeMethod:'auto',
        resizeMode: 'cover',
    },
    widthLabelStyle: { height: 45, width: 75, textAlign: 'center', textAlignVertical: 'center', },
    widthInputStyle: { borderLeftWidth: 3, borderLeftColor: '#eee', width: 170, height: 45, textAlign: 'center', textAlignVertical: 'center', },
    widthWrapStyle: { flexDirection: 'row', backgroundColor: '#ddd', borderRadius: 5 },
    imageStyleBtn: { width: 56, borderLeftWidth: 2, borderLeftColor: '#eee', textAlign: 'center', textAlignVertical: 'center' },
});
