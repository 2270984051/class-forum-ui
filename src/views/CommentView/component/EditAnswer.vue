<template>
    <div style="display: flex;  display: flex; justify-content:center; margin-bottom: 20px; ">
        <div class="container" style="width: 80%;">

            <div class="head"
                style="display: flex;justify-content: flex-end; height: 60px; background-color: white; margin-bottom: 10px;">
                <el-button type="primary" @click="toCommit" style="width: 100px;margin: 5px;">提交</el-button>
            </div>

            <div class="body">
                <MdEditor :content.sync="answerForm.content"></MdEditor>
            </div>
        </div>
    </div>
</template>

<script>
import { addAnswer } from '@/api/faq/faq'

export default {
    data() {
        return {

            answerForm: {
                faqId: '',
                // 初始化content属性
                content: '', // 根据实际情况设定初始值，可以是字符串、对象等
            }

        };
    }, methods: {
        toCommit() {
            this.answerForm.faqId = this.$route.params.faqId
            alert(this.answerForm.content)
            addAnswer(this.answerForm).then(res => {
                if (res.data.code == 1) {
                    alert('提交成功')
                    this.$router.push('/faq/' + this.$route.params.faqId)
                } else {
                    alert('提交失败, 请联系管理员')
                    this.$router.push('/faq/' + this.$route.params.faqId)
                }
            })
        },

    }
}
</script>

<style></style>