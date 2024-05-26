<template>
    <div class="login">
        <div class="mylogin" align="center">
            <h2>登录</h2>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
                <el-form-item label="" prop="username" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-s-custom"> </span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" placeholder="账号" v-model="loginForm.username">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-lock"> </span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" type="password" placeholder="密码"
                                v-model="loginForm.password"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="margin-top: 55px">
                    <el-button type="primary" round class="submitBtn" @click="submitForm">登录
                    </el-button>
                </el-form-item>
                <div class="unlogin">
                    <router-link :to="{ name: 'forgetpwd' }">忘记密码?</router-link>
                    |
                    <router-link :to="{ name: 'register' }" target="_blank">
                        注册新账号
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>


<script>
import { mapMutations } from "vuex";
import { login } from "@/api/user/user";
import { setToken, } from "@/utils/auth";



export default {
    data: function () {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            loginRules: {
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
            token: "",
        };
    },

    methods: {
        ...mapMutations(["changeLogin"]),
        submitForm() {
            const username = this.loginForm.username;
            const password = this.loginForm.password;
            if (!username) {
                return this.$message({
                    type: "error",
                    message: "账号不能为空！",
                });
            }
            if (!password) {
                return this.$message({
                    type: "error",
                    message: "密码不能为空！",
                });
            }
            console.log("用户输入的账号为：", username);
            console.log("用户输入的密码为：", password);

            //调用登录后端接口
            login(this.loginForm).then((result) => {
                console.log(result)
                if (result.data.code == 1) {
                    //    alert(result.data.data.token);
                    setToken(result.data.data.token);
                    console.log('login success');
                    this.$router.push('/');
                } else {
                    this.$message.error(result.data.msg);
                    this.loading = false
                }
            });

        },
    },
};
</script>

<style>
.login {

    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    border-radius: 10px;
    background-position: left top;
    background-color: #9b9ba8;
    color: #fff;
    font-family: "Source Sans Pro";
    position: relative;
}

/* .mylogin {
    width: 20%;
    height: 30%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(230deg,
            rgba(53, 57, 74, 0) 0%,
            rgb(127, 158, 168) 100%);
}
*/

/* .inps input {
    border: none;
    color: #4c4545;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
}

.submitBtn {
    background-color: transparent;
    color: #39f;
    width: 200px;
}  */


.mylogin {
    /* 使用Flexbox布局 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 使元素垂直居中显示，可根据需要调整 */
    height: 100vh;
    /* 使.mylogin占据视口高度，可根据需要调整 */
    text-align: center;
    /* 文本居中，替代align="center" */

    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(230deg,
            rgba(53, 57, 74, 0) 0%,
            rgb(127, 158, 168) 100%);
}

/* 其他样式可以根据需要调整，例如输入框宽度可以用百分比 */
.inps {
    width: 100%;
    /* 使输入框宽度自适应容器 */
    max-width: 300px;
    /* 可选，限制最大宽度 */
}

.submitBtn {
    width: 100%;
    /* 使按钮宽度自适应容器 */
    max-width: 300px;
    /* 可选，限制最大宽度 */
    margin-top: auto;
    /* 自动调整底部间距 */
}

.unlogin {
    margin-top: 1rem;
    /* 适当间距 */
    font-size: 0.9em;
    /* 可选，调整字体大小 */
}
</style>