
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createDiscreteApi } from "naive-ui";

const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'])

export const httpInstance = axios.create({
    timeout: 1000 * 15,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    withCredentials: true,
})


export type BkResponse = {
    data: any,
    code: number,
    msg: string,
    succeed: boolean
}

// 请求拦截器
httpInstance.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

// if (process.env.NODE_ENV == 'development') {
httpInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL_DEV;
// }

// 响应拦截器
export const $http = async (config: AxiosRequestConfig) => {
    loadingBar.start()
    try {
        const axiosResponse = await httpInstance(config);
        const bkResponse = axiosResponse.data
        loadingBar.finish()
        return bkResponse
    } catch (err) {
        if (err instanceof AxiosError) {
            loadingBar.error()
            message.error(err.response?.data.message || err.message || "网络错误")
            throw err
        }
        throw err
    } finally {
        // 以错误形式结束加载条
        loadingBar.error()
    }
}
