import {LOAD_DATA, INIT_STATE} from './Action'

export const Reduce = (state = INIT_STATE, Action) => {
    console.log(Action);
   switch(Action.type){
       case 'LOAD_DATA': return Object.assign({},state,{ Data : Action.Data})
       case 'CHANGE_NAVIGATION' : return Object.assign({},state,{ item : Action.nameRouter.item})
       default: return state;
   }
}