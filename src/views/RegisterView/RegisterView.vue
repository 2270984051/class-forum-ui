<template>
    <div class="register">
        <div class="myRegister" align="center">
            <h2>注册</h2>
            <el-form :model="registerForm" :rules="loginRules" ref="registerForm" label-width="0px">
                <el-form-item label="" prop="username" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-s-custom"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" placeholder="账号" v-model="registerForm.username">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" type="password" placeholder="密码"
                                v-model="registerForm.password"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="" prop="phone" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-mobile"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" placeholder="手机" v-model="registerForm.phone">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="" prop="email" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-folder"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input class="inps" placeholder="邮箱" v-model="registerForm.email">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item style="margin-top: 55px">
                    <el-button type="primary" round class="submitBtn" @click="submitForm">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
import { mapMutations } from "vuex";
import { register } from "@/api/user/user";

export default {
    data: function () {
        return {
            registerForm: {
                username: "",
                password: "",
                phone: "",
                email: "",
            },
            loginRules: {
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
            },
        };
    },

    methods: {
        ...mapMutations(["changeLogin"]),
        submitForm() {
            // const userAccount = this.registerForm.username;
            // const userPassword = this.registerForm.password;
            // const userPhone = this.registerForm.phone;
            // const userEmail = this.registerForm.email;
            // if (!userAccount) {
            //     return this.$message({
            //         type: "error",
            //         message: "账号不能为空！",
            //     });
            // }
            // if (!userPassword) {
            //     return this.$message({
            //         type: "error",
            //         message: "密码不能为空！",
            //     });
            // }
            // if (!userPhone) {
            //     return this.$message({
            //         type: "error",
            //         message: "手机不能为空！",
            //     });
            // }
            // if (!userEmail) {
            //     return this.$message({
            //         type: "error",
            //         message: "邮箱不能为空！",
            //     });
            // }

            // console.log("用户输入的账号为：", userAccount);
            // console.log("用户输入的密码为：", userPassword);

            register(this.registerForm).then((result) => {
                console.log(result)
                if (result.data.code == 1) {
                    this.$message.success("注册成功！");
                    this.$router.push("/login");
                } else {
                    this.$message.error(result.data.msg);
                }
            });

        },
    },
};
</script>

<style>
.register {

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

.myRegister {
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

.inps input {
    border: none;
    color: #4c4545;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
}

.submitBtn {
    background-color: transparent;
    color: #39f;
    width: 200px;
}
</style>