<template>
  <div class="home">
    <!-- ドラックされているとき、色を暗くする -->
    <div class="drag-and-drop" @drop.prevent="dropFile" @dragover.prevent :class={dragPerform:isDrag} @dragover="dragColor" @dragleave="dragNomal">
      <!-- 周りと色を違くする -->
      <!-- drop,dragoverでファイルのドラック＆ドロップを実装 -->
      
      <img src="@/assets/pdf_icon2.png" alt="pdf-icon">
      <!-- .pdfのイメージ -->

      <div class="select-button">
        <!-- テキスト「＋ PDFファイルを選択してください」 -->
        <h1>+</h1>
        <h4>
          PDFファイルを選択してください
        </h4>
        <input type="file" name="file" accept=".pdf" @change="selectedFile" multiple>
      </div>
      <div>
        <h4>
          または、ここにPDFファイルをドロップしてください
        </h4>
        <h6>
          ＊ファイル容量制限は32MBです
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Top",
  data(){
    return{
      files:[],// ファイルの配列
      isDrag:false
    }
  },
  methods:{
    dropFile(){
      //effects  ファイルの配列にドロップしたファイルを代入
      //         ファイルを入手後に親にファイルの配列をemit
      let recieveFiles= [...event.dataTransfer.files];
      for(let i=0;i<recieveFiles.length;i++){
        let extention = recieveFiles[i].name.split(".").pop()
        if(extention == "pdf"){
          this.files.push(recieveFiles[i])
        }
      }
      this.$emit("handOverFile",this.files)
    },
    selectedFile(e){
      e.preventDefault();
      // console.log(e.target.result);
      
      let files = Array.from(e.target.files);
      this.files=files
      this.$emit("handOverFile",this.files)
    },
    dragColor(){
      this.isDrag=true;
    },
    dragNomal(){
      this.isDrag=false;
    }
  },
  mounted(){
    this.$emit("handOverFile",this.files)
    
  }
}
</script>

<style>
.home{
  height:800px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.drag-and-drop{
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  flex-direction: column;
  margin:2em;
  padding: 1em;
  height:60%;
  width:80%;
  background-color: rgb(240, 240, 240);
}

.drag-and-drop img{
  height:200px;
  width:200px;
}

.dragPerform{
  opacity:0.4;
}

.select-button{
  /* margin-left:70px; */
  height:70px;
  width:100%;
  display:flex;
  justify-content: flex-start;
  background-color: rgb(84, 122, 247);
  border-radius: 30px;
  color: white;
  position: relative;
  cursor: pointer;
}
.select-button h1{
  margin-top:17px;
  width:100px;
  cursor: pointer;
}
.select-button h4{
  width:80%;
  text-align: center;
  cursor: pointer;
}

.select-button input[type="file"]{
  opacity: 0;
  position: absolute;
  height:70px;
  width:100%;
  cursor: pointer;
}
</style>