import request from '@/utils/request'

export function getSearchList(data) {
  return request({
    url: '/user/search/' + data,
    method: 'get',
  })
}