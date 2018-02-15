export function featureTotable(features) {
	const dataList = features.map(value => {
		return {
			...value.properties,geometry:value.geometry
		}

	});
	return dataList;
}

export function sourceToTable(source) {
	console.log(source.getFeatures())
	const data = source
		.getFeatures()
		.map( (feature)=>{
			let obj =  {
				uid:feature.ol_uid,
				...feature.getProperties(),
			};
			delete obj.geometry;
			console.log(obj);
			return obj;
		})
	return data;
	//console.log('sourcedata',data)

}