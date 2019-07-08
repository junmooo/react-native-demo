import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, BackHandler, Platform, WebView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class WebContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.navigation.state.params
        }
    }

    render() {

        return (
            <View style={{ height: height + 18, width: width }}>

                <WebView
                    style={{ width: width, backgroundColor: 'grey' }}
                    source={{ uri: this.state.url, method: this.state.method, header: this.state.header, body: this.state.body }}
                    javaScriptEnabled={true}
                    // onLoadStart={() => showToast} 
                    // onLoadEnd={() => hideToast} 
                    // onLoadEnd={() => this.setState({ show: false })}
                    domStorageEnabled={true}
                // scalesPageToFit={false} 
                >
                </WebView>
            </View>
        )
    }
}