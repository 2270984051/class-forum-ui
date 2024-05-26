import request from '@/utils/request'

export function addArticle(data) {
    return request({
        url: '/user/article/add',
        method: 'post',
        data,
    })
}

export function getArticleList() {
    return request({
        url: '/user/article/list',
        method: 'get',
    })
}


export function getArticleById(id) {
    return request({
        url: '/user/article/' + id,
        method: 'get',  
    })
}

export function getTop10(){
    return request({
        url: '/user/article/top10',
        method: 'get',
    })
}