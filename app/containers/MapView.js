import React, {Component} from 'react';
import Map from 'ol/Map';
import View from 'ol/view';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Proj from 'ol/proj';
import Control from 'ol/control';
import Scale from 'ol/control/scaleline';
import MouseP from 'ol/control/mouseposition';
import Coordinate from 'ol/coordinate';
import Group from 'ol/layer/group';
import layerGroup from './LayerGroup';
class MapView extends Component {
    constructor() {
        super();
        window.map = null;
        this.view = null;
    }
    render() {
        return (<div id="map"></div>);
    }
    componentDidMount() {
        this.view = new View({
            center: [114.3924,30.5234],
            zoom: 17,
            projection:Proj.get('EPSG:4326')
        });
        window.map = new Map({
            layers: [
                new Group({
                    'title':'Base maps',
                    layers:[new Tile({
                        source: new OSM()
                    })]
                }),
                layerGroup.Layers
            ],
            loadTilesWhileAnimating: true,
            target: 'map',
            view: this.view,
            controls: Control.defaults().extend(
                [
                    new Scale(),
                    new MouseP(
                        {
                            undefinedHTML: 'None',
                            projection: 'EPSG:4326',
                            coordinateFormat: Coordinate.createStringXY(4),
                            className: 'ol-mouse-position'
                        }
                    )
                ]

            )
        });
    }
}
export default MapView;