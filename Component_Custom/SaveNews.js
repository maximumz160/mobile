import React, { Component } from 'react';
import { View, Text,StatusBar,AsyncStorage,FlatList,TouchableOpacity } from 'react-native';
import {Header,Icon} from 'react-native-elements';
import ItemNews from './ItemNews';

export default class SaveNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.DataSave = [];
    this.getData = this.getData.bind(this);
  }

  getData(error,result){
                let Data = JSON.parse(result);
                this.DataSave.push(Data);
  }

  componentWillMount(){
    var i;
    AsyncStorage.getAllKeys((error,keys)=>{
        for(i = 0; i<keys.length;i++){
            AsyncStorage.getItem(keys[i],this.getData)
        }
    }
    )
  }

  render() {
      console.log(this.DataSave)
    return (
        <View style={{flex:1}}>
                <StatusBar backgroundColor='rgba(0, 184, 148,1.0)'/>
                <Header    backgroundColor='rgba(0, 184, 148,1.0)'
                           centerComponent={{ text: 'Các tin tức đã lưu', style: {
                                                                                    fontWeight: 'bold',
                                                                                    fontSize:20,
                                                                                    color:'white'}}}/>
                
                <FlatList style={{flex:1}} data = {this.DataSave} 
                            renderItem={(item,index)=> {
                                return(
                                <TouchableOpacity key={index} onPress={()=>{this.props.navigation.navigate('ContentNews',{Data: item.item});}}>
                                        <ItemNews Data={item.item} key={item.Key}></ItemNews>
                                </TouchableOpacity>
                                )}}>
                            }}>
                
                </FlatList>
        </View>
    );
  }
}
