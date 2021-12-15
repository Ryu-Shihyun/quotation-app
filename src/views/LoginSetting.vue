<template>
  <div class="setting-home">
    <div>パスワード変更</div>
    <input type="text" v-model="nowPassword" placeholder="現在のパスワード"> 
    <!-- テキスト「現在のパスワード」
         v-model: 現在のパスワード -->
    <input type="text" v-model="newPassword1" placeholder="新しいパスワード">
    <!-- テキスト「新しいパスワード」
         v-model: 新規パスワード -->
    <input type="text" v-model="newPassword2" placeholder="(確認用)新規パスワード">
    <!-- テキスト「(確認用)新規パスワード」
         v-model: 新規パスワード(確認) -->
    
    <button @click="changePassword">パスワード変更</button>
  </div>
</template>

<script>
export default {
  name: "LoginSetting",
  data(){
    return{
      nowPassword:"",// 現在パスワード
      newPassword1:"",//新規パスワード
      newPassword2:"",//新規パスワード(確認用)
      ID:""// ユーザID
    }
  },
  methods:{
    changePassword(){
      //effects: 入力欄全て記入し、かつ新規パスワードが確認用ともに同じであったら
      //         失敗した時の例外処理として、メッセージを出力
      //         サーバに登録成功後、topに移動
      this.$router.push('/')
    }
  }

}
</script>

<style>
.setting-home{
  width:100%;
  height: 60%;
  display:flex;
  align-items: center;
  flex-direction: column;
  padding-top:70px
}
.setting-home div{
  font-size:25px;
  margin:10px;
}
.setting-home input{
  width:500px;
  height:40px;
  margin:10px;
  border-radius: 10px;
  border-color: rgba(207, 204, 204, 0.671);
}
.setting-home button{
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