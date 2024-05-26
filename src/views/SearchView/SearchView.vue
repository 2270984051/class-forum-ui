<template>
    <div class="search-view" style="height: 100vh; display: flex; flex-direction: column; align-items: center;">
        <div class="search-container" style="width: 60%; ">
            <div class="head"
                style="display: flex;flex-direction: column;  align-items: center; background-color: white;border-radius: 10px; padding: 10px;">
                <div class="search-input" style="width: 60%; ">
                    <a-input-search placeholder="搜索" v-model="input" enter-button @search="onSearch" />
                </div>
            </div>
            <br />
            <div class="search-result" style="background-color: white;border-radius: 10px; padding: 10px;">
                <div class="result-item">
                    <span style="font-size: 20px;">搜索结果 : </span>
                    <a-divider />
                </div>
                <div>
                    <span style="font-size: 20px;">文章 : </span>
                    <a-divider />
                </div>
                <div class="ArticleResult-list">
                    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="ArticleListData">
                        <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                            <a-list-item-meta :description="item.description">
                                <a slot="title" @click="toArticle(item.id)">{{ item.title }}</a>
                            </a-list-item-meta>
                            {{ item.content }}
                        </a-list-item>
                    </a-list>
                </div>
                <div>
                    <a-divider />
                </div>
                <div>
                    <span style="font-size: 20px;">问题 :</span>
                    <a-divider />
                </div>
                <div class="FaqResult-list">
                    <a-list item-layout="horizontal" :data-source="FaqListData">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-list-item-meta :description="item.content">
                                <a slot="title" @click="toDetail(item.id)">{{ item.title }}</a>
                                <a-avatar slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getSearchList } from '@/api/search/search';


// const ArticleListData = [];
// const FaqListData = [];

export default {
    name: 'SearchPage',
    data() {
        return {
            ArticleListData: [],
            FaqListData: [],
            searchResult: {},
            input: '',
        };
    },
    mounted() {
        // 当组件挂载时，获取并使用查询参数
        const keyword = this.$route.query.keyword;
        this.input = keyword;
        if (keyword) {
            console.log('搜索关键词:', keyword);
            // 进行搜索操作，比如调用API、过滤数据等
            this.onSearch();
        }
    },
    methods: {
        onSearch() {
            getSearchList(this.input).then((res) => {
                if (res.data.code === 1) {
                    this.ArticleListData = res.data.data.articleList.map(item => ({
                        id: item.id,
                        title: item.title,
                        description: item.tag,
                        content: item.content.slice(0, 50) + '...',
                    }));
                    this.FaqListData = res.data.data.faqList.map(
                        item => ({
                            id: item.id,
                            title: item.title,
                            content: item.content.slice(0, 50) + '...',
                        })
                    )
                } else {
                    console.error('数据获取失败');
                }
            })
        },
        toInfo() {
            this.$router.push({ path: '/info' });
        },
        toArticle(id) {
            this.$router.push({ path: `/article/${id}` });
        },
        toDetail(id) {
            this.$router.push({
                path: `/faq/${id}`
            })
        }
    }
};
</script>

<style></style>