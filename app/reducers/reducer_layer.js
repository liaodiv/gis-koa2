
import LayerGroup from '../containers/LayerGroup';
export default function (state = [],action) {
    switch (action.type){
        case 'FETCH_GET':
            console.log(action.payload)
            LayerGroup.addLayer(action.payload.data);
            return [action.payload.data.data,...state];
        default:
            return state;
    }
}