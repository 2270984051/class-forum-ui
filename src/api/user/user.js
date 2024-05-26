import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/user/userinfo',
    method: 'get',
  })
}

export function updateInfo(data)  {
  return request({
    url: '/user/updateInfo',
    method: 'post',
    data
  })
}