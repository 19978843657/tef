<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/">12345678</a>
      <div class="btn-group ml-auto dropleft">
        <button type="button" id="SignIn" class="btn btn-secondary" onclick="signIn()">

          Sign In
        </button>

      </div>
    </nav>
    <br>
    <h5 class="card-header text-center">#################</h5>
    <br>
    <div class="row" style="margin:auto">
      <div id="card-div" class="col-md-3" style="display:none">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title" id="WelcomeMessage">Please sign-in to see your profile and read your mails</h5>
            <div id="profile-div"></div>
            <br>
            <br>
            <button class="btn btn-primary" id="seeProfile" onclick="seeProfile()">See Profile</button>
            <br>
            <br>
            <button class="btn btn-primary" id="readMail" onclick="readMail()">Read Mails</button>
          </div>
        </div>
      </div>
      <br>
      <br>
      <div class="col-md-4">
        <div class="list-group" id="list-tab" role="tablist">
        </div>
      </div>
      <div class="col-md-5">
        <div class="tab-content" id="nav-tabContent">
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>

</template>
<script setup>
import signIn from "/public/sso/authPopup.js"
/*
const signIns=()=>{
  signIn()
}
*/


</script>
<style scoped>

.adaptiveSquare {
  width: 50%;
  height: 0;
  padding-top: 50%; /* padding是相较于父元素的宽度的，所以只要和width一样宽就是正方形了 */
  background-color: aqua;
}

</style>
