import Draw from 'ol/interaction/draw';
import Select from 'ol/interaction/select';
import {ADD_GEOMETRY} from '../constants/model';

export default {
	interaction : null,
	startDraw:function (layer,callback) {
		console.log(layer.getProperties());
		this.stop();
		this.interaction = new Draw({
			source:layer.getSource(),
			type:'Point',
		});
		this.interaction.on('drawend',function (e) {
			console.log('drawend',e.feature.getGeometry())
			callback(ADD_GEOMETRY);
		})
		window.map.addInteraction(this.interaction);
	},
	stop:function () {
		if(this.interaction !== null) {
			window.map.removeInteraction(this.interaction);
		}
		this.interaction = null;
	},
	startSelect:function (layer) {
		this.stop();
		this.interaction = new Select({
			layers:[layer]
		});
		window.map.addInteraction(this.interaction);
	}

}

function startDraw(layer){
	let draw = new Draw({
		source:layer.getSource(),
		type:'Point'
	})
	window.map.addInteraction(draw);
}