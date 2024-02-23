const { Porcupine, BuiltinKeyword } = require("@picovoice/porcupine-node");
const recorder = require('node-record-lpcm16');
const mic = require('mic');

const accessKey = "QIrZlpas1u2CRGA5IHXtMKDVnBLXWkj0PfZz0+tvCA4Kl1xdT8KMiA==";
let porcupine = new Porcupine(
  accessKey,
  ["C:\\Users\\Twang33\\testplace\\brother\\src\\wakeword_zh_windows_v3_0_0.ppn"],
  [0.5],
  "C:\\Users\\Twang33\\testplace\\brother\\src\\porcupine_params_zh.pv"
);

// const audioStream = recorder.record({
//   sampleRate: 16000, // 采样率，Picovoice 推荐使用 16000
//   threshold: 0, // 音频录制的静音阈值
//   verbose: false, // 如果你想要在控制台看到录音过程中的一些信息，可以设置为 true
//   recordProgram: "rec", // 依赖于你的系统，可能是 'rec', 'arecord', 'sox', 'parec' 等
//   silence: "10.0", // 如果超过这个时间没有检测到声音，录音将会停止，单位是秒
// });

// async function getNextAudioFrame() {
//   return new Promise((resolve, reject) => {
//     // 一次处理一帧数据
//     audioStream.once("data", (data) => {
//       resolve(data);
//     });
//   });
// }

// (async function() {
//     while (true) {
//       const audioFrame = await getNextAudioFrame();
//       const keywordIndex = porcupine.process(audioFrame);
//       if (keywordIndex >= 0) {
//         console.log("主人你说！");
//       } else {
//       }
//     }
// })( )

//  创建麦克风实例
const micInstance = mic({
    device: 'hw:2,0', //  设备ID可能需要根据你的系统进行调整
    encoding: 'signed-integer',
    bitwidth: '16',
    endian: 'little',
    rate: '44100',
    channels: '1',
    debug: true
});

//  获取音频流
const micInputStream = micInstance.getAudioStream();

// 监听麦克风输入流的数据事件
micInputStream.on('data', data => {
    //  将音频数据传递给Porcupine进行处理
    const keywordIndex = porcupine.process(data);
    if (keywordIndex >= 0) {
    console.log("我在，你说！");
    } else {
    }
});

// 启动麦克风
micInstance.start();

console.log('Started...........');
