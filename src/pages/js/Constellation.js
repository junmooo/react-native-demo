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

export default class Constellation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            realtime: {},
            listData: [
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
                { imageUri: '../../images/constellation/baiyang.png' },
            ],
            refreshing: false,
        }
        this.renderItem = this.renderItem.bind(this);
        // this.separatorComponent = this.separatorComponent.bind(this);
        // this.listFooterComponent = this.listFooterComponent.bind(this);
        // this.listHeaderComponent = this.listHeaderComponent.bind(this);
    }

    componentDidMount() {
        this.getConstellation();
    }

    getConstellation() {

        fetch('http://web.juhe.cn:8080/constellation/getAll?consName=射手座&type=today&key=3f6680c2bb439fd463881ea61fd2c248').then(
            result => {
                data = JSON.parse(result._bodyText)
                console.log('result::::::::::::::::' + JSON.stringify(data));
                this.setState({
                    data: data
                })
            },
            error => {
                alert(JSON.stringify(error))
            }
        )
    }

    /*row*/
    renderItem(item) {
        imageUri = item.imageUri;
        return (
            <View>
                <Image style={{ width: width * 0.28, height: width * 0.28, resizeMode: 'cover' }} imageStyle={{ borderRadius: 5 }} source={require(item.imageUri)} />
            </View>
        )
    }
    // /*分割线*/
    // separatorComponent() {
    //     return <View style={{ height: 1, backgroundColor: 'red' }} />
    // }

    // /*底部组件*/
    // listFooterComponent() {
    //     return this.state.listData.length !== 0 ? <View>
    //         <Text style={{ alignItems: 'center', textAlign: 'center' }}>我是底部组件</Text>
    //     </View> : null;
    // }

    // /*头部组件*/
    // listHeaderComponent() {
    //     return this.state.data.listData !== 0 ? <View>
    //         <Text style={{ alignItems: 'center', textAlign: 'center' }}>我是头部组件</Text>
    //     </View> : null;
    // }

    // /*没有数据时显示的组件*/
    // listEmptyComponent() {
    //     return <View style={{ backgroundColor: 'red', flex: 1, height: height }}>
    //         <Text style={{
    //             alignItems: 'center',
    //             textAlign: 'center',
    //             lineHeight: height,
    //             color: 'white'
    //         }}
    //         >
    //             暂时没有数据,先等2秒
    //         </Text>
    //     </View>
    // }

    render() {
        // alert(JSON.stringify(this.state))
        return (
            <ImageBackground style={{ width: width, height: height + 18, resizeMode: 'cover', }} source={require('../../images/constellation/bgjianbian.jpg')}>
                <View style={styles.container}>

                    <FlatList style={{ marginTop: 20 }}
                        ref="flatList"
                        extraData={this.state}
                        // keyExtractor={(item, index) => String(index)}
                        data={this.state.listData} // 数据
                        renderItem={({ item }) => this.renderItem(item)} // row
                        ItemSeparatorComponent={this.separatorComponent} // 分割线
                        horizontal={false} // 水平还是垂直
                        // ListFooterComponent={this.listFooterComponent} // 底部组件
                        // ListHeaderComponent={this.listHeaderComponent} // 头部组件
                        // ListEmptyComponent={this.listEmptyComponent} // 没有数据时显示的界面
                        refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
                        //    onRefresh={()=>{
                        //       this.refresh();
                        //    }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
                        numColumns={3} // 指定多少列  等于 1 的时候，不能写 columnWrapperStyle
                        columnWrapperStyle={{ borderWidth: 2, borderColor: 'black' }} // 一整行的row设置样式
                    />
                    <TouchableOpacity onPress={() => {
                        {/*this.refs.flatList.scrollToEnd(); // 滚动到底部*/ }
                        this.refs.flatList.scrollToOffset({ animated: true, offset: 200 }); // 滚动到某一个位置

                        {
                            /*
                             scrollToEnd ({params?: ?{animated?: ?boolean}})：滚动到末尾，如果不设置getItemLayout属性的话，可能会比较卡。
                             scrollToIndex (params: {animated?: ?boolean, index: number, viewPosition?: number})：滚动到制定的位置
                             scrollToOffset (params: {animated?: ?boolean, offset: number})：滚动到指定的偏移的位置。
                            */
                        }
                    }}>
                        <Text style={{ textAlign: 'center' }}>点击跳转</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
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
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // borderWidth: 1
    },
})