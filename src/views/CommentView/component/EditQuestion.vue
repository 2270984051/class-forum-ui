<template>
    <div class="edit-question">
        <div class="edit-question-content">
            <el-row>
                <el-col>
                    <span style="font-weight: bold; font-size: 20px;">问题标题</span>
                    <el-input v-model="questionForm.title" style="width: 30%; margin:10px;"
                        placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="toCommit">提交</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <span style="font-weight: bold; font-size: 20px;">问题标签</span>
                    <el-input v-model="questionForm.tag" style="width: 10%; margin:10px;"
                        placeholder="请输入内容"></el-input>
                </el-col>
            </el-row>

            <MdEditor :content.sync="questionForm.content"></MdEditor>
        </div>
    </div>
</template>

<script>
import { addQuestion } from '@/api/faq/faq'

export default {
    data() {
        return {

            questionForm: {
                tag: '',
                // 初始化content属性
                content: '', // 根据实际情况设定初始值，可以是字符串、对象等
            }

        };
    }, methods: {
        toCommit() {
            alert(this.questionForm.content)
            addQuestion(this.questionForm).then(res => {
                if (res.data.code == 1) {
                    alert('提交成功')
                    this.$router.push('/faq')
                } else {
                    alert('提交失败, 请联系管理员')
                    this.$router.push('/faq')
                }
            })
        },

    }
}
</script>

<style></style>