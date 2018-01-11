import { combineReducers } from 'redux';
import layerPost from './reducer_layer';


const  rootReduer =combineReducers({
    layers:layerPost
});

export default rootReduer;