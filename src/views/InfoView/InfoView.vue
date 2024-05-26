<template>
    <div class="container" style="display: flex;justify-content: center;">
        <div style="width: 80%;">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>个人信息</span>
                </div>
                <div class="text item">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-avatar :size="100" :src="infoForm.avatar"></el-avatar>
                        </el-col>
                        <el-col :span="14">
                            <span style="font-weight: bold; font-size: 20px;">用户: {{ infoForm.username }}</span>
                            <br>
                            <span style="font-weight: bold; font-size: 20px;">邮箱: {{ infoForm.email }}</span>
                            <br>
                            <span style="font-weight: bold; font-size: 20px;">手机: {{ infoForm.phone }}</span>
                        </el-col>
                        <el-col :span="6" style="display: flex; justify-content: flex-end; ">
                            <el-button type="primary" @click="toEditInfo">编辑信息</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <br>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <div>
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" tab="文章">
                                <ArticleView />
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="问答" force-render>
                                Content of Tab Pane 2
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="关注">
                                Content of Tab Pane 3
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </el-card>
        </div>

        <div class="dialog-editInfo">
            <a-modal v-model="visible" title="编辑信息" @ok="handleOk">
                <a-form-model :model="infoForm" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="头像">

                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :headers="headers" name="file" :on-error="handleError">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                    </a-form-model-item>

                    <a-form-model-item label="用户名">
                        <a-input v-model="infoForm.username" />
                    </a-form-model-item>
                    <a-form-model-item label="手机号">
                        <a-input v-model="infoForm.phone" />
                    </a-form-model-item>
                    <a-form-model-item label="邮箱">
                        <a-input v-model="infoForm.email" />
                    </a-form-model-item>

                </a-form-model>
            </a-modal>
        </div>

    </div>

</template>

<script>
import ArticleView from '../ArticleView/component/ArticleList.vue';
import { getUserInfo, updateInfo } from "@/api/user/user";
import { getToken } from "@/utils/auth";




export default {
    components: { ArticleView },



    mounted() {
        this.headers.token = getToken();
        getUserInfo().then((result) => {
            if (result.data.code === 1) { // 确保result.data存在
                this.infoForm = result.data.data;
            }
        })
    },

    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            infoForm: {
                username: '',
                phone: '',
                email: '',
                avatar: '',
            },
            headers: {
                token: ''
            },
            visible: false,
            imageUrl: '',
        }
    },
    methods: {
        callback(key) {
            console.log(key);
        },
        getArticle() {

        },
        toEditInfo() {
            this.visible = true;
        },

        handleOk() {
            updateInfo(this.infoForm).then((result) => {
                if (result.data.code === 1) {
                    alert('修改成功')
                } else {
                    alert('修改失败')
                }
            })
            this.visible = false;

        },
        handleAvatarSuccess(res, file) {
            alert(res.data.url)
            this.imageUrl = res.data.url;
            this.infoForm.avatar = res.data.url;
        },
        handleError(err) {
            console.log(err);
        },


    }
}
</script>

<style>
.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>