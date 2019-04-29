import React, { Component } from 'react';
import {
  Text,TouchableOpacity,
  View,StatusBar,Image,Dimensions,ToastAndroid
} from 'react-native';
import {} from 'react-navigation';

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;

export default class ItemNews extends Component {

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white',margin:2,height:2*(HEIGHT_SCREEN)/10,borderBottomWidth:0.5,borderBottomColor:'gray',
                  flexDirection:'row',marginLeft:5,marginRight:5}}>
                 <Image style={{flex:1}} source={{uri:this.props.Data.LinkImage}}>

                 </Image>
                 <View style={{flex:2}}>
                        <Text style={{flex:1,fontSize:16,fontWeight:'bold',color:'gray',marginLeft:5,marginRight:5}}>{this.props.Data.Title}</Text>
                        <View style={{flex:1}}>
                            <View style={{flex:1,backgroundColor:'rgba(0, 184, 148,1.0)',borderRadius:8,
                                  marginLeft:30,marginRight:30,marginTop:30,marginBottom:5,alignItems:'center',justifyContent:'center'}}>

                            <Text style={{fontSize:14,fontWeight:'bold',color:'white'}}>
                                {'Thời gian cập nhật : ' + this.props.Data.Time}
                            </Text >

                            </View>
                        </View>
                 </View>
            </View>
        )
    }
}