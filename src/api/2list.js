import request from './request'

function getGoodsList(data){
	return request({
		method:'get',
		url:'bufanapi/api/admin/goods/list',
		data
	})
}
//删除
function delKind(data){
	return request({
		method:'get',
		url:'bufanapi/api/admin/goods/del',
		data //当key和Value一样时候，直接写key
		// data:data
	})
}
//添加
function addKind(data){
	return request({
			method:'post',
			url:'bufanapi/api/admin/goods/save',
			data
		})
}
//编辑
function saveEditKind(data){
	return request({
		method:'post',
		url:'bufanapi/api/admin/goods/update',
		data
	})
}
export default {
    getGoodsList,
    delKind,
    addKind,
    saveEditKind
}
