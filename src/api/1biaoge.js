import request from './request'
//获取列表信息
export function getKindList(){
	return request({
		method:'get',
		url:'bufanapi/api/admin/kind/list'
	})
}
//删除
export function delKind(id,type){
	return request({
		method:'get',
		url:'bufanapi/api/admin/kind/del',
		data:{
			id,//当key和Value一样时候，直接写key
			type
		}
	})
}
//添加
export function addKind(data){
	return request({
			method:'post',
			url:'bufanapi/api/admin/kind/save',
			data
		})
}
//编辑更新
export function saveEditKind(data){
	return request({
		method:'post',
		url:'bufanapi/api/admin/kind/update',
		data
	})
}