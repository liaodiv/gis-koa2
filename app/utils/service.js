import {request} from './request';

export function getAll() {
	return request({
		url:'/allPoint',
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