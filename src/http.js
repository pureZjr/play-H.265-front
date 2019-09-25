import axios from 'axios'
import qs from 'qs'


class Http {
    get = (url, data) => {
        return this.HandleHttp('GET', url, data)
    }
    post = (url, data) => {
        return this.HandleHttp('POST', url, data)
    }

    BASE_URL = 'http://localhost:3333'

    HandleHttp = async (method, u, data) => {
        return new Promise(async (resolve, reject) => {
            let url = this.BASE_URL + u
            if (method === 'GET') {
                url = `${this.BASE_URL}${u}?${qs.stringify({ ...data })}`
            }
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const res = await axios.request({
                    url,
                    headers,
                    method,
                    data
                })
                switch (res.status) {
                    case 200:
                        resolve(res.data)
                        break
                    default:
                        reject(new Error(res.data.msg))
                }
            } catch (err) {
                reject(new Error('请求出错'))
            }
        })
    }
}

export default new Http()
