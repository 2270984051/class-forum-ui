<template>
    <div class="container" style="margin-top: 20px;height: 100vh;">
        <div class="top">
        </div>
        <div class="middle" style=" border-radius: 10px;  ">
            <el-row>
                <el-col :span="18" :offset="4" style="width: 60%;">
                    <div style="background-color: white;border-radius: 10px; padding: 20px;">
                        <ArticleList />
                    </div>

                </el-col>
            </el-row>
        </div>
        <div class="bottom">
        </div>


    </div>
</template>

<script>
import ArticleList from '../ArticleView/component/ArticleList.vue';
export default {
    components: {
        ArticleList
    },

}
</script>

<style></style>