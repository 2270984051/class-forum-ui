<template>
    <div class="container" style=" margin-top: 20px; width: 60%;height: 100vh; margin: auto;">

        <div class="header"
            style="height: 50px; display: flex; justify-content: flex-start; margin-bottom: 20px; background-color: white; border-radius: 10px;">
            <a-button type="primary" @click="toAddQuestion" style="margin: 10px;">提问</a-button>
        </div>
        <div class="FaqList"
            style=" background-color: white; border-radius: 10px; display: flex; flex-direction: column;align-content:center">
            <FaqList />
        </div>

    </div>
</template>

<script>
import FaqList from './component/FaqList.vue'
export default {
    components: { FaqList },
    data() {
        return {

        }
    },
    methods: {
        toAddQuestion() {
            this.$router.push('/faq/question/add')
        }
    },
}
</script>

<style></style>