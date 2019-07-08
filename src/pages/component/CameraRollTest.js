import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    CameraRoll,
    WebView,
    Modal,
    ScrollView,
    Dimensions,
    FlatList,
} from 'react-native';
/**
 * 1.要使用CameraRoll模块，首先需要导入模块。
import React, { Component } from 'react';
import { CameraRoll } from 'react-native';
2.通过getPhotoParams获取图片
getPhotoParams方法接收一个object作为参数，参数中可以包含以下信息:
first：数字类型，想要逆序显示的照片数目（即最新保存的照片）
after：字符串类型，一个匹配前一次调用getPhotos的page_info{ end_cursor}信息的指针。
groupTypes：字符串类型，指定特定的组别来过滤结果，可能是Album、All、Event等值。完整的GroupTypes可在源码中查看。
groupName：字符串类型，在改组指定一个过滤器，例如Recent Photos或一个相册名称。
AssetType: 值为All，Photos 或Videos的其中一个，为资源类型指定一个过滤器。
mimeTypes：字符串数组类型，基于MIME类型进行过滤（例如：iamge/jpeg）。
 */
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
 
export default class PhotoLibrary extends Component {
    constructor(){
        super();
        this.state = {
            dataSource:[],
            lastCursor:null,
            noMore:false,
 
        }
    }
    componentDidMount(){
       this.fetchData();
    }
    // 从cameraRoll中加载数据的函数
    fetchData() {
        //照片获取参数
        var fetchParams = {
            first: 6,
            groupTypes: 'All',
            assetType: 'Photos'
        }
        // 如果不是第一次取图片，则this.state.lastCursor不为空，下一次取图片时就从上次的结尾开始取
        if(this.state.lastCursor != null){
            fetchParams.after = this.state.lastCursor;
        }
        //获取照片
        var _that = this;
        var promise = CameraRoll.getPhotos(fetchParams)
        promise.then(
            function(data){
                // console.log('data');
                console.log(data);
                
                let isNoMore = false;
                if(!data.page_info.has_next_page){ //已经到相册的末尾了
                    isNoMore = true;
                }
 
                var edges = data.edges;
                // var array = _that.state.dataSource;
                var photos = [];
                if(edges.length > 0){//如果此次加载的图片数量大于0
                    
                    for (var i in edges) {
                        photos.push({url:edges[i].node.image.uri,key:i+data.page_info.end_cursor,name:edges[i].node.image.filename});
                    }
                    // array.concat(photos);
                }
                // console.log('array');
                // console.log(array);
            
                _that.setState({
                    dataSource:_that.state.dataSource.concat(photos),
                    noMore: isNoMore,
                    lastCursor:data.page_info.end_cursor,
                });
                // console.log('_that.state.dataSource');
                // console.log(_that.state.dataSource);
            },
            function(err){
                alert('获取照片失败！');
            });
    }
    render(){
        let callBack = this.props.callBack;
        return(
            <View style={styles.container}>
                <View >
                    <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={()=>{this.onLoadMore()}}
                    data={this.state.dataSource}
                    renderItem={({item,index})=>(
                        <TouchableOpacity onPress={()=>{
                                {/* console.log(item); */}
                                callBack(item);
                            }}>
                            <ImageItem data={item}></ImageItem>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    columnWrapperStyle={{paddingTop: 5,paddingBottom:5,paddingLeft:5}}
                
                    >
 
                    </FlatList>
                </View>
            </View>
        );
    }
    
    onLoadMore(){
        if(!this.state.noMore){
            this.fetchData();
         }
    }
}
class ImageItem extends Component {
    constructor(){
        super();
    }
    render(){
        let item = this.props.data;
        return(
            <View style={{flex:1,}}>
                <Image resizeMode="stretch" style={styles.image} source={{uri:item.url}}/>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        // backgroundColor:'#f0f5f4',
        backgroundColor:'white',
        flex: 1,
    },
    image:{
        width: (ScreenWidth - 30) / 2,
        height: 120,
        marginLeft: 5,
        marginRight: 5,
    },
})