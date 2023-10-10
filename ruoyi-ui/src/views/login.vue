<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div style="text-align: center;">
        <svg xmlns="http://www.w3.org/2000/svg" :width="144" :height="48" viewBox="0 0 433 97">
          <g>
            <g id="logotype">
              <path id="logotype-b-47"
                d="M185.2,46.88a13.77,13.77,0,0,0,8.8-13c0-11.7-8.3-17.5-19.7-17.5H144.4V80h32.5c10,0,19.8-7,19.8-17.7C196.7,49.58,185.2,47,185.2,46.88ZM160,29.58h11.6a5.66,5.66,0,0,1,6,5.31q0,.34,0,.69a5.93,5.93,0,0,1-6,5.81H159.9Zm11.7,37.1H160.1V54.18h11.3c5.7,0,8.4,2.5,8.4,6.2C179.8,65,176.4,66.68,171.7,66.68Z"
                style="fill: #ed0007;fill-rule: evenodd" />
              <path id="logotype-o-47"
                d="M231.1,14.78c-18.4,0-29.2,14.7-29.2,33.3s10.8,33.3,29.2,33.3,29.2-14.6,29.2-33.3S249.6,14.78,231.1,14.78Zm0,51.4c-9,0-13.5-8.1-13.5-18.1s4.5-18,13.5-18,13.6,8.1,13.6,18C244.7,58.18,240.1,66.18,231.1,66.18Z"
                style="fill: #ed0007;fill-rule: evenodd" />
              <path id="logotype-s-47"
                d="M294.2,41.38l-2.2-.5c-5.4-1.1-9.7-2.5-9.7-6.4,0-4.2,4.1-5.9,7.7-5.9a17.86,17.86,0,0,1,13,5.9l9.9-9.8c-4.5-5.1-11.8-10-23.2-10-13.4,0-23.6,7.5-23.6,20,0,11.4,8.2,17,18.2,19.1l2.2.5c8.3,1.7,11.4,3,11.4,7,0,3.8-3.4,6.3-8.6,6.3-6.2,0-11.8-2.7-16.1-8.2l-10.1,10c5.6,6.7,12.7,11.9,26.4,11.9,11.9,0,24.6-6.8,24.6-20.7C314.3,46.08,303.3,43.28,294.2,41.38Z"
                style="fill: #ed0007;fill-rule: evenodd" />
              <path id="logotype-c-47"
                d="M349.7,66.18c-7,0-14.3-5.8-14.3-18.5,0-11.3,6.8-17.6,13.9-17.6,5.6,0,8.9,2.6,11.5,7.1l12.8-8.5c-6.4-9.7-14-13.8-24.5-13.8-19.2,0-29.6,14.9-29.6,32.9,0,18.9,11.5,33.7,29.4,33.7,12.6,0,18.6-4.4,25.1-13.8L361.1,59C358.5,63.18,355.7,66.18,349.7,66.18Z"
                style="fill: #ed0007;fill-rule: evenodd" />
              <polygon id="logotype-h-47"
                points="416.3 16.38 416.3 39.78 397 39.78 397 16.38 380.3 16.38 380.3 79.98 397 79.98 397 54.88 416.3 54.88 416.3 79.98 433 79.98 433 16.38 416.3 16.38"
                style="fill: #ed0007;fill-rule: evenodd" />
            </g>
            <g id="symbol">
              <path
                d="M48.2.18a48.2,48.2,0,1,0,48.2,48.2A48.2,48.2,0,0,0,48.2.18Zm0,91.9a43.7,43.7,0,1,1,43.7-43.7,43.71,43.71,0,0,1-43.7,43.7Z" />
              <path
                d="M68.1,18.28H64.8v16.5H31.7V18.28H28.3a36.06,36.06,0,0,0,0,60.2h3.4V62H64.8v16.5h3.3a36.05,36.05,0,0,0,0-60.2ZM27.1,72A31.59,31.59,0,0,1,24.47,27.4a32.51,32.51,0,0,1,2.63-2.62Zm37.7-14.6H31.7V39.28H64.8Zm4.5,14.5v-10h0V34.78h0v-10a31.65,31.65,0,0,1,2.39,44.71A33.68,33.68,0,0,1,69.3,71.88Z" />
            </g>
          </g>
        </svg>
      </div>
     <h3 class="title">TEF3.3 RFID备件库管理系统</h3>
