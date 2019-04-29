import React,{Component} from 'react';
import propTypes from 'prop-types';
import {WebView,requireNativeComponent} from 'react-native';

export default class WebviewCustom extends Component {

    static PropTypes= {
        ...WebView.propTypes,
        AutoScroll: propTypes.bool,
    }


    render(){
        return(
            <WebView {...this.props} nativeConfig={{
                component: Custom,
                props: {
                    AutoScroll: this.props.AutoScroll
                }
            }} >

            </WebView>
        )
    }
}

const Custom = requireNativeComponent('WebviewCustom',WebviewCustom,WebView.extraNativeComponentConfig);