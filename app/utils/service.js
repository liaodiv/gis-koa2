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
export function login(data) {
	return request({
		url:'/login',
		method:'post',
		data:data
	})
}

export function addLayer(data) {
	return request({
		url:'/ulayer',
		method:'post',
		data:data
	})
}

export function getLayer(id) {
	return request({
		url:`/ulayer?id=${id}`,
		method:'get',
		data:{}
	})
}

export function getLayerId(data) {
	return request({
		url:`/udata?layername=${data.modelname}&layerid=${data.gid}`,
		method:'get',
		data:{}
	})
}