<!--      <h3 class="title">QinP/TEF3 备件库管理系统</h3>-->
      <!-- <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <!-- <el-button :loading="loading" size="medium" type="primary" style="width:100%;/display: none" -->
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;/display: none"
          @click.native.prevent="handleLogin" >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div v-if="register" style="float: right;">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script>
import { ssologin } from '@/api/system/user'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      usernamee: '',
      passwordd: '',
      loginForm: {
        username: 'admin',
        password: '',
        // password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      // 验证码开关
      // captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

mounted:function(){
      this.handleLogin();
},
//登录sso打开它
  created() {
    // this.getCode()
    this.getCookie()
  },
  methods: {
    // getCode() {
    //   getCodeImg().then(res => {
    //     this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
    //     if (this.captchaEnabled) {
    //       this.codeUrl = 'data:image/gif;base64,' + res.img
    //       this.loginForm.uuid = res.uuid
    //     }
    //   })
    // },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    // getsslogin(usernamee){
    //   ssologin(usernamee).then(a => {
    //     //  console.log(a)
    //     //  alert("tanchu")
    //     //  console.log(passowrdd+"密码")
    //     alert("chufa")
    //     passwordd = a;
    //     console.log(passwordd);
    //     alert(passwordd);
    //   });
    // },
    handleResponse(response) {
      console.log("undefined", response)
      // const usernamee = response.account.username
      // this.getsslogin(usernamee)
      // console.log(usernamee);
      /**
       * To see the full list of response object properties, visit:
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
       */
      // let passwordd = '';


        //  console.log(a)
        //  alert("tanchu")
        //  console.log(passowrdd+"密码")
        // alert("chufa")

        // console.log(this.passwordd);
        // alert(passwordd);
        if (response !== null) {
          const username = response.account.username;
          //console.log("username" + username);

          //alert(username+",登录成功！");
          //showWelcomeMessage(username);
          //Step1 POST username  到 后台登录验证接口
          //如果用户名已经存在， 则后台随机生成一个密码，并更新到用户表，然后返 回到此处。
          //如果用户名不存在，则注册一个用户，并随即生成一个密码，新增到用户表后，把密码返回到此处。

          //后台接口返回注册后的密码 （暂行）

          //console.log("这是密码")
          // console.log(a + "没加密");
          this.loginForm.username = username;//username;//使用SSO 返回的用户名
          // this.loginForm.username ="admin";
          // this.loginForm.password = "admin123";// 此处需要使用 Step1 返回的密码， 此处举例 admin123 将显示密码错误！
          // alert("点击确认继续登录！" + username);
          //利用原来的登录逻辑，实现SSO 验证后，在原系统中登录。
              this.$store.dispatch('Login', this.loginForm.username).then(() => {
                this.$router.push({ path: this.redirect || '/' }).catch(() => { })
                // alert(this.loginForm.username + this.loginForm.password);
              }).catch(() => {
                this.loading = false
                // if (this.captchaEnabled) {
                //   this.getCode()
                // }
              })
          //   }
          //   else {
          //     alert("账号或密码未填写完整！");
          //   }
          // })
      } else {
          selectAccount();
        }
      // });

      // let that = this;
      // if (response !== null) {
      //   const username = response.account.username;
      //   console.log("username" + username);

      //   //alert(username+",登录成功！");
      //   //showWelcomeMessage(username);
      //   //Step1 POST username  到 后台登录验证接口
      //   //如果用户名已经存在， 则后台随机生成一个密码，并更新到用户表，然后返回到此处。
      //   //如果用户名不存在，则注册一个用户，并随即生成一个密码，新增到用户表后，把密码返回到此处。

      //   //后台接口返回注册后的密码 （暂行）

      //   console.log("这是密码")
      //   console.log(that.passwordd + "没加密");
      //   this.loginForm.username = username;//username;//使用SSO 返回的用户名
      //   this.loginForm.password = passwordd;// 此处需要使用 Step1 返回的密码， 此处举例 admin123 将显示密码错误！
      //   alert("点击确认继续登录！" + username);
      //   //利用原来的登录逻辑，实现SSO 验证后，在原系统中登录。
      //   this.$refs.loginForm.validate(valid => {
      //     if (valid) {
      //       that.loading = true
      //       if (that.loginForm.rememberMe) {
      //         Cookies.set('username', username, { expires: 30 })
      //         Cookies.set('password', encrypt(password), { expires: 30 })
      //         Cookies.set('rememberMe', that.loginForm.rememberMe, { expires: 30 })
      //       } else {
      //         Cookies.remove('username')
      //         Cookies.remove('password')
      //         Cookies.remove('rememberMe')
      //       }
      //       that.$store.dispatch('Login', that.loginForm).then(() => {
      //         that.$router.push({ path: that.redirect || '/' }).catch(() => { })
      //         alert(this.loginForm.username + this.loginForm.password);
      //       }).catch(() => {
      //         that.loading = false
      //         // if (this.captchaEnabled) {
      //         //   this.getCode()
      //         // }
      //       })
      //     }
      //     else {
      //       alert("账号或密码未填写完整！");
      //     }
      //   })
      // } else {
      //   selectAccount();
      // }
    },
    handleLogin() {
      //sso单点登录方法
      console.log("handleLogin");
      const loginResponse = myMSALObj.loginPopup(loginRequest)
        .then(
          this.handleResponse
        ).catch(error => {
          // handle error
          console.log(error);
        });
      console.log(loginResponse);
      return;
      //普通登录
      // this.loginForm.username = "admin",
      //   this.loginForm.password="admin123"
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     if (this.loginForm.rememberMe) {
      //       Cookies.set('username', "admin", { expires: 30 })
      //       Cookies.set('password', encrypt(password), { expires: 30 })
      //       Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
      //     } else {
      //       Cookies.remove('username')
      //       Cookies.remove('password')
      //       Cookies.remove('rememberMe')
      //     }
      //     this.$store.dispatch('Login', this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || '/' }).catch(() => {
      //       })
      //       alert(this.loginForm.username + this.loginForm.password);
      //     }).catch(() => {
      //       this.loading = false
      //       // if (this.captchaEnabled) {
      //       //   this.getCode()
      //       // }
      //     })
      //   }
      // })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login::before,
.login::after {
  display: none;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(data:image/svg+xml;base64,PHN2ZwogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICB4bWw6c3BhY2U9InByZXNlcnZlIgogIGhlaWdodD0iMzAwIgogIHdpZHRoPSI3MjAiCiAgdmVyc2lvbj0iMS4xIgogIHk9IjAiCiAgeD0iMCIKICB2aWV3Qm94PSIwIDAgNzIwIDMwMCI+CiAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KICAgIC5zdDAgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF8xXyIpOwogICAgfQogICAgLnN0MSB7CiAgICAgIGZpbGw6IHVybCgiI1NWR0lEXzJfIik7CiAgICB9CiAgICAuc3QyIHsKICAgICAgZmlsbDogdXJsKCIjU1ZHSURfM18iKTsKICAgIH0KICAgIC5zdDMgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF80XyIpOwogICAgfQogICAgLnN0NCB7CiAgICAgIGZpbGw6IHVybCgiI1NWR0lEXzVfIik7CiAgICB9CiAgICAuc3Q1IHsKICAgICAgZmlsbDogI0FGMjAyNDsKICAgIH0KICAgIC5zdDYgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF82XyIpOwogICAgfQogICAgLnN0NyB7CiAgICAgIGZpbGw6ICM5NDFCMUU7CiAgICB9CiAgICAuc3Q4IHsKICAgICAgZmlsbDogI0IxMjczOTsKICAgIH0KICAgIC5zdDkgewogICAgICBmaWxsOiAjOTUyNDMyOwogICAgfQogICAgLnN0MTAgewogICAgICBmaWxsOiAjRDQyMDI3OwogICAgfQogICAgLnN0MTEgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF83XyIpOwogICAgfQogICAgLnN0MTIgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF84XyIpOwogICAgfQogICAgLnN0MTMgewogICAgICBmaWxsOiAjMUM5QTQ4OwogICAgfQogICAgLnN0MTQgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF85XyIpOwogICAgfQogICAgLnN0MTUgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF8xMF8iKTsKICAgIH0KICAgIC5zdDE2IHsKICAgICAgZmlsbDogIzJBMzg4NjsKICAgIH0KICAgIC5zdDE3IHsKICAgICAgZmlsbDogdXJsKCIjU1ZHSURfMTFfIik7CiAgICB9CiAgICAuc3QxOCB7CiAgICAgIGZpbGw6IHVybCgiI1NWR0lEXzEyXyIpOwogICAgfQogICAgLnN0MTkgewogICAgICBmaWxsOiB1cmwoIiNTVkdJRF8xM18iKTsKICAgIH0KICAgIC5zdDIwIHsKICAgICAgZmlsbDogdXJsKCIjU1ZHSURfMTRfIik7CiAgICB9CiAgPC9zdHlsZT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS41NSwtMy4zKSI+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiB5Mj0iLTMyLjY2MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHkxPSItMzIuNjYzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9Ijg0Mi4wOCIgeDE9IjExOC45OCI+PHN0b3Agc3RvcC1jb2xvcj0iIzk1MjMzMSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzkyMUMxRCIgb2Zmc2V0PSIuMDM2MDk0Ii8+PHN0b3Agc3RvcC1jb2xvcj0iI0IwMjczOSIgb2Zmc2V0PSIuMDg0NjQ5Ii8+PHN0b3Agc3RvcC1jb2xvcj0iI0FEMUYyNCIgb2Zmc2V0PSIuMTIzNyIvPjxzdG9wIHN0b3AtY29sb3I9IiNDNzIwMjYiIG9mZnNldD0iLjE1MDkiLz48c3RvcCBzdG9wLWNvbG9yPSIjRDQyMDI3IiBvZmZzZXQ9Ii4xNjk3Ii8+PHN0b3Agc3RvcC1jb2xvcj0iI0NDMjQzMSIgb2Zmc2V0PSIuMTc1OCIvPjxzdG9wIHN0b3AtY29sb3I9IiNCNzJCNEMiIG9mZnNldD0iLjE4ODgiLz48c3RvcCBzdG9wLWNvbG9yPSIjOTUzMzcxIiBvZmZzZXQ9Ii4yMDc0Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzg4MzU3RiIgb2Zmc2V0PSIuMjE0MiIvPjxzdG9wIHN0b3AtY29sb3I9IiM4NTM2ODEiIG9mZnNldD0iLjI0MzYiLz48c3RvcCBzdG9wLWNvbG9yPSIjNkYzNjhCIiBvZmZzZXQ9Ii4yNjM4Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzM5NDI4RiIgb2Zmc2V0PSIuMjkxMSIvPjxzdG9wIHN0b3AtY29sb3I9IiMyMzNEN0QiIG9mZnNldD0iLjMyNDIiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzIyQzZGIiBvZmZzZXQ9Ii40MTgxIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzJBMzg4NSIgb2Zmc2V0PSIuNDk0Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzFENjJBMSIgb2Zmc2V0PSIuNTU4MSIvPjxzdG9wIHN0b3AtY29sb3I9IiMyNzZDQTUiIG9mZnNldD0iLjU3MDIiLz48c3RvcCBzdG9wLWNvbG9yPSIjNDM4RUIzIiBvZmZzZXQ9Ii42MTAzIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzU1QTVCQyIgb2Zmc2V0PSIuNjM5OSIvPjxzdG9wIHN0b3AtY29sb3I9IiM1Q0FGQkYiIG9mZnNldD0iLjY1NTYiLz48c3RvcCBzdG9wLWNvbG9yPSIjNTZBQkJEIiBvZmZzZXQ9Ii42Nzc3Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzQzOUZCOCIgb2Zmc2V0PSIuNzA1OCIvPjxzdG9wIHN0b3AtY29sb3I9IiMxODhFQUYiIG9mZnNldD0iLjczNzIiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDM4QkFFIiBvZmZzZXQ9Ii43NDI2Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzA2OTI5MiIgb2Zmc2V0PSIuNzg5OCIvPjxzdG9wIHN0b3AtY29sb3I9IiMwNUExNEIiIG9mZnNldD0iLjg4NzUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDM5MjdFIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHdpZHRoPSI3MjMuMSIgeT0iMCIgeD0iMCIgaGVpZ2h0PSIzMDYuNCIgY2xhc3M9InN0MCIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMl8iIHkyPSItMTA5LjI2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeTE9Ii0xMDkuMjYiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgLTExOC45OCAxMjAuNTQpIiB4Mj0iMjM1Ljk4IiB4MT0iMzI1LjA4Ij48c3RvcCBzdG9wLWNvbG9yPSIjODkzNjgwIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjODkzNjgwIiBvZmZzZXQ9Ii4zMzU0Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzhEMzE2RCIgb2Zmc2V0PSIuNTAyNSIvPjxzdG9wIHN0b3AtY29sb3I9IiM5MDI5NEQiIG9mZnNldD0iLjgzOTgiLz48c3RvcCBzdG9wLWNvbG9yPSIjOTAyNTQxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50Pjxwb2x5Z29uIHBvaW50cz0iMTc1LjEgMTUzLjIgMTE3IDMwNi40IDIwNi4xIDMwNi40IiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIgY2xhc3M9InN0MSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8zXyIgeTI9Ii04Mi4yODQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTIwLjI0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjQ0Ni41NSIgeDE9IjQ3OC45MyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMyMkM2RiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzMyMkM2RiIgb2Zmc2V0PSIuMjQyNyIvPjxzdG9wIHN0b3AtY29sb3I9IiMzMDJGNzIiIG9mZnNldD0iLjQ1OTkiLz48c3RvcCBzdG9wLWNvbG9yPSIjMkEzQTdFIiBvZmZzZXQ9Ii43MTU1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzE1NEE5MyIgb2Zmc2V0PSIuOTg5NiIvPjxzdG9wIHN0b3AtY29sb3I9IiMxMzRCOTQiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PHBvbHlnb24gcG9pbnRzPSIyODguNCAxNTMuMiAzMTAuNyAzMDYuNCAzNTguMSAzMDYuNCAzNTguMSAwIDMxMi45IDAiIGZpbGw9InVybCgjU1ZHSURfM18pIiBjbGFzcz0ic3QyIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiB5Mj0iLTMyLjY2MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHkxPSItMzIuNjYzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjM3Mi44OCIgeDE9IjI5NC4wOCI+PHN0b3Agc3RvcC1jb2xvcj0iIzZGMzc4RCIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzNBNDI5MSIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cG9seWdvbiBwb2ludHM9IjE3NS4xIDE1My4yIDIwNi4xIDMwNi40IDI1My45IDE1My4yIDIwOS40IDAgMjA5LjQgMCIgZmlsbD0idXJsKCNTVkdJRF80XykiIGNsYXNzPSJzdDMiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNV8iIHkyPSItMzIuNjYzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeTE9Ii0zMi42NjMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgLTExOC45OCAxMjAuNTQpIiB4Mj0iMzI1LjA4IiB4MT0iNDMxLjg4Ij48c3RvcCBzdG9wLWNvbG9yPSIjMjMzRDdEIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjkzRDdEIiBvZmZzZXQ9Ii4yNDk1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzNBM0M4MCIgb2Zmc2V0PSIuNTQ0NiIvPjxzdG9wIHN0b3AtY29sb3I9IiM1MTNCODQiIG9mZnNldD0iLjg2MTYiLz48c3RvcCBzdG9wLWNvbG9yPSIjNUQzQTg2IiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50Pjxwb2x5Z29uIHBvaW50cz0iMjUzLjkgMTUzLjIgMjA2LjEgMzA2LjQgMzEwLjcgMzA2LjQgMjg4LjQgMTUzLjIgMzEyLjkgMCAyMDkuNCAwIiBmaWxsPSJ1cmwoI1NWR0lEXzVfKSIgY2xhc3M9InN0NCIvPjxwb2x5Z29uIHBvaW50cz0iMTE2LjEgMCA1NS43IDAgNTUuNyA5NC44IDg5LjkgMTUzLjIgNTUuNyAyMTEuNiA1NS43IDMwNi40IDExNyAzMDYuNCA5NS4yIDE1My4yIiBmaWxsPSIjYWYyMDI0IiBjbGFzcz0ic3Q1Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzZfIiB5Mj0iNDMuOTM3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeTE9IjQzLjkzNyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAtMTE4Ljk4IDEyMC41NCkiIHgyPSIyMzIuNjciIHgxPSIzMjkuMTEiPjxzdG9wIHN0b3AtY29sb3I9IiM4OTM2ODAiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiM4OTM2ODAiIG9mZnNldD0iLjMzNTQiLz48c3RvcCBzdG9wLWNvbG9yPSIjOEQzMTZEIiBvZmZzZXQ9Ii41MDI1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzkwMjk0RCIgb2Zmc2V0PSIuODM5OCIvPjxzdG9wIHN0b3AtY29sb3I9IiM5MDI1NDEiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PHBvbHlnb24gcG9pbnRzPSIxNzUuMSAxNTMuMiAyMDkuNCAwIDExNi4xIDAiIGZpbGw9InVybCgjU1ZHSURfNl8pIiBjbGFzcz0ic3Q2Ii8+PHBvbHlnb24gcG9pbnRzPSI1NS43IDk0LjggNTUuNyAwIDAgMCIgZmlsbD0iIzk0MWIxZSIgY2xhc3M9InN0NyIvPjxwb2x5Z29uIHBvaW50cz0iNTUuNyAyMTEuNiA4OS45IDE1My4yIDU1LjcgOTQuOCIgZmlsbD0iI2IxMjczOSIgY2xhc3M9InN0OCIvPjxwb2x5Z29uIHBvaW50cz0iNTUuNyAyMTEuNiAwIDMwNi40IDU1LjcgMzA2LjQiIGZpbGw9IiM5NDFiMWUiIGNsYXNzPSJzdDciLz48cG9seWdvbiBwb2ludHM9IjU1LjcgOTQuOCAwIDAgMCAzMDYuNCA1NS43IDIxMS42IiBmaWxsPSIjOTUyNDMyIiBjbGFzcz0ic3Q5Ii8+PHBvbHlnb24gcG9pbnRzPSIxMTYuMSAwIDk1LjIgMTUzLjIgMTE3IDMwNi40IDE3NS4xIDE1My4yIiBmaWxsPSIjZDQyMDI3IiBjbGFzcz0ic3QxMCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF83XyIgeTI9Ii0xODYuMDYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTIwLjQ0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9Ijc0OC45NiIgeDE9Ijc0OC45NiI+PHN0b3Agc3RvcC1jb2xvcj0iIzk0QkU1NSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzkzQkQ1OCIgb2Zmc2V0PSIuMDQ0MzQwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzhCQkM2QSIgb2Zmc2V0PSIuMzg5MSIvPjxzdG9wIHN0b3AtY29sb3I9IiM4NkJDNzUiIG9mZnNldD0iLjcxNDkiLz48c3RvcCBzdG9wLWNvbG9yPSIjODRCQzc5IiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoCiAgICAgIGQ9Im02NDEuNiAyNTkuNmMxLjctMjUuNCAxMC01NC42IDE4LjgtODUuNiAxLjQtNSAyLjgtMTAgNC4yLTE1LjEtMS40LTUuNS0yLjgtMTAuOS00LjItMTYuMi04LjgtMzMuMy0xNy02NC43LTE4LjgtOTItMS40LTIxLjIgMS40LTM3IDguOS01MC42aC00NS45Yy03LjUgMTguMy0xMC4zIDI5LjEtOC45IDUwLjMgMS43IDI3LjMgMTAgNTguNyAxOC44IDkyIDEzIDQ5LjMgMjggMTA2LjIgMjMuMiAxNjQuMmgxMi45Yy03LjYtMTIuOC0xMC40LTI3LjMtOS00N3oiCiAgICAgIGNsYXNzPSJzdDExIgogICAgICBmaWxsPSJ1cmwoI1NWR0lEXzdfKSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF84XyIgeTI9Ii0xODQuNDUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTE3LjI5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjczMy40OSIgeDE9IjY1My43NiI+PHN0b3Agc3RvcC1jb2xvcj0iIzA4QTI0QiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzBBQTE0RSIgb2Zmc2V0PSIuMTY3OCIvPjxzdG9wIHN0b3AtY29sb3I9IiMwQjlFNTciIG9mZnNldD0iLjQwNDciLz48c3RvcCBzdG9wLWNvbG9yPSIjMDk5QTY3IiBvZmZzZXQ9Ii42ODI3Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzA0OTQ3RCIgb2Zmc2V0PSIuOTg5OCIvPjxzdG9wIHN0b3AtY29sb3I9IiMwNDkzN0UiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0ibTYxNC41IDE0Mi4zYy04LjgtMzMuMy0xNy02NC43LTE4LjgtOTItMS40LTIxLjIgMS40LTMyIDguOS01MC4zaC0zNS40YzUuNyA1My45LTMuOCAxMDYuNy0xMy42IDE2Ni44LTUuNyAzNS0xMS43IDcxLjMtMTMuMiAxMDAuNi0xLjEgMjEuMSAwLjQgMzIuOCAxLjggMzloOTMuNWM0LjgtNTcuOS0xMC4zLTExNC44LTIzLjItMTY0LjF6IiBjbGFzcz0ic3QxMiIgZmlsbD0idXJsKCNTVkdJRF84XykiLz48cGF0aCBjbGFzcz0ic3QxMyIgZmlsbD0iIzFjOWE0OCIgZD0ibTY2NC42IDE1OC45Yy0xLjQgNS4xLTIuOCAxMC4xLTQuMiAxNS4xLTguOCAzMS0xNyA2MC4yLTE4LjggODUuNi0xLjQgMTkuNyAxLjQgMzQuMiA5IDQ2LjloMzNjNC4yLTUxLjgtNy4yLTEwMi4zLTE5LTE0Ny42eiIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF85XyIgeTI9Ii0xODUuOTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTIwLjU0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjgxMi44MyIgeDE9IjgxMi44MyI+PHN0b3Agc3RvcC1jb2xvcj0iIzY5QTA2MCIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzYzOUQ1QyIgb2Zmc2V0PSIuMDM5ODk1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzRDOTQ0RiIgb2Zmc2V0PSIuMjE5MiIvPjxzdG9wIHN0b3AtY29sb3I9IiMzNzhFNDciIG9mZnNldD0iLjQxODQiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjk4QjQ0IiBvZmZzZXQ9Ii42NTE1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzIzOEE0MyIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtNjgwLjUgMGMxMC43IDU1LjMtMi41IDExMC40LTE1LjkgMTU4LjkgMTEuNyA0NS4zIDIzLjIgOTUuOCAxOC45IDE0Ny42aDM5LjZ2LTMwNi41aC00Mi42eiIgY2xhc3M9InN0MTQiIGZpbGw9InVybCgjU1ZHSURfOV8pIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzEwXyIgeTI9Ii0xODUuODYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTIwLjU0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjY1Mi40NSIgeDE9IjY1Mi40NSI+PHN0b3Agc3RvcC1jb2xvcj0iIzA1QjVEQyIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzA0QjBENyIgb2Zmc2V0PSIuMjE5NyIvPjxzdG9wIHN0b3AtY29sb3I9IiMwNUE0QzkiIG9mZnNldD0iLjUzNzEiLz48c3RvcCBzdG9wLWNvbG9yPSIjMDU5MUI0IiBvZmZzZXQ9Ii45MTIyIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzA1OENBRSIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtNTQyLjMgMjY3LjRjMS41LTI5LjQgNy41LTY1LjYgMTMuMi0xMDAuNiA5LjgtNjAuMSAxOS4zLTExMi44IDEzLjYtMTY2LjhoLTcwLjhjLTEuNCAxMS40LTIuOSAxOS4yLTEuOCA0MS44IDEuNSAzMS42IDcuNSA3MC41IDEzLjIgMTA4LjIgOC40IDU1LjQgMTYuNiAxMDguOCAxNS4xIDE1Ni40aDE5LjJjLTEuMy02LjItMi44LTE3LjktMS43LTM5eiIgY2xhc3M9InN0MTUiIGZpbGw9InVybCgjU1ZHSURfMTBfKSIvPjxwb2x5Z29uIHBvaW50cz0iMzc1LjcgMTUzLjIgMzU4LjEgMCAzNTguMSAzMDYuNCIgZmlsbD0iIzJhMzg4NiIgY2xhc3M9InN0MTYiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMTFfIiB5Mj0iNzcuMTM2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeTE9Ii00LjMyODEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgLTExOC45OCAxMjAuNTQpIiB4Mj0iNzk2LjcxIiB4MT0iNzUxLjA1Ij48c3RvcCBzdG9wLWNvbG9yPSIjNjJCMTZFIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjODdCOTU3IiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Im02NDEuNiA1MC42YzEuNyAyNy4zIDEwIDU4LjcgMTguOCA5MiAxLjQgNS4zIDIuOCAxMC43IDQuMiAxNi4yIDEzLjUtNDguNCAyNi42LTEwMy41IDE1LjktMTU4LjhoLTMwYy03LjUgMTMuNi0xMC4zIDI5LjQtOC45IDUwLjZ6IiBjbGFzcz0ic3QxNyIgZmlsbD0idXJsKCNTVkdJRF8xMV8pIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzEyXyIgeTI9Ii0xODkuMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTEzLjcxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIC0xMTguOTggMTIwLjU0KSIgeDI9IjYzMS41OSIgeDE9IjU1MC40Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDY5QUQ0IiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzBBMENFIiBvZmZzZXQ9Ii4zNTI1Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzVCQjBDMCIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJtNTA5LjggMTUwYy01LjctMzcuNy0xMS43LTc2LjYtMTMuMi0xMDguMi0xLjEtMjIuNyAwLjQtMzAuNCAxLjgtNDEuOGgtNDEuNWMxLjUgNDAuMS0xLjUgODUuMy03IDE2MC44LTMuMSA0My41LTggMTEwLjUtNyAxNDUuN2g4Mi4xYzEuNC00Ny43LTYuOC0xMDEuMS0xNS4yLTE1Ni41eiIgY2xhc3M9InN0MTgiIGZpbGw9InVybCgjU1ZHSURfMTJfKSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xM18iIHkyPSItMTg1Ljg2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeTE9IjEyMC41NCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAtMTE4Ljk4IDEyMC41NCkiIHgyPSI1MDUuMzMiIHgxPSI1MDUuMzMiPjxzdG9wIHN0b3AtY29sb3I9IiMxRTQ1OEUiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiMxRjRGOTYiIG9mZnNldD0iLjI0MTEiLz48c3RvcCBzdG9wLWNvbG9yPSIjMkI2QUFCIiBvZmZzZXQ9Ii43MjkyIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzMzN0JCOSIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48cG9seWdvbiBwb2ludHM9IjM1OC4xIDMwNi40IDQxNC42IDMwNi40IDQxNC42IDAgMzU4LjEgMCAzNzUuNyAxNTMuMiIgZmlsbD0idXJsKCNTVkdJRF8xM18pIiBjbGFzcz0ic3QxOSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xNF8iIHkyPSIxMjAuNTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iLTE4NS44NiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAtMTE4Ljk4IDEyMC41NCkiIHgyPSI1NTQuOTIiIHgxPSI1NTQuOTIiPjxzdG9wIHN0b3AtY29sb3I9IiMzRjlBQzkiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiMyMDYyQTIiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0ibTQ0OS45IDE2MC44YzUuNS03NS41IDguNS0xMjAuNiA3LTE2MC44aC00Mi4ybC0wLjEgMzA2LjRoMjguM2MtMS0zNS4xIDMuOC0xMDIuMSA3LTE0NS42eiIgY2xhc3M9InN0MjAiIGZpbGw9InVybCgjU1ZHSURfMTRfKSIvPjwvZz4KPC9zdmc+Cg==);
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
