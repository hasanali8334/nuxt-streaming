import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    const messages = []
    const spawn = require('child_process').spawn
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

    
    io.on('connection', socket => {
        const ffmpegSettings = '.sdp -b 900k -vcodec copy -r 60 -y'
        const streamUrl = 'rtmp://localhost:3000/channel'
        const command = `${ffmpegPath} -i pipe:0 ${ffmpegSettings} "${streamUrl}"`
       // const command = `${ffmpegPath} -i pipe:0  "${streamUrl}"`
        const ffmpeg = spawn(command, { shell: true })
        // ffmpeg -i rtsp://192.168.XXX.XXX:554/live.sdp -b 900k -vcodec copy -r 60 -y MyVdeoFFmpeg.avi
        
  
          socket.on('stream-video-chunk', function(chunk) {
              ffmpeg.stdin.write(chunk)
          })
    })
  })
}


