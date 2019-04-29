import React, { Component } from 'react';
import {View} from 'react-native';
// import {stackSelectItem} from '../App';
import {Component1} from '../App.js';
import {Store} from '../Redux/Store';
import {Provider} from 'react-redux';
 
export default class MainApp extends Component {
    
    render(){
        return(
            <Provider store={Store}>
               <Component1>
                   
               </Component1>
            </Provider>
            
        )
    }
}