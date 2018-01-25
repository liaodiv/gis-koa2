function Togeojson(result) {
	const data = result.dataValues;
	const geostr = data.geom;
	delete data['geom'];
	const feature={
		type:'Feature',
		geometry:geostr,
		properties:data
	}
	return feature;
}


function FeaturesToCollection(dataList) {
	const geoCollection = {
		type:"FeatureCollection",
		crs: {
			type: 'name',
			properties: {
				'name': 'EPSG:4326'
			}
		},
		features:[]
	};
	geoCollection.features = dataList;
	/*dataList.forEach( datai => {
		geoCollection.features.push(datai)
	})*/
	return geoCollection;
}

module.exports={Togeojson,FeaturesToCollection}