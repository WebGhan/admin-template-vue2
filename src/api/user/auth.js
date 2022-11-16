import request from '@/utils/request'

// 登入
export function login(data) {
  return request({
    url: '/core/auth/login',
    method: 'POST',
    data
  })
}

// 登出
export function logout() {
  return request({
    url: '/core/auth/logout',
    method: 'POST'
  })
}

// 刷新凭证
export function refreshToken() {
  return request({
    url: '/core/auth/token',
    method: 'POST'
  })
}

// 获取用户信息
export function fetchUserInfo() {
  return request({
    url: '/core/auth/me',
    method: 'GET'
  })
}

// 获取权限
export function fetchPermission() {
  return request({
    url: '/core/auth/permission',
    method: 'GET'
  })
}
