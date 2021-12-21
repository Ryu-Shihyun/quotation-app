<template>
  <div class="setting-home">
    <div class="setting-title">パスワード変更</div>
    <input type="text" v-model="nowPassword" placeholder="現在のパスワード"> 
    <!-- テキスト「現在のパスワード」
         v-model: 現在のパスワード -->
    <input type="text" v-model="newPassword1" placeholder="新しいパスワード">
    <!-- テキスト「新しいパスワード」
         v-model: 新規パスワード -->
    <input type="text" v-model="newPassword2" placeholder="(確認用)新規パスワード">
    <!-- テキスト「(確認用)新規パスワード」
         v-model: 新規パスワード(確認) -->
    <div class="s-err-msg" v-if="isError">
      <div class="s-err-msg-x">x</div>
      <div class="s-err-msg-msg">入力にミスがあります</div>
    </div>

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
      ID:"",// ユーザID
      isError:false,
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
.setting-title{
  font-size:25px;
  margin:10px;
  height:100px;
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
  cursor: pointer;
}
.s-err-msg{
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
.s-err-msg-x{
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
.s-err-msg-msg{
  width:90%;
  margin-top:10px;
  text-align: center;
}

</style>