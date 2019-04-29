import React, {Component} from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,Dimensions,
  View
} from 'react-native';
import {Icon} from 'react-native-elements'


const HEADER_MAX_HEIGHT = 150;
const HEIGHT_SCREEN = Dimensions.get('window').height;
const WIDTH_SEEN = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
    /*Màn hình lớn*/
    Container: {
        flex:1

    },
    Drawer: {
        width: WIDTH_SEEN *0.7,
        height: HEIGHT_SCREEN,
    },
    FontHome : {
        color:'white',
        fontWeight:'bold',
        alignItems:'center',
        fontSize: 20
    },

    Header : {
        backgroundColor:'rgba(85, 239, 196,1.0)',
        color:'rgba(85, 239, 196,1.0)'
    },

    DrawerItem : {
        borderTopColor:'rgba(255, 165, 2,1.0)',
        borderBottomColor:'rgba(255, 165, 2,1.0)',
        borderBottomWidth: 1,
        height: (Dimensions.get('window').height)/10,
        alignItems:'center',
        justifyContent:'center'
    },

    DrawerLabelStyleItem:{
        color: 'white',
        fontSize:20,
        fontWeight:'bold'
    },

    AnimatedView: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        overflow:'hidden',
        height: HEADER_MAX_HEIGHT
    },

    AnimatedView2 : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        marginTop:5
    },

    AnimatedTitleContent : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: 100,
    },

    Indicator : {
        position: 'absolute',
        top: HEIGHT_SCREEN/2,
        left: 0,
        right: 0,
        width: null,
        height: 100,
        alignItems : 'center',
        justifyContent : 'center'
    }


})
/**Icon menu màn hình chính */
export const Icon_Custom = (OpenDrawer)=>{
    return(
        <TouchableOpacity onPress={OpenDrawer}>
            <Icon name='menu' color='white'/>
        </TouchableOpacity>
    )
  }

export const Icon_CustomBack = (navigation)=>{
    return(
        <TouchableOpacity onPress={()=>{navigation.navigate('MainScreen')}}>
            <Icon size={25} name='keyboard-arrow-left' color='white'/>
        </TouchableOpacity>
    )
  }

export const Icon_Home = (navigation)=>{
    return(
        <TouchableOpacity onPress={()=>{navigation.navigate('MainScreen')}}>
            <Icon size={25} name='home' color='white'/>
        </TouchableOpacity>
    )
  }

  export const Icon_Custom_RightTitle = (state,Action)=>{
    let NAME_ICON = "line-weight";
    if(state === true)NAME_ICON = "close";
    console.log(NAME_ICON)
    return(
            <TouchableOpacity>
            <Icon size={25} name = {NAME_ICON} color='white'/>
            </TouchableOpacity>
    )
  }