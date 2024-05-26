<template>
    <div class="list">
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                <a-list-item-meta :description="item.description">
                    <a slot="title" @click="toArticle(item.id)">{{ item.title }}</a>
                </a-list-item-meta>
                {{ item.content }}
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { getArticleList } from '@/api/article/article';

const dataList = [];


export default {

    async mounted() {
        await this.fetchData(); // 确保数据加载完成后再进行后续操作
    },

    data() {
        return {
            activeName: 'first',
            listData: [],
            dataList,
            pagination: {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 8,
            },

        };
    },
    methods: {
        async fetchData() {
            this.listData = []; // 清空现有数据
            try {
                const res = await getArticleList();
                if (res.data.code === 1) {
                    this.listData = res.data.data.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.tag,
                        content: item.content.slice(0, 50) + '...',
                    }));
                } else {
                    console.error('数据获取失败');
                }
            } catch (error) {
                console.error('获取文章列表时发生错误', error);
            }
        },
        toInfo() {
            this.$router.push({ path: '/info' });
        },
        toArticle(id) {
            this.$router.push({ path: `/article/${id}` });
        },
    }
}
</script>

<style></style>