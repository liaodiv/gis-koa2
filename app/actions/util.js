export function featureTotable(features) {
	const dataList = features.map(value => {
		return {
			...value.properties,geometry:value.geometry
		}

	});
	return dataList;
}