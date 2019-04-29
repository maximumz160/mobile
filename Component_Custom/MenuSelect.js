import React, { Component } from 'react';
import {
  Text,TouchableOpacity,
  View,StatusBar,ScrollView,ImageBackground,Dimensions,NetInfo,ToastAndroid
} from 'react-native';
import {Header,Icon} from 'react-native-elements';
import LinearGradient  from 'react-native-linear-gradient'

export default class MenuSelect extends Component {


    constructor(props){
          super(props);
          this._navigation = this._navigation.bind(this);
    }  

    _navigation = (navigation,select) => {
          if(navigation.state.routeName == 'MainScreen')
          navigation.navigate('Directory',{item: select})
          else {
                 //đang đứng ở màn hình  Directory 
                 this.props.dispatch({item:select}); 

                 //chuyển đến màn hình home
                 if(select == 'Home')navigation.navigate('MainScreen');
            }

    }

    render(){
        return(
            <View style={{flex:1,marginBottom:1,marginTop:1}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        
                          <TouchableOpacity style={{flex:1}} onPress={ () => {this._navigation(this.props.NavigationSet,'Home')}}>

                                <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                                start={{x:0, y:0}} end={{x:1,y:0}} colors={['#2980B9','#6DD5FA']}>

                                            <Icon  name='home' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                            
                                            <Text style={{flex:1,color:'white',
                                            fontWeight:'bold'}}>Trang Chủ</Text>
                                </LinearGradient>  

                          </TouchableOpacity>
                                                                             
                          <TouchableOpacity style={{flex:1}} onPress={ () => { this._navigation(this.props.NavigationSet,'DirectoryNews')}}>

                                <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                                start={{x:0, y:0}} end={{x:1,y:0}} colors={['#f953c6','#b91d73']}>

                                            <Icon  name='airplay' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                            
                                            <Text style={{flex:1,color:'white',
                                            fontWeight:'bold'}}>Thời sự</Text>
                                </LinearGradient> 

                          </TouchableOpacity>
 
                          <TouchableOpacity style={{flex:1}} onPress={ () => { this._navigation(this.props.NavigationSet,'DirectoryWorld')}}>

                          <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                          start={{x:0, y:0}} end={{x:1,y:0}} colors={['#a17fe0','#5D26C1']}>

                                    <Icon  name='language' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                    
                                    <Text style={{flex:1,color:'white',
                                    fontWeight:'bold'}}>Thế giới</Text>
                          </LinearGradient>  

                          </TouchableOpacity>

                    </View>

                    <View  style={{flex:1,flexDirection:'row'}}>
                          <TouchableOpacity style={{flex:1}} onPress={ () => { this._navigation(this.props.NavigationSet,'DirectoryBusiness')}}>

                                <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                                        start={{x:0, y:0}} end={{x:1,y:0}} colors={['#a17fe0','#5D26C1']}>

                                                <Icon  name='business' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                                
                                                <Text style={{flex:1,color:'white',
                                                fontWeight:'bold'}}>Kinh doanh</Text>
                                </LinearGradient> 
                                
                          </TouchableOpacity>                              
                          
                          <TouchableOpacity style={{flex:1}} onPress={() => { this._navigation(this.props.NavigationSet,'DirectorySport')}}>

                                <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                                start={{x:0, y:0}} end={{x:1,y:0}} colors={['#302b63','#5D26C1']}>

                                            <Icon  name='directions-bike' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                            
                                            <Text style={{flex:1,color:'white',
                                            fontWeight:'bold'}}>Thể thao</Text>
                                </LinearGradient>   

                          </TouchableOpacity> 

                          <TouchableOpacity style={{flex:1}} onPress={ () => { this._navigation(this.props.NavigationSet,'DirectortCar')}}>

                                <LinearGradient style={{flex:1,alignItems:'center',justifyContent:'center',borderRadius:10, margin:2}} 
                                                start={{x:0, y:0}} end={{x:1,y:0}} colors={['#2980B9','#6DD5FA']}>

                                            <Icon  name='directions-car' size={50} iconStyle={{color:'white',justifyContent:'center'}}></Icon>
                                            
                                            <Text style={{flex:1,color:'white',
                                            fontWeight:'bold'}}>Xe</Text>
                                </LinearGradient>   
                                
                          </TouchableOpacity> 
                    </View>

            </View>
        )
    }
}
