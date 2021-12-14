<template>
  <div class="home">
    <div class="file-view">
      <!-- アップロードしたファイルを並べるエリア -->
      
      <div class="add-button">
        <div>+</div>
        <input type="file" name="file" accept=".pdf" @change="addFile" multiple>
      </div>
      <div class="date-and-number">{{date}}</div>
      <div v-for="(file,k) in files" v-bind:key="k">
        <!-- <iframe src="${file.name}" width="400px" heitght="600px"></iframe> -->
        {{file.name}}
        <button @click="removeFile(k)">x</button>
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
      <router-link to="/" class="cancel-button">取消</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:"FileData",
  props:['data','log'],
  data(){
    return{
      files:[],
      ID:"",//ユーザID
      jobNum :"",// 処理number
      date:"",//日付
      isAbleToDrop:true,//ドロップ許可のtrue or false
      isComplete:false,// 送信の完了のtrue or false
      Message:"",//状態のメッセージ
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
    }
  },
  mounted(){
    // let reader = new FileReader()
    // this.data.forEach(el => {
    //   this.files.push({data:el, url:reader.readAsDataURL(el)})
    // });
    this.files = this.data
    this.date = this.log
    this.isComplete = (this.log!=undefined)
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
  width:66%;
}
.add-button{
  margin-left:40px;
  height:30px;
  width:30px;
  display:flex;
  
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgb(84, 122, 247);
  color: white;
}
.add-button input[type="file"]{
  opacity: 0;
  position: absolute;

}

.file-manager{
  height :100%;
  width:34%;
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
  background-color: rgb(98, 144, 228);
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
}
.cancel-button{
  height:45px;
  margin:15px;
  background-color: rgb(98, 144, 228);
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 15px;
}
</style>