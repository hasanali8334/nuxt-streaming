<template>
     <div >
    
     
      
      <button @click="precamera()">Prepare Camera</button>
      <button @click="yayinla()">Prepare Camera</button>
    

    
    <video class="player"></video>

    <video class="streaming"></video>
    
  </div>
</template>
<script>
//var fsWriteStreamAtomic = require('fs-write-stream-atomic')

export default {
    data(){
        blobdata:'';
        video:'';
        stream:'';
        recorder:'';
        blob:'';
        file:'';
        formData:'';
        writestream:'';
        //fs:'';
        
        
    },
   
    
    methods:{

    
         async precamera(){
      // this.writestream= this.fsWriteStreamAtomic('output.webm')
             this.video=document.querySelector('.player');
            this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
            // this.recorder = new RecordRTC(this.stream, {type: 'video'});
           // this.stream.pipe(this.writestream);
            this.video.srcObject=this.stream;
            this.video.play();
            
            },
            async yayinla(){
            await  this.stream.on('data', (chunk)=>{
                console.log(chunk.size);
              });
             }
    }
}
            



     
  
    
    



</script>