<template>
  <div class="login-home">
    <div class="login-title">ログイン</div>
    <input type="text" v-model="mailAddress" placeholder="メールアドレス"> 
    <!-- テキスト「メールアドレス」
         v-model：メールアドレスの入れ子 -->
    
    <input type="text" v-model="password" placeholder="パスワード">
    <!-- テキスト「パスワード」
         v-model: パスワードの入れ子 -->
    
    <div class="err-msg" v-if="isError">
      <div class="err-msg-x">x</div>
      <div class="err-msg-msg">メールアドレスまたはパスワードが違います</div>
    </div>

    <button @click="login">ログイン</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      mailAddress:"",// メールアドレスの入れ子
      password:"",// パスワードの入れ子
      ID:"",// ユーザID
      isError:false,
    }
  },
  methods:{
    login(){
      //effects: メールアドレス、パスワードの入れ子をもとにログイン処理
      //         失敗した時の例外処理
      //         ログイン成功後、ユーザIDを取得
      //         取得後、ユーザIDを親にemit
    }
  }

}
</script>

<style>
.login-home{
  width:100%;
  height: 80%;
  display:flex;
  align-items: center;
  flex-direction: column;
  padding-top:70px
}
.login-title{
  font-size:25px;
  margin:10px;
  height:100px;
}
.login-home input{
  width:500px;
  height:40px;
  margin:10px;
  border-radius: 10px;
  border-color: rgba(207, 204, 204, 0.671);
}
.login-home button{
  width:500px;
  height: 40px;
  margin:20px;
  padding:0px;
  border-width: 0px;
  background-color: rgb(84, 122, 247);
  color:white;
  border-radius: 10px;
  cursor: pointer;
}
.err-msg{
  width:500px;
  height:40px;
  margin:10px;
  /* border-radius: 10px; */
  color: rgb(253, 117, 117);
  border-color:rgb(253, 160, 160);
  background-color: rgb(252, 228, 228);
  display:flex;
  justify-content: flex-start;
  position: relative;
}
.err-msg-x{
  margin-top:13px;
  margin-left:20px;
  height:15px;
  width:15px;
  font-size: 12px;
  border-radius: 50%;
  background-color: rgb(253, 117, 117);
  color:rgb(252, 228, 228);
  text-align:center;
}
.err-msg-msg{
  width:90%;
  margin-top:10px;
  text-align: center;
}
</style>