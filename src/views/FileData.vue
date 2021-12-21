<template>
  <div class="home">
    <div id="file-views" v-bind:class="{'file-view':!(files.length>=30 || isComplete),'file-view-f':(files.length>=30 || isComplete),performFileView:isDrag}" @drop.prevent="dropFile" @dragover.prevent   @dragover="dragColor" @dragleave="dragNomal">
      <!-- アップロードしたファイルを並べるエリア -->
      <div class="view-header">
        <div id="add-button" :class="{'add-button':!(files.length>=30 || isComplete),'add-button-f':(files.length>=30 || isComplete)}">
          <input class="add-input" :class="{'add-pointer':!(files.length>=30 || isComplete)}" type="file" name="file" accept=".pdf" @change="addFile" multiple :disabled="(files.length>=30 || isComplete)">
          <div class="file-num"><p>{{files.length}}</p></div>
          <h1 :class="{'add-pointer':!(files.length>=30 || isComplete)}">+</h1>
          <!-- <input class="add-input" type="file" name="file" accept=".pdf" @change="addFile" multiple :disabled="(files.length>=30 || isComplete)"> -->
        </div>
        <div class="number-and-date">  {{assess_num}}<br/>{{date}}</div>
      </div>
      <div v-for="(file,k) in files" v-bind:key="k" class="file-item">
        <!-- <iframe src="${file.name}" width="400px" heitght="600px"></iframe> -->
        <button @click="removeFile(k)" :disabled="loadImgClass(k)" :class="{'delete-button':!loadImgClass(k),'delete-button-f':loadImgClass(k)}">x</button>
        <img src="@/assets/pdf_icon2.jpeg" alt="">
        <img src="@/assets/support-loading.gif" alt="" v-if="loadImgClass(k)" class="load-gif">
        <div>{{file.name}}</div>
        
      </div>
    </div>
    <div class="file-manager">
      <!-- 見積査定、一括ダウンロード、取消 or 新規査定 -->
      <p>PDfからEXCEL</p>
      <!-- <button :class="changeButton(true)" v-bind:disabled="isComplete">見積査定</button> -->
      <div class="message-log">
        ファイルを追加すると処理を開始します。<br>
        現在の処理対象は<span class="message-num">{{files.length}}ファイル</span>です。<br> <br>
        <span class="message-small">(同時に処理できるファイルは30個までです)</span>
      </div>
      <p>
        {{message}}
        <!-- Messageに変更予定。履歴からのアクセスか、
             ファイルドロップからのアクセスか、見積査定状態かによって変わる -->
      </p>
      <button :class="changeButton(false)" v-bind:disabled="!isComplete">一括ダウンロード</button>
      <button class="cancel-button" :class="changeButton(false)" v-bind:disabled="!isComplete" @click="moveToTop"><p>新規見積査定開始</p></button>
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
      isAbleToUpload:true,//アップロード許可のtrue or false
      isComplete:false,// 送信の完了のtrue or false
      isUpload:true,
      message:"処理中です。しばらくお待ちください。",
      isDrag:false,
      // loadImgClass:"load-gif-f"
      loadIndex:0,
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
    moveToTop(){
      this.$router.push("/");
    },
    /*
    changeUploadUI(){
      if(this.file.length>=30 || this.isComplete){
        this.isAbleToUpload=false
       
      }else{
        this.isAbleToUpload=true
      }
    },
    */ 
    dropFile(){
      //effects  ファイルの配列にドロップしたファイルを代入
      if(this.isAbleToUpload){
        let newFiles = [...event.dataTransfer.files];
        for(let i=0;i<newFiles.length;i++){
          this.files.push(newFiles[i]);
        }
      }
    },
    dragColor(){
      if(this.isAbleToUpload){
        this.isDrag=true;
      }
    },
    dragNomal(){
     this.isDrag=false;
    },
    loadImgClass(index){
      if(this.loadIndex==index){
        return true
      }else{
        return false
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
    this.isComplete = (this.log!="") 
    // this.changeUploadUI
    if(this.$route.path=="/fileData/edit" && this.files.length==0){
      this.$router.push("/")
      //console.log("OK")
    }
  },
  // inheritAttrs:false,
  watch:{
    $route(){
      this.data.length=0;//ここでデータをサーバからとる
                        // 今は初期化しているが、サーバ取得の関数に後ほど変更
      
      this.files = this.data
      this.date = this.log
      this.isComplete = (this.log!="")
      // this.changeUploadUI;
      
    },
    isComplete(){
      // this.changeUploadUI;
      // console.log(this.isComplete)
    },
    files(){
      // this.changeUploadUI;
      // console.log(this.files.length)
    }
  },
  created: function () {
    window.onbeforeunload = function () {
      // this.$router.push("/")
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
  background-color: rgb(240,240,240);
}

.file-view-f{
  height: 100%;
  width:75%;
  background-color: white;
}

.performFileView{
  background-color: rgba(240,240,240,0.4);
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
  cursor: pointer;
}

.add-button-f{
  margin-left:40px;
  height:60px;
  width:60px;
  margin-top:20px;
  display:flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgb(204, 204, 204);
  color: white;
}

.add-pointer{
  cursor: pointer;
}

.add-input{
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
  height:150px;
  width:150px;
  position:relative;
  border: solid;
  border-width: 1px;
  border-color:rgb(223, 223, 223);
  margin:5px;
}
.delete-button{
  position:absolute;
  border-radius: 50%;
  background-color: black;
  color:white;
  height: 20px;
  width:20px;
  border-width: 0px;
  right:-4px;
  top:-4px;
  cursor: pointer;
}
.delete-button-f{
  position:absolute;
  border-radius: 50%;
  background-color: rgb(204, 204, 204);
  color:black;
  height: 20px;
  width:20px;
  border-width: 0px;
  right:-4px;
  top:-4px;
}
.file-item img{
  height:150px;
  width:150px;
}

.load-gif{
  position: absolute;
  left: -2px;
  bottom:1px;
  opacity: 1;
}

.load-gif-f{
  position: absolute;
  left: -2px;
  bottom:1px;
  opacity: 0;
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

.message-num{
  color:rgb(84, 122, 247); 
}
.message-small{
  font-size:12px;
}

.button-true{
  height:60px;
  margin:15px;
  padding:0px;
  background-color: rgb(84, 122, 247);
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
}
.button-false{
  height:60px;
  margin:15px;
  background-color: rgb(204, 204, 204);
  border-radius: 10px;
  color: black;
  border: none;
  font-size: 15px;
  padding:0px;
}
.cancel-button{
  
  border: none;
  text-decoration: none;
  
}
.cancel-button p{
  font-size: 15px;
  margin-top:12px;
}
</style>