<template>
    <div class="container" style="margin-left: 10%;height: 100vh;">
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-left">
                    <div class="card-container" style=" padding: 20px; border-radius: 10px; background-color: white;">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="知识空间" name="first">
                                <ArticleList />
                            </el-tab-pane>
                            <el-tab-pane label="日常管理" name="second"></el-tab-pane>
                            <el-tab-pane label="通知" name="third"></el-tab-pane>
                        </el-tabs>

                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-right">
                    <div style="padding:30px">

                        <a-card title="top10" style="width: 300px ; margin: 10px;">
                            <div v-for="(article, index) in topArticles" :key="index">
                                <a slot="title" @click="toArticle(article.id)" style="margin-bottom: 20px;">{{
                                    article.title }}</a>
                                <!-- 根据实际返回的数据结构和需求调整 -->
                            </div>
                        </a-card>

                        <a-card style="width: 300px ; margin: 10px;">
                            <p>我的文章</p>
                            <p>我的收藏</p>
                            <p>我的提问</p>
                            <el-link type="primary" @click="toInfo">我的信息</el-link>
                            <p>寻求帮助</p>
                        </a-card>

                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ArticleList from '../ArticleView/component/ArticleList.vue';
import { getTop10 } from '../../api/article/article';


export default {
    components: { ArticleList },

    async mounted() {
        this.fetchTopTenArticles(); // 组件挂载后发起请求
    },

    data() {
        return {
            topArticles: [],
            activeName: 'first',
            pagination: {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 8,
            },
            actions: [
                { type: 'star-o', text: '156' },
                { type: 'like-o', text: '156' },
                { type: 'message', text: '2' },
            ],
        };

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        toInfo() {
            this.$router.push({
                path: '/userInfo',
            });
        },
        async fetchTopTenArticles() {
            try {
                getTop10().then(res => {
                    // 处理获取到的数据
                    if (res.data.code === 1) {
                        this.topArticles = res.data.data; // 将获取到的数据赋值给data中的topArticles
                    } else {
                        console.error('Failed to fetch top articles:', res.statusText);
                    }
                })

            } catch (error) {
                console.error('Error fetching top articles:', error);
            }
        },

        toArticle(id) {
            this.$router.push({ path: `/article/${id}` });
        }
    }
};
</script>

<style></style>