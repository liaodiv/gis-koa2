import {request} from './request';

export function getAll(url) {
	return request({
		url:`/layer?layername=${url}`,
		method:'get',
		data:{}
	})
}

export function getConfig() {
	return request({
		url:'/config',
		method:'get',
		data:{}
	})
}

export function addFeature(data) { /// TODO 测试增加要素的接口
	return request({
		url:'/layer',
		method:'post',
		data:data
	})
}

export function deleteFeature(data) {
	return request({
		url:'/layer',
		method:'delete',
		data:data
	})
}

export function updateFeature(data) {
	return request({
		url:'/layer',
		method:'put',
		data:data
	})

}