import axios from 'axios';
import lodash from 'lodash';

const  ROOT_URL='api';
const fetchData = (options) => {
	let {
		method = 'get', // 创建请求时使用的方法，默认为 get
		data, // 传入请求参数
		// fetchType,
		url,
	} = options;

	// 对数据进行深拷贝，防止使用过程中对数据进行修改
	const cloneData = lodash.cloneDeep(data);

	// 加上域名，拼接 URL
	// axios 中的 URL 是用于请求的服务器 URL
	// axios.baseUrl 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
	url = `${ROOT_URL+url}`;


	// 根据请求类型，进行请求
	switch (method.toLowerCase()) {
		case 'get':
			console.log('request get');
			console.log(cloneData);
			return axios.get(url, cloneData);
		case 'post':
			console.log('request post');
			console.log(cloneData);
			return axios.post(url, cloneData);
		case 'delete':
			return axios.delete(url, {
				data: cloneData,
			});
		case 'put':
			console.log('request put');
			console.log(cloneData);
			return axios.put(url, cloneData)
		case 'patch':
			return axios.patch(url, cloneData)
		default:
			return axios(options);
	}
}

export function request (options) {
	return fetchData(options).then((response) => {
		console.log('axios call back')
		console.log(response);
		// 对请求返回结果进行解析
		let { data }  = response;
		if (data.code === 1) {
			// 请求成功，且正确返回数据，直接返回需要的结果
			return Promise.resolve({
				success: true,
				message: data.message,
				...data
			});
		} else if (data.code === -1) {
			// 请求成功，但是返回数据有情况
			return Promise.reject({
				success: false,
				errorMessage: data.message,
			});
		}
	}).catch((error) => {
		console.log('axios call back error')
		console.log(error);
		return Promise.reject({
			success: false,
			errorMessage: error
		});
	})
}