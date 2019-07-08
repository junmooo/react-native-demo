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
    Modal,
} from 'react-native';
import moment from 'moment';
import Calendars from '../component/CalenderComponet';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

export default class Calender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myDate: moment(new Date()).format('YYYY年MM月DD日'),
            editable: false,
            conformBtn: false,
        }
    }
    static navigationOptions = ({ navigation, screenProps }) => ({});
    componentDidMount() {
        // alert(this.state.myDate + JSON.stringify(summaryData))
        let summary = this.asGet(this.state.myDate)
        this.setState({
            summary: summary || '今天你想我了没？'
        })
    }
    callback = (data) => {
        console.log(data)
        this.setState({ myDate: data.myMonth + data.id + '日' }, () => this.asGet(this.state.myDate))

    }
    //删除
    asRemove = (k) => {
        let _that = this;
        AsyncStorage.removeItem(k, function (error, result) {
            if (error) {
                alert('删除失败')
                return null;
            } else {
                _that.asGet(k)
                alert('删除完成\n' + JSON.stringify(result))
                return result;
            }
        })
    }
    //存储
    asSet = (k, v) => {
        let _that = this;
        AsyncStorage.setItem(k, v, function (error, result) {
            if (error) {
                alert('读取失败')
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
                _that.setState({ summary: result })
                // alert('读取完成\n' + JSON.stringify(result))
                return result;
            }
        })
    }

    //删库
    asClear(k) {
        let _that = this;
        AsyncStorage.clear(function (error, result) {
            if (error) {
                alert('删库失败')
                return null;
            } else {
                alert('删库完成\n' + JSON.stringify(result))
                _that.asGet(k)
                return result;
            }
        })
    }
    render() {
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.container}>
                        {/* <View style={{ height: height * 0.50, }}>
                        </View> */}
                        <Calendars callback={this.callback.bind(this)} />
                        <View style={{ height: height * 0.55, backgroundColor: '#rgba(185,185,185,0.8)', width: width, }}>
                            <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#ccf', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>

                                {/* <Text style={{ fontSize: 18, color: '#ffffff' }}>{this.state.myDate}</Text> */}
                                <Text style={{ fontSize: 15, color: '#ffffff' }}>天气：艳阳天</Text>
                                <Text style={{ fontSize: 15, color: '#ffffff' }}>心情：也是艳阳天</Text>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.state.editable
                                        ?
                                        (<View>
                                            <TextInput
                                                style={styles.textInput}
                                                multiline={true}
                                                clearButtonMode="unless-editing"
                                                placeholder={'点击输入'}
                                                // placeholderTextColor="#aaa"
                                                value={this.state.summary}
                                                onChangeText={(text) => { this.setState({ summary: text }, () => this.asSet(this.state.myDate, this.state.summary)) }}
                                                underlineColorAndroid={'transparent'} />
                                            <Text style={{ borderRadius: 8, height: 40, width: width * 0.9, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#fee' }} onPress={() => { this.asSet(this.state.myDate, this.state.summary), this.setState({ editable: false }) }}>点我保存</Text>
                                        </View>)
                                        :
                                        <TouchableOpacity activeOpacity={0.9} onLongPress={() => this.setState({ editable: true })} onPress={() => this.props.navigation.navigate('DetailPage', { myDate: this.state.myDate })}>
                                            <Text style={styles.textInput}>{this.state.summary || '今天有没有想我啊'}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                                {/* <Text style={{ fontSize: 15, color: '#ffffff' }}>爱你是很重要的事</Text> */}

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
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                                <TouchableOpacity activeOpacity={0.9} style={styles.bottomButtonStyle} onPress={() => this.setState({ editable: true })}>
                                    <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>编辑</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styles.bottomButtonStyle} onPress={() => { this.asSet(this.state.myDate, this.state.summary), this.setState({ editable: false }) }}>
                                    <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>保存</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.9} style={styles.bottomButtonStyle} onPress={() => { this.asRemove(this.state.myDate), this.setState({ editable: false, }) }}>
                                    <Text style={{ textAlign: 'center', color: 'grey', textAlignVertical: 'center', }}>删除</Text>
                                </TouchableOpacity>
                                
                            </View> */}
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
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bottomButtonStyle: {
        height: height * 0.07,
        width: width * 0.3,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        marginBottom: 10,
    },
    removeBottomButtonStyle: {
        height: height * 0.07,
        width: width * 0.33,
        // borderBottomRightRadius: 15,
        backgroundColor: '#FF5555',
        justifyContent: 'center',
    },
    textInput: {
        height: 200,
        borderRadius: 5,
        width: width * 0.9,
        shadowColor: '#000',
        textAlignVertical: 'center',
        marginBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    modelBlock: {
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fdffff',
        width: '100%',
        height: '100%',

        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
});
