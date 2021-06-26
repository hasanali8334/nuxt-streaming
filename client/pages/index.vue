<template>
  <div>
    <video ref="video" width="100%" muted />
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'
export default {
  data() {
    return {
      video: null,
      cameraStream: null,
      mediaRecorder: null,
    }
  },

  async mounted() {
      this.cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })

      this.video = this.$refs.video
      this.video.srcObject = this.cameraStream
      this.video.onloadedmetadata = () => {
        this.video.play()
      }
       this.mediaRecorder = new MediaRecorder(this.cameraStream, {
        mimeType: 'video/webm',
        videoBitsPerSecond: 3000000,
      })
      this.mediaRecorder.start(1000)

      this.mediaRecorder.ondataavailable = e => {
        socket.emit('stream-video-chunk', e.data)
      }
      
  }
}
</script>