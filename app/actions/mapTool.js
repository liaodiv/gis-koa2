/**
 * Created by liao on 2018/2/15.
 */
import Extent from 'ol/extent';
import Stroke from "ol/style/stroke";
import Circle from "ol/style/circle";
import Fill from "ol/style/fill";
import Style from "ol/style/style";

export function animate(geometry) {
    const view = window.map.getView();

    let center = getCenter(geometry);
    view.animate({zoom:18},{center:[center[0],center[1]]})
}

function getCenter(geometry) {
    let extent = geometry.getExtent();
    let oo = Extent.getCenter(extent);
    return oo;
}

export function ligter(feature){
    if(window.ligterFeature){
        window.ligterFeature.setStyle();
    }
    window.ligterFeature = feature;
	const ligter = new Style({
		stroke: new Stroke({
			color: '#576bff',
			width: 2
		}),
		fill:new Stroke({
			color:'#9dfff3',
			width:2
		}),
		image: new Circle({
			radius: 7,
			fill: new Fill({
				color: '#97ffe2'
			})
		})
	});
	feature.setStyle(ligter);

}
