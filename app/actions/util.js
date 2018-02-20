export function featureTotable(features) {
	const dataList = features.map(value => {
		let obj ={
            ...value.properties
		};
		delete obj.geometry;
		return obj;

	});
	return dataList;
}

export function sourceToTable(source) {
	const data = source
		.getFeatures()
		.map( (feature)=>{
			let obj = {
				uid:feature.getId(),
				...feature.getProperties()
			}
			delete obj.geometry;
			return obj;
		})
    console.log('sourcedata',data)
	return data;


}