<template>
  <div class="home">
    <!-- ドラックされているとき、色を暗くする -->
    <div class="drag-and-drop" @drop.prevent="dropFile" @dragover.prevent>
      <!-- 周りと色を違くする -->
      <!-- drop,dragoverでファイルのドラック＆ドロップを実装 -->
      
      <img src="" alt="pdf-icon">
      <!-- .pdfのイメージ -->

      <div class="select-button">
        <!-- テキスト「＋ PDFファイルを選択してください」 -->
        <div>+</div>
        <div>
          PDFファイルを選択してください
        </div>
        <input type="file" name="file" accept=".pdf" @change="selectedFile" multiple>
      </div>
      <div>
        または、ここにPDFファイルをドロップしてください
      </div>
      <div>
        <!-- テキスト「または～32MBです」 -->
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
    }
  },
  methods:{
    dropFile(){
      //effects  ファイルの配列にドロップしたファイルを代入
      //         ファイルを入手後に親にファイルの配列をemit
      this.files = [...event.dataTransfer.files];
      this.$emit("handOverFile",this.files)
    },
    selectedFile(e){
      e.preventDefault();
      let files = Array.from(e.target.files);
      this.files=files
      this.$emit("handOverFile",this.files)
    }
  }
}
</script>

<style>
.home{
  height:800px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drag-and-drop{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin:3px;
  padding: 0px;
  height:80%;
  width:80%;
  background-color: rgb(218, 214, 214);
}
.select-button{
  margin-left:40px;
  height:30px;
  width:80%;
  display:flex;
  justify-content: space-around;
  background-color: rgb(57, 96, 226);
  color: white;
}
.select-button input[type="file"]{
  opacity: 0;
  position: absolute;

}
</style>