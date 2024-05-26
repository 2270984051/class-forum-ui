<template>
    <div class="app-container">
        <el-row>
            <el-col>
                <span style="font-weight: bold; font-size: 20px;">文章标题</span>
                <el-input v-model="articleForm.title" style="width: 30%; margin:10px;" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="toCommit">提交</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <span style="font-weight: bold; font-size: 20px;">文章标签</span>
                <el-input v-model="articleForm.tag" style="width: 10%; margin:10px;" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>

        <MdEditor :content.sync="articleForm.content"></MdEditor>
    </div>
</template>

<script>
import { addArticle } from '@/api/article/article';

export default {
    data() {
        return {

            articleForm: {
                // 初始化content属性
                content: '', // 根据实际情况设定初始值，可以是字符串、对象等
                //    blog: '',
                title: '',
                tag:'',
            }

        };
    },
    methods: {
        toCommit() {
            alert(this.articleForm.content)
            addArticle(this.articleForm).then(res => {
                if (res.data.code == 1) {
                    alert('提交成功')
                    this.$router.push('/')
                } else {
                    alert('提交失败, 请联系管理员')
                    this.$router.push('/')
                }
            })
        },

    }
}
</script>

<style></style>