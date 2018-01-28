import Draw from 'ol/interaction/draw';

export default {
	interaction : null,
	startDraw:function (layer) {
		this.interaction = new Draw({
			source:layer.getSource(),
			type:'Point'
		});
		window.map.addInteraction(this.interaction);
	},
	stop:function () {
		if(this.interaction !== null) {
			window.map.removeInteraction(this.interaction);
		}
		this.interaction = null;
	}

}

function startDraw(layer){
	let draw = new Draw({
		source:layer.getSource(),
		type:'Point'
	})
	window.map.addInteraction(draw);
}