import React, { Component } from 'react';
import {
  Text,
  View,StatusBar,ScrollView,Animated,TouchableWithoutFeedback,ActivityIndicator
} from 'react-native';
import {Styles,Icon_Custom} from '../StyleCustom/Styles';
import {Header,Icon} from 'react-native-elements';
import {GetObject,SetLinkAction} from '../Object/GetRss';
import ItemNews from './ItemNews';
import {connect} from 'react-redux';
import {LOAD_DATA,CHANGE_NAVIGATION} from '../Redux/Action';
import MenuSelect from '../Component_Custom/MenuSelect';
import {createStackNavigator} from 'react-navigation';
import {IntervalObject} from '../App';
import {fromTop} from 'react-navigation-transitions';
import ContentNews from './ContentNews';
import {Icon_CustomBack,Icon_Home} from '../StyleCustom/Styles'

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function GetTilteData(RouteName,Action){

    switch(RouteName)
    {
        case 'DirectoryNews':
        {   
            if(typeof Action != "undefined")
            {
                SetLinkAction('https://vnexpress.net/rss/thoi-su.rss',Action);
                GetObject();
            }
            return 'Thời Sự' };
        case 'DirectoryWorld': 
        {   
            if(typeof Action != "undefined")
            {
                SetLinkAction('https://vnexpress.net/rss/the-gioi.rss',Action);
                GetObject();
            }
        return 'Thế Giới' };

        case 'DirectoryBusiness': 
        {   
            if(typeof Action != "undefined")
            {
                SetLinkAction('https://vnexpress.net/rss/kinh-doanh.rss',Action);
                GetObject();
            }

        return 'Kinh Doanh' };
        case 'DirectorySport': 
        {   
            if(typeof Action != "undefined")
            {
                SetLinkAction('https://vnexpress.net/rss/the-thao.rss',Action);
                GetObject();
            }

        return 'Thể Thao' };
        case 'DirectortCar': 
        {   
            if(typeof Action != "undefined")
            {
                SetLinkAction('https://vnexpress.net/rss/oto-xe-may.rss',Action);
                GetObject();
            }
        return 'Xe' };

    }
}


var Refresh = false; // biến làm tươi lại danh sách sau khi chọn các chủ đề tin tức 


class Component_Custom  extends Component {
   
    
    constructor(){
        super()
        this.state={
            TitleHeader : '',
            RouteName: '',
            DataList : [],
            scrollY: new Animated.Value(0),
            Refresh: false
        }
        this.myScroll= React.createRef();
    }

    componentWillMount(){
        let title = this.props.navigation.getParam('item','null');
        if(title !== 'null')
        this.setState({TitleHeader: GetTilteData(title,this.props.LoadData)});
        
        
    }

    componentWillReceiveProps(props){
        if(props.DataList.hasOwnProperty('item')){
            if(this.state.RouteName !== props.DataList.item){
                this.setState({TitleHeader: GetTilteData(props.DataList.item,this.props.LoadData)})
                this.setState({RouteName:props.DataList.item})
            }
        }
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

        return(
            
            <View style={{flex:1}}>
                
                 <ScrollView style={{flex:1}} 
                  ref = {this.myScroll}
                  onScroll={Animated.event(
                         [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                     )}>
                     <View style={{flex:1,marginTop:HEADER_MAX_HEIGHT+10}}>
                            {
                                this.props.DataList.Data.map((item,index)=>
                                (
                                    <TouchableWithoutFeedback key={index} onPress={()=>{
                                        this.props.navigation.navigate('ContentNews',{Data: item});}}>
        
                                        <View onStartShouldSetResponder = {()=>true}>
                                            <ItemNews Data={item} key={item.Key}></ItemNews>
                                        </View>
        
                                    </TouchableWithoutFeedback>
                                ))
                            }
                     </View>
                 </ScrollView>

                 <Animated.View style={Styles.AnimatedView}>
                    
                    <Animated.View style={[Styles.AnimatedView,{height : headerHeight}]}>
                        <StatusBar backgroundColor='rgba(0, 184, 148,1.0)'/>
                        <Header backgroundColor='rgba(0, 184, 148,1.0)'
                                leftComponent={Icon_Home(this.props.navigation)}
                                centerComponent={{ text: this.state.TitleHeader, style: Styles.FontHome}}
                                //rightComponent={{ icon: 'home',color:'white'}}
                                />
                    </Animated.View>

                    <Animated.View style={[Styles.AnimatedView2,{backgroundColor: 'rgba(0, 184, 148,0.8)'},
                                   {opacity : MenuOpacity,transform: [{translateY: MenuTranslate}]}]

                                   }>
                            <MenuSelect dispatch = {this.props.navigation1} NavigationSet={this.props.navigation}/>
                    </Animated.View>

                    
                 </Animated.View>


                
            </View>
        )
    }
}

const MapStateToProps = (state) =>{
    return {
        DataList : state
    }
}

const MapDispatchToProps = (DisPatch) => {
    return {
        LoadData : (Data) => DisPatch(LOAD_DATA(Data)),
        navigation1 : (Data) => DisPatch(CHANGE_NAVIGATION(Data))
    }
}

export const ConnectComponent = connect(MapStateToProps,MapDispatchToProps)(Component_Custom)

export const StackSelectItem = createStackNavigator({
    Direcstory:{
      screen : ConnectComponent
    },
    ShowContent:{
      screen: ContentNews
    }
 },{
   mode:'modal',
   headerMode:'none',
   transitionConfig: () => fromTop(1000)
 })
 