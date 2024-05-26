<template>
    <div class="container">
        <a-list item-layout="horizontal" :data-source="FaqData">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.content">
                    <a slot="title" @click="toDetail(item.id)">{{ item.title }}</a>
                    <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <!-- <a-divider /> -->
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>

</template>

<script>
import { getFaqList } from "@/api/faq/faq"

export default {

    async mounted() {
        await this.getList();
    },
    data() {
        return {
            FaqData: [],
        };
    },
    methods: {
        async getList() {
            this.FaqData = [];
            try {
                const res = await getFaqList();
                if (res.data.code === 1) {
                    this.FaqData = res.data.data.map(item => ({
                        id: item.id,
                        title: item.title,
                        content: item.content.slice(0, 50) + '...',
                    }
                    ));
                } else {
                    console.error('数据获取失败');
                }
            } catch (error) {
                console.error('获取问题列表时发生错误', error);
            }
        },
        toDetail(id) {
            this.$router.push({
                path: `/faq/${id}`
            })
        }
    },
};
</script>

<style></style>