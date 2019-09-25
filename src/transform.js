import http from './http'

const transformApi = data => {
    return http.get('/test/transform', data)
}

function transform(key) {
    return new Promise(async (resolve, reject) => {
        const res = await transformApi({ key })
        resolve(res)
    })
}

export default transform


