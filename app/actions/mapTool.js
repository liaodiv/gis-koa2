/**
 * Created by liao on 2018/2/15.
 */
import Extent from 'ol/extent';

export function animate(geometry) {
    const view = window.map.getView();

    let center = getCenter(geometry);
    view.animate({zoom:16},{center:[center[0],center[1]]})
}

function getCenter(geometry) {
    let extent = geometry.getExtent();
    let oo = Extent.getCenter(extent);
    return oo;
}
