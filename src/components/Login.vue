<template>
  <div>
    <div>ログイン</div>
    <input type="text" v-model="mailAddress"> 
    <!-- テキスト「メールアドレス」
         v-model：メールアドレスの入れ子 -->
    
    <input type="text" v-model="password">
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

</style>