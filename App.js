import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Calender from './src/pages/js/Calender';
import DetailPage from './src/pages/js/DetailPage';
import Test from './src/pages/component/Test';
// import CameraRollTest from './src/pages/component/CameraRollTest';
import OneSentence from './src/pages/js/OneSentence';
import UtilPage from './src/pages/js/UtilPage';
import WebContainer from './src/pages/component/WebContainer';
import Constellation from './src/pages/js/Constellation';


const navigationOptions = {

    // headerTitle: '选择药材',
    //设置滑动返回的距离
    // gestureResponseDistance: { horizontal: 300 },

    //是否开启手势滑动返回，android 默认关闭 ios打开
    gesturesEnabled: true,

    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    // headerBackTitle: null,
    //导航栏的样式
    // headerStyle: styles.headerStyle,
    //导航栏文字的样式
    // headerTitleStyle: styles.headerTitleStyle,
    //返回按钮的颜色2
    // headerTintColor: 'white',

    //隐藏顶部导航栏
    header: null,

    //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
    // headerRight: (<View />),

    //设置导航栏左边的视图
    // headerLeft: (<View/>),

}

const stackNavigatorConfigs = {

    // OneSentence: {
    //     screen: OneSentence,
    //     navigationOptions: {
    //         ...navigationOptions,
    //     }
    // },
    UtilPage: {
        screen: UtilPage,
        navigationOptions: {
            ...navigationOptions,
        }
    },
    WebContainer: {
        screen: WebContainer,
        navigationOptions: {
            ...navigationOptions,
        }
    },
    Constellation: {
        screen: Constellation,
        navigationOptions: {
            ...navigationOptions,
        }
    },
    // Test: {
    //     screen: Test,
    //     navigationOptions: {
    //         ...navigationOptions,
    //     }
    // },
    // Calender: {
    //     screen: Calender,
    //     navigationOptions: {
    //         ...navigationOptions,
    //     }
    // },
    // DetailPage: {
    //     screen: DetailPage,
    //     navigationOptions: {
    //         ...navigationOptions,
    //     }
    // },
}

const AppNavigator = createStackNavigator(stackNavigatorConfigs);


export default createAppContainer(AppNavigator);