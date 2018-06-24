import axios from 'axios'
import * as Status from './status-type'

let count = 0
let timer = null

const sHref = process.env.API_HOST

axios.interceptors.request.use(res => {
    res.url = sHref + res.url

    count++
    return res
})

axios.interceptors.response.use(res => {
    count--

    clearTimeout(timer)

    if (!count) {

    }

    return res
}, err => {
    count--

    return err
})

const myAxios = (options) => {
    const defaultOpt = {
        method: 'get',
        url: '',
        params: {},
        timeout: 30000,
        responseType: 'json',
        data: {}
    }

    const opt = Object.assign(defaultOpt, options)

    const fireDate = new Date()

    return new Promise((resolve, reject) => {
        axios(opt).then(res => {
            if (res.status === Status.SUCCESS) {
                const resultDate = new Date()
                const timeDifference = resultDate.getTime() - fireDate.getTime()

                console.log(`${opt.url}响应： ${timeDifference} ms`)

                resolve(res.data)
            } else {
                reject(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export default myAxios
