<template>
  <div class="home">
    <div class="file-view">
      <!-- アップロードしたファイルを並べるエリア -->
      <div class="view-header">
        <div class="add-button">
          <div class="file-num"><p>{{files.length}}</p></div>
          <h1>+</h1>
          <input type="file" name="file" accept=".pdf" @change="addFile" multiple>
        </div>
        <div class="number-and-date">  {{assess_num}}<br/>{{date}}</div>
      </div>
      <div v-for="(file,k) in files" v-bind:key="k" class="file-item">
        <!-- <iframe src="${file.name}" width="400px" heitght="600px"></iframe> -->
        <button @click="removeFile(k)">x</button>
        <img src="@/assets/pdf_icon2.jpeg" alt="">
        <div>{{file.name}}</div>
        
      </div>
    </div>
    <div class="file-manager">
      <!-- 見積査定、一括ダウンロード、取消 or 新規査定 -->
      <p>PDfからEXCEL</p>
      <button :class="changeButton(true)" v-bind:disabled="isComplete">見積査定</button>
      <p>
        準備が整ったら、見積査定ボタンを押してください
        <!-- Messageに変更予定。履歴からのアクセスか、
             ファイルドロップからのアクセスか、見積査定状態かによって変わる -->
      </p>
      <button :class="changeButton(false)" v-bind:disabled="isComplete">一括ダウンロード</button>
      <router-link to="/" class="cancel-button"><p>取消</p></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:"FileData",
  props:['data','log','assess_num'],
  data(){
    return{
      files:[],
      ID:"",//ユーザID
      jobNum :"",// 処理number
      date:"",//日付
      isAbleToDrop:true,//ドロップ許可のtrue or false
      isComplete:false,// 送信の完了のtrue or false
      Message:"",//状態のメッセージ
      isUpload:true,
    }
  },
  methods:{
    sendToServer(){
      // require 「見積査定」のボタンが押されたとき
      // effect  サーバにfilesを送信
      //         ドロップ許可をfalseにする
      //         xボタンを非活性かつ見えなくする。もしくは要素を消す。
      //         状態メッセージを「処理中です。しばらくお待ちください。」にする。
      //         最初に送信した時刻を日付の変数に代入
      //         ファイル追加ボタン, 「見積査定」ボタンを非活性化する
      //         ファイルの表示にプログレス表示をつける
    },
    recieveFromServer(){
      // effetct サーバからファイルを取得してfilesに入れる。
    },
    completeRecieve(){
      // require 全てのファイルをサーバから受け取った時
      // effect  「見積査定」のボタンの非活性化
      //         「一括ダウンロード」ボタンの活性化
      //         「取消」の名所を「見積書新規査定」に変更
      //          日付エリアの表示
      //          状態メッセージを「処理が完了しました。」にする。
    },
    download(){
      // require 一括ダウンロードを押されたとき
      // effect  zipでダウンロードする
    },
    addFile(e){
      // require 押されるイベントが起こったとき
      // effect event.target.files をArrayに変換
      //        Arrayの要素をfilesにpush
      e.preventDefault();
      let files = Array.from(e.target.files);
      for(let i=0;i<files.length;i++){
        this.files.push(files[i]);
      }
    },
    removeFile(k){
      // require 選択されたファイルのxボタンが押されたとき
      //         ファイルのインデックスを取得
      // effect  filesからそのインデックスの要素をsplice
      this.files.splice(k,1);
    },
    dropFile(){
      //require ドロップ許可がtrueの時
      //effect ファイルの配列にドロップしたファイルを代入
      if(this.isAbleToDrop){
        this.files = [...event.dataTransfer.files];
      }
      
    },
    changeButton(isAssessment){
      if(isAssessment){
        if(this.isComplete){
          return "button-false"
        }else{
          return "button-true"
        }
      }else{
        if(this.isComplete){
          return "button-true"
        }else{
          return "button-false"
        }
      }
    },
  },
  mounted(){
    // let reader = new FileReader()
    // this.data.forEach(el => {
    //   this.files.push({data:el, url:reader.readAsDataURL(el)})
    // });
    this.files = this.data
    this.date = this.log
    this.isComplete = (this.log!="")
  },
  // inheritAttrs:false,
  watch:{
    $route(){
      this.data.length=0;//ここでデータをサーバからとる
                        // 今は初期化しているが、サーバ取得の関数に後ほど変更
      this.files = this.data
      this.date = this.log
      this.isComplete = (this.log!="")
    }
  },
  created: function () {
    window.onbeforeunload = function () {
      return '保存されていないデータは破棄されます。'
    }
 },
destroyed () {
    window.onbeforeunload = null
 }
}
</script>

<style>
.home{
  height:900px;
  width:100%;
  display:flex;
  justify-content: center;
  flex-direction: row;
}
.file-view{
  height: 100%;
  width:75%;
}
.view-header{
  height: 90px;
  margin-bottom: 10px;
}
.add-button{
  margin-left:40px;
  height:60px;
  width:60px;
  margin-top:20px;
  display:flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgb(84, 122, 247);
  color: white;
}

.add-button input[type="file"]{
  opacity: 0;
  position: absolute;
  height: 60px;
  width:60px;

}

.file-num{
  position: absolute;
  height: 20px;
  width: 20px;
  border:solid;
  border-color: rgb(84, 143, 252);
  border-radius: 50%;
  background-color: white;
  color: rgb(84, 122, 247);
  font-size:10px;
  right:-4px;
  top:-7px;
}

.file-num p{
  margin-top:5px;
}

.number-and-date{
  margin-top:10px;
}
.file-item{
  float:left;
  position:relative;
  border: solid;
  border-width: 1px;
  margin:5px;
}
.file-item button{
  position:absolute;
  border-radius: 50%;
  background-color: black;
  color:white;
  height: 20px;
  width:20px;
  border-width: 0px;
  right:-4px;
  top:-4px;
}
.file-item img{
  height:200px;
  width:200px;
}
.file-item div{
  font-size:6px;
  position: absolute;
  width:100%;
  text-align: center;
  bottom:5px;
}
.file-manager{
  height :100%;
  width:25%;
  padding:0px 10px 0px 10px;
  display:flex;
  flex-direction:column;
  border-left: solid;
}
.assessment-button{
  height:60px;
}
.button-true{
  height:45px;
  margin:15px;
  padding:0px;
  background-color: rgb(84, 122, 247);
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 15px;
  
}
.button-false{
  height:45px;
  margin:15px;
  background-color: rgb(204, 204, 204);
  border-radius: 10px;
  color: black;
  border: none;
  font-size: 15px;
  padding:0px;
}
.cancel-button{
  height:45px;
  margin:15px;
  background-color: rgb(84, 122, 247);
  border-radius: 10px;
  color: white;
  border: none;
  text-decoration: none;
  
}
.cancel-button p{
  font-size: 15px;
  margin-top:12px;
}
</style>