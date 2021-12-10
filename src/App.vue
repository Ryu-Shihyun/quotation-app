<template>
  <div id="app">
    <div id="login" v-if="!isLogin">
      <Login/>
      <!-- emitされたユーザIDをthis.ユーザIDに入れるためにgetUserIDを呼び出す -->
    </div>
   
    
    
    <div id="app-home" v-else >
      <div id="nav"> 
        <!-- header -->
        <!-- 「自動査定システム」、ウェブの題名(見積査定、履歴) -->
        <div class="app-name">自動査定システム</div>
        <div class="page-name">{{webName}}</div>
        <ul class="header-ui">
          <li>
            <img src="" alt="log">
            履歴

            <!-- v-forで日時データの配列をもとに日時を
             ドロップダウンメニューのリストとしてだす -->
            <!-- router-link to="/fileData"
              日時を表示
              指定した日時のデータをprops  -->
              <!-- modalを使うか、ドロップダウンメニューとしてつくるか検討 -->
            <ul >
              <li v-for="(d,i) in datesArray" v-bind:key="i">
                <router-link to="/fileData">{{d}}</router-link>
              </li>
            </ul>
          </li>
          <li @click="logOut">
            <img src="" alt="logout">
            ログアウト
          </li>
        </ul>
      </div>

       <router-view @handOverFile="getFile" v-bind:data="files"/>
       <!-- Topの場合、emitされたファイルの配列を格納するためにgetFileを呼び出す -->
    </div>
   
  </div>
  
</template>

<script>
//Login.vue をimport
import Login from "@/components/Login.vue";
export default {
  components: {
    Login
  },
  data(){
    return{
      isLogin:true,//ログインの可否
      files:[],//ユーザ、サーバからimportしたファイルの入れ子の配列
      selected_date:"",//履歴で選択された日時のデータ(Date() or String)
      datesArray:["2021-12-04","2021-12-03","2021-11-23"],//サーバから入手した日時のデータの配列（新しい順にソート済み)
      webName:"見積査定",// webページの題名
      ID:"",// ユーザID
    }
  },
  methods:{
    moveToFileData(){
      //requires ファイルの入れ子配列が空ではない時 & router-viewがHomeの時

      //effects  router-viewをFileDataにする
      //         ファイルの入れ子配列をFileDataに送る
      if(this.files.length > 0){
        this.$router.push('/fileData');
        // this.files.length = 0;
      }
    },
    /*
    changeToFileData(){
      //requires 履歴で選択された時
      //effects router-viewをFileDataにする
      //        履歴で選択された日時のデータをFileDataに送る
      //        webページの
    },
    */
    getLogDate(){
      //requires ログインに成功した時&ユーザがサーバ上にあるとき
      //effects サーバからユーザの履歴のデータを入手
      //        日時のデータの配列に入れる
      //        取得できなかった時の例外処理
    },
    logOut(){
      //effects ログアウト処理。
      //        isLoginのfalse
      //        data()の初期化
      this.isLogin = false;
    },
    /*
    getUserID(id){
      //effects idをユーザIDに代入
    },
    */
    getFile(files){
      //effects filesをファイルの配列に代入
      this.files = files;
      this.moveToFileData();
    }

  },
  watch:{
    //ユーザIDを監視
    // function(){
    // effects isLoginをtrue
    // }
  }
}
</script>

<style>

</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display:flex;
  justify-content: space-between;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.header-ui{
  display: flex;
  justify-content: space-between;
  padding:0px;
}

.header-ui li{
  padding-left:10px;
  display:flex;
  flex-direction:column;
  position: relative;
}


.header-ui ul{
  display: none;
  width:120px;
  height: 200px;
  margin:5px;
  padding: 0px;
  position: absolute;
  background-color: azure;
}
.header-ui li:hover ul{
  display: block;
}
</style>
