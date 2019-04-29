/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,Animated,Text,TouchableOpacity,TextInput,
  View,StatusBar,ScrollView,ImageBackground,Dimensions,NetInfo,ToastAndroid,TouchableWithoutFeedback
} from 'react-native';
import {Styles,Icon_Custom} from './StyleCustom/Styles';
import {createDrawerNavigator,DrawerItems,createStackNavigator} from 'react-navigation';
import {Header,Icon} from 'react-native-elements';
import {ConnectComponent} from './Component_Custom/Directory';
import {GetObject,SetLinkAction} from './Object/GetRss'
import ItemNews from './Component_Custom/ItemNews';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {LOAD_DATA,CHANGE_NAVIGATION} from './Redux/Action';
import Drawer from 'react-native-drawer';
import MenuSelect from './Component_Custom/MenuSelect';
import ContentNews from './Component_Custom/ContentNews';
import {fromLeft,fromTop} from 'react-navigation-transitions';
import { YellowBox } from 'react-native';
import SaveNews from './Component_Custom/SaveNews';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


// export const IntervalObject = setInterval(GetObject,10000);
var ShowIndicator = true;

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;



const ContentComponent = (props) => {
  return(
  <ImageBackground opacity={0.2} source={require('./Image/news1.jpg')} style={Styles.Drawer}>
        <View style={[Styles.Container,{backgroundColor:'rgba(53, 59, 72,0.8)'}]}>

            <ImageBackground style={{width:8*(WIDTH_SCREEN/10),height:3*(HEIGHT_SCREEN/10)}} source={require('./Image/news.jpg')}></ImageBackground>
            
            <ScrollView>
                {/* <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: select})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Trang chủ</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: 'DirectoryNews'})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Thời sự</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: 'DirectoryWorld'})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Thế giới</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: 'DirectoryBusiness'})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Kinh Doanh</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: 'DirectorySport'})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Thể Thao</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('Directory',{item: 'DirectortCar'})} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Xe</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {()=> props.navigation.navigate('SaveNews')} style = {Styles.DrawerItem}>
                    <Text style={Styles.DrawerLabelStyleItem}>Tin tức đã lưu</Text>
                </TouchableOpacity>
            </ScrollView>
          
          </View>
  </ImageBackground>  
)}




export class App extends Component {

  constructor(){
    super()
    this.state={
        DataList: [],
        refresh: false,
        loadfirst: false,
        Searched: false
    }

    this.DataSeacrh = [];
    
    this.search = this.search.bind(this);
  }


  _Connect_GetRSS(){
    NetInfo.getConnectionInfo().then(
        (connectionInfo) => {
              if(connectionInfo.type === 'wifi' || 'cellular'){
                  SetLinkAction('https://vnexpress.net/rss/tin-moi-nhat.rss',this.props.dispatch);
                  GetObject();
                }
              if(connectionInfo.type === 'none'){
                NetInfo.addEventListener('connectionChange',this._Connect_GetRSS)
              }
          
          }
      )
    }

  componentWillMount(){
    this._Connect_GetRSS(); 

  }
  componentDidMount() {
    
  }


  componentWillReceiveProps(props){
      if(props.DataList.Data.length > 0){
        ShowIndicator = false;
        this.DataSeacrh = props.DataList.Data;
        this.setState({refresh: !this.state.refresh})
      }
  }

  openControlPanel = () => {
    this._drawer.open()
  };

  search(text){
    let i = 0;
    this.DataSeacrh = [];
    if(this.props.DataList.Data.length > 0 && text.length > 0){
      let Datacheck= this.props.DataList.Data
      for(i = 0;i < this.props.DataList.Data.length ; i++){
        let numberIndex = Datacheck[i].Title.indexOf(text);
        if(numberIndex != -1)   {
          this.DataSeacrh.push(Datacheck[i])
        }
    }
    this.setState({refresh: !this.state.refresh});
  }else {
    this.DataSeacrh = this.props.DataList.Data ;
    this.setState({refresh: !this.state.refresh});

  }
}


  render(){
    return ( 
      <Drawer  
               openDrawerOffset={0.3}
               tapToClose={true}
               ref = {(ref) => this._drawer = ref }
               content={<ContentComponent navigation = {this.props.navigation}/>}>
          <View style={{flex:1}}> 
                <StatusBar backgroundColor='rgba(0, 184, 148,1.0)'/>
                <Header   backgroundColor='rgba(0, 184, 148,1.0)'
                          leftComponent={Icon_Custom(this.openControlPanel)}
                          centerComponent={
                            this.state.Searched ?
                            <View style= {{width:250,height:35, backgroundColor: 'white',
                                           borderRadius:5,alignSelf: 'center',marginHorizontal:5}}>
                                <TextInput underlineColorAndroid={'transparent'} onChangeText= {this.search} style= {{flex:1,fontSize: 10,marginLeft:5}}
                                           placeholder= {'Tìm kiếm tin tức'}/>
                            </View>
                            :
                            <View style= {{alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>VNEXPRESS</Text>
                            </View>
                          }
                          rightComponent={
                            this.state.Searched ? 
                            <TouchableOpacity style= {{padding:2}} onPress={()=>{this.setState({Searched: !this.state.Searched})}}>
                                <Icon size={20} name='cancel' color='white'/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style= {{padding:2}} onPress={()=>{this.setState({Searched: !this.state.Searched})}}>
                                <Icon size={20} name='search' color='white'/>
                            </TouchableOpacity>
                          }
                          />

                
              

                <ScrollView style={{flex:1,marginTop:5,backgroundColor:'rgba(236, 240, 241,1.0)'}}>
                    <MenuSelect dispatch = {this.props.navigation1} NavigationSet={this.props.navigation} />
                    {this.DataSeacrh.map((item,index)=> {
                            return(
                                <TouchableWithoutFeedback key={index} onPress={()=>{
                                    this.props.navigation.navigate('ContentNews',{Data: item});}}>
                                    <View onStartShouldSetResponder = {()=>true}>
                                        <ItemNews Data={item} key={item.Key}></ItemNews>
                                    </View>

                                </TouchableWithoutFeedback>
                            )})}
                
                </ScrollView>

                <View style={Styles.AnimatedTitleContent}>
                  <ActivityIndicator animating={ShowIndicator} style={Styles.Indicator} size="large" color="#0000ff" />
                </View>


        </View> 
     </Drawer> 

    );
  }
}

/**---------------------------------------Connect with Redux---------------------------------------------------- */
const MapStateToProps = (state) => {
   return {
      DataList : state
   }
}

const MapDispatchToProps = (DisPatch) => {
  return {
     dispatch : (Data) => DisPatch(LOAD_DATA(Data)),
     navigation1 : (Data) => DisPatch(CHANGE_NAVIGATION(Data))
  }
}

export const Connect = connect(MapStateToProps,MapDispatchToProps)(App)
 /**-------------------------------------------------------------------------------------------------------------------------- */

export const Component1 = createStackNavigator({
   MainScreen:{
     screen : Connect
   }, 
   Directory:{
    screen: ConnectComponent,
   },
   ContentNews:{
     screen: ContentNews,
   },
   SaveNews:{
     screen: SaveNews
   }
  
},{
  initialRouteName:'MainScreen',
  mode:'modal',
  headerMode:'none',
  //transitionConfig: () => fromTop(1000)
})

