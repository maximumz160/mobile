import React, { Component } from 'react';
import {
  Text,TouchableOpacity,Animated,Alert,
  View,StatusBar,Dimensions,AsyncStorage
} from 'react-native';
import {Styles,Icon_CustomBack,Icon_Custom_RightTitle} from '../StyleCustom/Styles'
import {Header,Icon} from 'react-native-elements';
import WebviewCustom from '../modules/WebviewCustom';

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEIGHT_SCREEN = Dimensions.get('window').height;

const IconSave = (funtionSave)=> (
    <TouchableOpacity onPress= {()=> {funtionSave()}}>
        <Icon name='save' color= 'white'/>
    </TouchableOpacity>
)

export default class ContentNews extends Component {
    
    constructor(props){
        super(props);
        this.state={
            scrollY : new Animated.Value(0),
            AutoScroll : false,
            ShowIndicator: true,
        }
        this.Title = '';
        this.ListDataSave = [];
        this.SaveNews = this.SaveNews.bind(this);
        this.GetDataExit = this.GetDataExit.bind(this);
        this.settimeout;
    }

    async GetDataExit(key){
        let GetObject;
        let Data = await AsyncStorage.getItem(key,(error,result)=>{
            GetObject = JSON.parse(result);
            this.ListDataSave.push(GetObject);
        });
    }

    SaveNews(){
        let Data =  this.props.navigation.getParam('Data','Not Data');
        this.Title = Data.Title;
        var i,j;
        let CheckSave = true;
        let CheckExit = false;
        let NumberSave = Math.floor(Math.random()*10000)+1;
            AsyncStorage.getAllKeys((error,keys)=>{
                
                if(keys.length > 0){
                    for(i = 0; i<keys.length;i++){
                        if(keys[i] == 'SAVENEW'+NumberSave) CheckSave = false;
                        this.GetDataExit(keys[i]);
                        
            }
            this.settimeout = setTimeout(()=>{
                this.ListDataSave.map((value,index)=>{
                    if(value.Title == Data.Title) CheckExit = true;
                })
                if(CheckExit){
                    Alert.alert('Thông Báo','Tin này đã được lưu rồi',
                                            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                            { cancelable: false }
                                            )
                }else{
                    if(CheckExit == false){
                        AsyncStorage.setItem('SAVENEW'+NumberSave,JSON.stringify(Data),(error)=> {
                            if(error == null ){
                                Alert.alert('Thông Báo','Đã lưu thành công',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                { cancelable: false }
                                )
                            } 
                        });
                    }
                }
                this.settimeout = clearTimeout();
                if(CheckSave == false)this.SaveNews();
            },500);
            
            // for(j=0 ; j<this.ListDataSave.length - 1 ; j++){
            //     console.log(this.ListDataSave[j].Title);
            //     if(this.ListDataSave[j].Title == Data.Title)CheckExit =true;
            // }
            //console.log(CheckExit);
                // if(CheckSave == true && Check == false){
                //     AsyncStorage.setItem('SAVENEW'+NumberSave,JSON.stringify(Data),(error)=> {
                //                 if(error == null ){
                //                     Alert.alert('Thông Báo','Đã lưu thành công',
                //                     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                //                     { cancelable: false }
                //                     )
                //                 } 
                //             });
                // }else {
                //     if(Check) {
                //                         Alert.alert('Thông Báo','Tin này đã được lưu rồi',
                //                         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                //                         { cancelable: false }
                //                         )
                //     }else this.SaveNews();
                // }
                }else{
                    AsyncStorage.setItem('SAVENEW'+NumberSave,JSON.stringify(Data),(error)=> {
                        if(error == null ){
                            Alert.alert('Thông Báo','Đã lưu thành công',
                            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                            { cancelable: false }
                            )
                        } 
                    });
                }
                console.log('111111111111111');
            });   1
    }

    render(){
        
        const headerHeight= this.state.scrollY.interpolate({
            inputRange: [0,HEADER_SCROLL_DISTANCE],
            outputRange:[HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const MenuOpacity = this.state.scrollY.interpolate({
            inputRange: [0,HEADER_SCROLL_DISTANCE/4,HEADER_SCROLL_DISTANCE/2,HEADER_SCROLL_DISTANCE],
            outputRange: [1,0.75,0.5,0],
            extrapolate : 'clamp'
        })

        const MenuTranslate = this.state.scrollY.interpolate({
            inputRange : [0,HEADER_SCROLL_DISTANCE],
            outputRange : [0,-200],
            extrapolate : 'clamp'
        })
        const Data = this.props.navigation.getParam('Data','Not Data');
        return(
            <View style={{flex:1}}>
                <WebviewCustom AutoScroll={this.state.AutoScroll} source={{uri: Data.Link}} style={{flex:1}}>

                </WebviewCustom>          
                
                <Animated.View style={[Styles.AnimatedTitleContent,{height:headerHeight}]}>
                        <StatusBar backgroundColor='rgba(0, 184, 148,1.0)'/>
                        <Header    backgroundColor='rgba(0, 184, 148,1.0)'
                                   leftComponent={IconSave(this.SaveNews)}
                                   rightComponent = {<TouchableOpacity onPress={()=>{
                                                        this.setState({
                                                            AutoScroll: !this.state.AutoScroll
                                                        })
                                                    }}>
                                                        <Icon size={25} name = {'line-weight'} color='white'/>
                                                    </TouchableOpacity>}
                                   centerComponent={{ text: 'Nội dung', style: Styles.FontHome}}/>
                </Animated.View>
                
                
            </View>
            
        )
    }
}