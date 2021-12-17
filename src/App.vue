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
          <li @click="changeToSetting">
            <img src="@/assets/lock.png" alt="logout">
            <p>パスワード変更</p>
          </li>
          <li @click="displayLog">
            <img src="@/assets/history.png" alt="log">
            <p>履歴</p>
            <!-- v-forで日時データの配列をもとに日時を
             ドロップダウンメニューのリストとしてだす -->
            <!-- router-link to="/fileData"
              日時を表示
              指定した日時のデータをprops  -->
              <!-- modalを使うか、ドロップダウンメニューとしてつくるか検討 -->
            <ul id="log-menue" >
              <li v-for="(d,i) in datesArray" v-bind:key="i" class="log-date">
                <router-link :to="{name:'FileData',params:{log:d, assess_num:assessmentNumber[i]}}"  >{{d}}</router-link>
                <!-- <div @click="changeToLog(d)">{{d}}</div> -->
              </li>
            </ul>
          </li>
          <li @click="logOut">
            <img src="@/assets/logout.png" alt="logout">
            <p>ログアウト</p>
          </li>
        </ul>
      </div>

       <router-view @handOverFile="getFile" v-bind:data="files" v-bind:log="selected_date"/>
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
      assessmentNumber:["xxxxxxxxxx","oooooooooo","aaaaaaaaa"],
      selected_date:"",//履歴で選択された日時のデータ(Date() or String)
      datesArray:["2021-12-04","2021-12-03","2021-11-23"],//サーバから入手した日時のデータの配列（新しい順にソート済み)
      webName:"見積査定",// webページの題名
      ID:"",// ユーザID
    }
  },
  inheritAttrs: false,
  methods:{
    moveToFileData(){
      //requires ファイルの入れ子配列が空ではない時 & router-viewがHomeの時

      //effects  router-viewをFileDataにする
      //         ファイルの入れ子配列をFileDataに送る
      if(this.files.length > 0){
        this.$router.push({name:'FileData',params:{assess_num:'edit'}});
        // this.files.length = 0;
      }
    },
    
    changeToLog(date){
      //requires 履歴で選択された時、TopからかFileDataからか
      //effects Topだったらprops指定して遷移
      //        FileDataだったらpropsの値を変える
      if(this.$route.path=="/"){
        this.$router.push({name:'FileData',params:{log:date}})
      }else if(this.$route.path=="/fileData"){
        // this.$route.params['log']=date
        this.selected_date = date
      }
    },
    
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
    },
    displayLog(){
      const log = document.getElementById("log-menue")
      if(log.style.display == "none"){
        log.style.display = "block";
      }else{
        log.style.display = "none";
      }
    },
    changeToSetting(){
      this.$router.push("/loginSetting")
    }

  },
  watch:{
    //ユーザIDを監視
    // function(){
    // effects isLoginをtrue
    // }
    /*
    $route(){
      if(this.$route.path=="/" || this.$route.path=="/fileData/edit"){
        this.webName="見積査定"
      }else{
        this.webName="履歴"
      }
    }
    */
  }
}
</script>

<style>

</style>
<style>
body{
  margin:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  height:50px;
  display:flex;
  justify-content: space-between;
  border-block-end: solid;
  border-block-end-color: #e6e6e6;
  position: relative;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.app-name{
  margin-top:10px;
  margin-right: 40px;
  font-size: 20px;
  font-weight: 700;
}

.page-name{
  margin-top:20px;
  font-size:18px;
}

.header-ui{
  display: flex;
  justify-content: space-around;
  padding:0px;
  margin-top:6px;
  margin-bottom:3px;
  height:100%;
  /* width:200px */
}

.header-ui > li{
  margin:0px 10px 0px 10px;
  width: 80px;
  display:flex;
  flex-direction:column;
  align-items: center;
  position: relative;
}

.header-ui > li img{
  height: 30px;
  width:30px;
}
.header-ui > li>p{
  font-size: 15px;
  width:150px;
  text-align: center;
  position:absolute;
  bottom:-17px;
}
.header-ui > li:hover img{
  opacity: 0.3;
}
.header-ui > li:hover p{
  opacity:0.3;
}

.header-ui ul{
  display: none;
  width:200px;
  height: 200px;
  margin:5px;
  padding: 0px;
  border: solid;
  border-color:rgb(156, 156, 156);
  margin-top:50px;
  right: 5px;
  position: absolute;
  background-color: rgb(236, 236, 236);
  overflow-y:scroll;
}

.log-date{
  height: 15px;
  margin: 10px;
}
/*
.header-ui li:hover ul{
  display: block;
}
*/
</style>
