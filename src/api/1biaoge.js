import request from './request'

function getKindList(data){
	return request({
		method:'get',
		url:'bufanapi/api/admin/kind/list',
		data
	})
}
//删除
function delKind(data){
	return request({
		method:'get',
		url:'bufanapi/api/admin/kind/del',
		data //当key和Value一样时候，直接写key
		// data:data
	})
}
//添加
function addKind(data){
	return request({
			method:'post',
			url:'bufanapi/api/admin/kind/save',
			data
		})
}
//编辑
function saveEditKind(data){
	return request({
		method:'post',
		url:'bufanapi/api/admin/kind/update',
		data
	})
}
export default {
    getKindList,
    delKind,
    addKind,
    saveEditKind
}

//获取列表信息
// export function getKindList(data){
// 	return request({
// 		method:'get',
// 		url:'bufanapi/api/admin/kind/list',
// 		data
// 	})
// }
//删除
// export function delKind(data){
// 	return request({
// 		method:'get',
// 		url:'bufanapi/api/admin/kind/del',
// 		data //当key和Value一样时候，直接写key
// 		// data:data
// 	})
// }
//添加
// export function addKind(data){
// 	return request({
// 			method:'post',
// 			url:'bufanapi/api/admin/kind/save',
// 			data
// 		})
// }
//编辑更新
// export function saveEditKind(data){
// 	return request({
// 		method:'post',
// 		url:'bufanapi/api/admin/kind/update',
// 		data
// 	})
// }