<template>

    <div class="FaqPage" style="width: 60%;height: 100vh; margin: auto;">

        <div style=" margin-top: 20px; display: flex; flex-direction: column;align-content:center">

            <div class="question-head" style=" background-color: white; padding: 20px;border-radius: 10px;">
                <div class="question-tag">
                    <a-tag color="blue">{{ questionData.tag }}</a-tag>
                </div>

                <div class="question-title">
                    <!-- <h1>answer-title</h1> -->
                    <span style="font-weight:bold; font-size:35px;">{{ questionData.title }}</span>
                </div>
                <div class="question-description" style="margin: 10px ;">
                    <span style="font-weight:bold; font-size:20px;">{{ questionData.content }}</span>
                </div>

                <div class="question-button">
                    <a-button type="primary" @click="toAddAnswer" style="margin-right: 10px;">添加回答</a-button>
                    <!-- <a-button @click="toEditAnswer">编辑回答</a-button> -->
                </div>
            </div>
            <br>

            <div class="answer-list" style="background-color: white;padding: 20px; border-radius: 10px;">
                <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">

                    <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                        <a-list-item-meta>
                            <a slot="title">{{ item.authorName }}</a>
                            <a-avatar slot="avatar" :src="item.avatar" />
                        </a-list-item-meta>

                        <div class="article-view">
                            <v-md-editor :value=item.content mode="preview"></v-md-editor>
                        </div>
                    </a-list-item>

                </a-list>
            </div>
        </div>
    </div>
</template>

<script>
import { getQuestion, getAnswerList } from "@/api/faq/faq"

const listData = [];


export default {
    async mounted() {
        const faqId = this.$route.params.faqId;
        await this.getQuestion(faqId);
        await this.getList(faqId);
    },

    data() {
        return {
            questionData: [],
            listData,
            pagination: {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
            },

        };
    }, methods: {
        async getQuestion(faqId) {
            try {
                const res = await getQuestion(faqId);
                if (res.data.code === 1) {
                    this.questionData = res.data.data
                }
            } catch (error) {
                console.error('获取回答列表时发生错误', error);
            }
        },
        async getList(faqId) {
            this.listData = [];
            try {
                const res = await getAnswerList(faqId);
                if (res.data.code === 1) {
                    this.listData = res.data.data.map(item => ({
                        id: item.id,
                        authorName: item.authorName,
                        content: item.content,
                        avatar: item.avatar,
                    }
                    ));
                } else {
                    console.error('数据获取失败');
                }
            } catch (error) {
                console.error('获取回答列表时发生错误', error);
            }
        },
        toAddAnswer() {
            this.$router.push({
                path: `/faq/answer/add/${this.$route.params.faqId}`
            })
        }
    },
};
</script>
<style></style>