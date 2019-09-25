import React from 'react';

import qiniuUpload from './upload'


function App() {

  const ref = React.useRef();
  const [videoSrc, setVideoSrc] = React.useState('');

  const submit = () => {
    const file = ref.current.files
    console.log('视频上传中')
    qiniuUpload({
      file: file[0],
      uploadCallback: ({ msg }) => {
        console.log(msg)
      },
      successCallback: ({ url, msg, videoInfo }) => {
        setVideoSrc(url)
        console.log(msg)
        console.log('视频信息:', videoInfo)
      }
    })

  }


  return (
    <div>
      <video style={{
        width: 200,
        height: 200,
        border: '1px solid #ccc'
      }} controls autoPlay src={videoSrc}></video>
      <input type="file" ref={ref} accept="video/mp4" />
      <button onClick={submit}>提交</button>
    </div >
  );
}

export default App;
