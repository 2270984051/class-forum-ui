<template>
    <div class="article-view-container">

        <div class="article-view">
            <v-md-editor :value="data.content" mode="preview"></v-md-editor>
        </div>
        <a-divider />
        <div class="article-view-bottom">
            <div class="article-view-bottom-info">
                <div class="article-view-bottom-info-item">作者: {{ data.Author }}</div>
                <div class="article-view-bottom-info-item">更新时间: {{ data.updateTime }}</div>
                <div class="article-view-bottom-info-item">标签: {{ data.tag }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getArticleById } from '@/api/article/article';

export default {
    mounted() {
        const articleId = this.$route.params.articleId;
        getArticleById(articleId).then(res => {
            if (res.data.code === 1) {
                this.data = {
                    id: res.data.data.id,
                    title: res.data.data.title,
                    Author: res.data.data.authorName,
                    content: res.data.data.content,
                    tag: res.data.data.tag,
                    updateTime: res.data.data.updateTime,
                };
                console.log(this.data);
            } else {
                console.error('获取文章失败:', res.data.message || '未知错误');
                alert('获取文章失败, 请联系管理员');
            }
        }).catch(error => {
            console.error('请求失败:', error);
            alert('网络错误，请稍后重试');
        });
    },
    data() {
        return {
            data: {
                id: '',
                title: '',
                Author: '',
                content: '',
                tag: '',
                updateTime: '',
            },
        };
    },
};
</script>

<style scoped>
.article-view-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    /* 让容器占据整个视口高度 */

}

.article-view {
    /* 你可以根据需要调整这里的样式，例如增加内外边距等 */
    margin-top: 2rem;
    /* 示例：在内容上方添加一些间距 */
    width: 60%;
    border-radius: 10px;
}

/* 其他已有类名的样式可以根据需求调整，这里不再一一列出 */
</style>