<template>
    <el-container>
        <el-header>
            <NavbarView />
        </el-header>
        <el-main style="background-color: rgb(244,246,249);">
            <router-view />
        </el-main>
    </el-container>

</template>

<script>
import NavbarView from './Navbar/NavbarView.vue';
export default {
    components: { NavbarView },
    name: 'PageLayout'
}
</script>

<style></style>