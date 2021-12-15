<template>
  <div class="login-home">
    <div>ログイン</div>
    <input type="text" v-model="mailAddress" placeholder="メールアドレス"> 
    <!-- テキスト「メールアドレス」
         v-model：メールアドレスの入れ子 -->
    
    <input type="text" v-model="password" placeholder="パスワード">
    <!-- テキスト「パスワード」
         v-model: パスワードの入れ子 -->
    
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
      ID:""// ユーザID
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
  height: 60%;
  display:flex;
  align-items: center;
  flex-direction: column;
  padding-top:70px
}
.login-home div{
  font-size:25px;
  margin:10px;
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
}
</style>