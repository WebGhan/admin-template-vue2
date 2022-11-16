import request from '@/utils/request'

// 获取用户列表
export function fetchList(params) {
  return request({
    url: '/core/admin/index',
    method: 'GET',
    params
  })
}

// 获取选项，可供选择用户
export function fetchOptions(params) {
  return request({
    url: '/core/admin/options',
    method: 'GET',
    params
  })
}

// 获取用户详情
export function fetchItem(id) {
  return request({
    url: `/core/admin/${id}/show`,
    method: 'GET'
  })
}

// 创建用户
export function createItem(data) {
  return request({
    url: '/core/admin/store',
    method: 'POST',
    data
  })
}

// 更新用户
export function updateItem(id, data) {
  return request({
    url: `/core/admin/${id}/update`,
    method: 'PUT',
    data
  })
}

// 删除用户
export function deleteItem(id) {
  // return request({
  //   url: `/core/role/${id}/delete`,
  //   method: 'DELETE'
  // })
}

// 重置密码
export function resetPassword(id, data) {
  return request({
    url: `/core/admin/${id}/reset_password`,
    method: 'POST',
    data
  })
}

// 给用户绑定角色
export function bindRole(id, data) {
  return request({
    url: `/core/admin/${id}/role`,
    method: 'POST',
    data
  })
}

// 获取用户分类
export function fetchCategory() {
  return request({
    url: '/core/role/group',
    method: 'GET'
  })
}
