import request from '@/utils/request'

export function getFaqList() {
  return request({
    url: '/user/faq/list',
    method: 'get'
  })
}

export function addQuestion(data) {
  return request({
    url: '/user/faq/question/add',
    method: 'post',
    data
  })
}

export function getQuestion(id) {
  return request({
    url: '/user/faq/Info/' + id,
    method: 'get'
  })
}

export function getAnswerList(id) {
  return request({
    url: '/user/faq/answer/' + id,
    method: 'get',
  })
}

export function addAnswer(data) {
  return request({
    url: '/user/faq/answer/add',
    method: 'post',
    data
  })
}