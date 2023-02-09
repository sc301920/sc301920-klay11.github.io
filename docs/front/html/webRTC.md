# webRTC
WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接 

**考虑兼容性**
## 应用场景
- 直播
- 游戏
- 视频会议/在线教育
- 屏幕共享/远程控制
## 摄像头获取媒体流及一些其他操作
1. `<video id="localVideo" autoplay playsinline muted></video>`

**需要注意的是，WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错**

2. 通过navigator.mediaDevices.getUserMedia(constraints)这个 api 来获取媒体流
```
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
}
```
其中constraints指定了请求的媒体类型和相对应的参数，用于配置视频流和音频流的信息
通过navigator.mediaDevices.getSupportedConstraints()这个方法来获取支持哪些配置项
通常我们不设置constraints参数，那么默认就是获取摄像头和麦克风的媒体流
```
// 只想要获取摄像头的媒体流
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true,
})
```
3. 取通过摄像头获取媒体流后，将媒体流赋值给 video 标签的 srcObject 属性，让其播放
```
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 播放本地视频流
function playLocalStream(stream: MediaStream) {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  videoEl.srcObject = stream
}

getLocalStream({
  audio: false,
  video: true,
})
```
## 拍照功能
canvas 标签可以将媒体流绘制到 canvas 上
1. 媒体流获取同上
2. 将媒体流绘制到 canvas
```
ctx.filter = 'brightness(0.5)' // 滤镜
ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
imgList.value.push(canvas.toDataURL('image/png'))
```
## 切换摄像头
`navigator.mediaDevices.enumerateDevices`获取到所有的设备，然后筛选出 videoinput 类型的设备，最后通过不同的设备 id 来实现切换摄像头
1. 获取所有视频输入设备
```
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  let videoDevices = devices.filter((device) => device.kind === 'videoinput')
}
```
2. 切换设备
```
function handleDeviceChange(deviceId: string) {
  getLocalStream()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: deviceId },
    },
  })
}
```
##  切换前后摄像头
通过指定 facingMode 来实现，facingMode 有 4 个值，分别是 user、environment 和 left、right，分别对应前后摄像头和左右摄像头
```
// 切换前后摄像头
function switchCamera(val: number) {
  let constraints = {
    video: true, // 开启默认摄像头
    audio: true,
  }
  constraints.video = {
    // 强制切换前后摄像头时，当摄像头不支持时，会报一个OverconstrainedError［无法满足要求的错误］
    facingMode: { exact: val === 1 ? 'user' : 'environment' },
    // 也可以这样当前后摄像头不支持切换时，会继续使用当前摄像头，好处是不会报错
    // facingMode: val === 1 ? 'user' : 'environment',
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      ElMessage.success('切换成功')
      playLocalStream(stream)
    })
    .catch((err) => {
      ElMessage.error('你的设备不支持切换前后摄像头')
    })
}
switchCamera(1) // 切换前置摄像头
```
## 通过屏幕共享获取获取媒体流，实现录制等操作
1. 获取媒体流
在 WebRTC 中，我们可以通过 getDisplayMedia 来获取屏幕共享的媒体流
```
// 获取屏幕共享的媒体流
async function shareScreen() {
  let localStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  // 播放本地视频流
  playStream(localStream)
}

// 在视频标签中播放视频流
function playStream(stream: MediaStream) {
  const video = document.querySelector('#localVideo') as HTMLVideoElement
  video.srcObject = stream
}
```
>执行 shareScreen 函数后，会弹出一个权限询问框，询问是否允许获取屏幕共享的媒体流
>然后你就可以分享你的整个屏幕，如果你又多个屏幕的话，你可以选择其中一个进行分享
>你也可以选择只分享你屏幕上的某个应用的窗口
>共享前你可以随便选一个进行预览，然后可以选择是否分享的时候包含页面中的音频，这样你获取的媒体流就会包含音频轨道了
2. 实现录制
使用 MediaRecorder 来进行录制，它是一个用于录制媒体流的 API，它可以将媒体流中的数据进行录制，然后将录制的数据保存成一个文件
```
function startRecord() {
  const kbps = 1024
  const Mbps = kbps * kbps
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  }
  const mediaRecorder = new MediaRecorder(localStream, options)
  mediaRecorder.start()
  mediaRecorder.ondataavailable = (e) => {
    // 将录制的数据合并成一个 Blob 对象
    // const blob = new Blob([e.data], { type: e.data.type })
    // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4
    const blob = new Blob([e.data], { type: 'video/mp4' })
    downloadBlob(blob)
  }
  mediaRecorder.onstop = (e: Event) => {
    // 停止录制
  }
}

/ 下载 Blob
function downloadBlob(blob: Blob) {
  // 将 Blob 对象转换成一个 URL 地址
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
  a.href = url
  // 设置 a 标签的 download 属性为文件名
  a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`
  // 模拟点击 a 标签
  a.click()
  // 释放 URL 地址
  URL.revokeObjectURL(url)
}
```
