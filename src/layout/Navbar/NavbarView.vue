<template>
    <div class="page-layout-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            style=" display: flex; justify-content: center;">

            <el-menu-item index="home">
                <router-link to="/" tag="el-menu-item" index="home">首页</router-link>
            </el-menu-item>
            <el-menu-item index="article">
                <router-link to="/article" tag="el-menu-item" index="article">文章</router-link>
            </el-menu-item>
            <el-menu-item index="faq">
                <router-link to="/faq" tag="el-menu-item" index="faq">问答</router-link>
            </el-menu-item>
            <el-menu-item index="news">
                <router-link to="/news" tag="el-menu-item" index="news">资讯</router-link>
            </el-menu-item>
            <el-menu-item index="about"> <router-link to="/about" tag="el-menu-item" index="about">关于</router-link>
            </el-menu-item>

            <div style="margin: 10px;">
                <el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
                <el-button type="primary" @click="toSearch"  style="margin-left: 10px; margin-right: 10px;">搜索</el-button>
                <el-button v-if="token" type="primary" @click="toEdit">创作</el-button>
                <el-button v-if="!token" type="primary" @click="toLogin">登录</el-button>
                <el-button v-if="token" type="primary" @click="toExit">退出</el-button>
            </div>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth'

export default {
    name: 'NavbarView',

    async mounted() {
        this.token = await getToken()
    },

    data() {
        return {
            input: '',
            activeIndex: 'home',// 修改这里，将activeName改为activeIndex
            token: "",
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key; // 在这里也可以更新activeIndex的值，以便与用户的选择保持同步
            console.log(key, keyPath);
        },
        toLogin() {
            this.$router.push('/login');
        },
        toEdit() {
            if (!this.token) {
                this.$message.error('请先登录！');
                return;
            }
            this.$router.push('/edit');
        },
        toExit() {
            removeToken();
            this.$message.success('退出成功！');
            this.$router.push('/login');
        },
        toSearch(){
            this.$router.push('/search?keyword=' + this.input);
        }

    }
}

</script>

<style></style>