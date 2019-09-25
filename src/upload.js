import * as qiniu from 'qiniu-js'
import axios from 'axios'

import http from './http'
import transform from './transform'

const getQNToken = data => {
    return http.get('/test/qiniuToken', data)
}



async function qiniuUpload({ file, uploadCallback, successCallback }) {
    const startTime = new Date().valueOf()
    const { token } = await getQNToken()
    let observer = {
        next(res) {
        },
        async complete(res) {
            const url = `http://ss.purevivi.art/${res.key}`
            const endTime = new Date().valueOf()
            const timeConsuming = (endTime - startTime) / 1000
            axios
                .get(`${url}?avinfo`)
                .then(async response => {
                    if (JSON.stringify(response.data).indexOf('H.265') > 0) {
                        uploadCallback({
                            msg: '视频上传完毕，正在转码'
                        })
                        const transformRes = await transform(res.key)
                        const url = `http://ss.purevivi.art/${transformRes.key}`
                        successCallback({
                            url,
                            msg: `视频处理完毕，上传耗时${timeConsuming}秒，转码耗时${transformRes.timeConsuming}秒。`,
                            videoInfo: response.data
                        })
                    } else {
                        successCallback({
                            url,
                            msg: `视频上传完毕，耗时${timeConsuming}秒。`,
                            videoInfo: response.data
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })


        }
    }
    const observable = qiniu.upload(
        file,
        null,
        token,
        {
            fname: file.name
        },
        {
            uphost: 'upload-z2.qiniup.com'
        }
    )
    observable.subscribe(observer)
}

export default qiniuUpload 