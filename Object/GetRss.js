import * as rssParser from 'react-native-rss-parser';
import {ToastAndroid} from 'react-native';

var DOMParser = require('react-native-html-parser').DOMParser;
var NumberKey= 0;

var LINK_GET_RSS = null;
var ACTION_ADD_DATA = null;

var HanldJSon = (Data) => {

  let IndexStarHerf = Data.description.indexOf('http');
  let IndexStarImage = Data.description.lastIndexOf('http');
  let IndexEndHerf = Data.description.indexOf('">');
  let IndexEndImage = Data.description.lastIndexOf('" >');
  if(Data.description.slice(IndexStarHerf,IndexEndHerf) !== undefined){
    let DataHerf = Data.description.slice(IndexStarHerf,IndexEndHerf);
    let DataImage = Data.description.slice(IndexStarImage,IndexEndImage);

    let GetTime = Data.published.slice(17,22);

    let DataAdd = {
        Key: NumberKey,
        Link : DataHerf,
        LinkImage : DataImage,
        Title : Data.title,
        Time : GetTime
    }
   return DataAdd;
  }else return null; 
}


export function GetObject(){

        if(LINK_GET_RSS === null || ACTION_ADD_DATA === null) return;
        console.log(LINK_GET_RSS);
        let DataList = [];
        fetch(LINK_GET_RSS)
        .then((response) => (response.text()))
        .then((response) => (rssParser.parse(response)))
        .then((rss) => {
            rss.items.forEach((element,i) => {
                if(i <= 9){
                let Data = HanldJSon(element);
                if(Data != null)
                DataList.push(Data)
                NumberKey+=1;
            }
            });
            
            ACTION_ADD_DATA(DataList)
        }).catch((error)=>{console.log(error); ACTION_ADD_DATA([])})
}

export const SetLinkAction = (LinkRss,Action) =>{
    console.log(LinkRss)
   LINK_GET_RSS = LinkRss;
   ACTION_ADD_DATA = Action;
}


