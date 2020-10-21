import { BASE_URL } from './url'

const queryString = params => '?' + Object.keys(params).map(i => `${i}=${encodeURIComponent(params[i])}`).join('&')

const request = async (partialUrl, body, queryParams = {}, method, contentType) =>
    (await fetch(BASE_URL + partialUrl + queryString(queryParams), {
        method, body: body ? JSON.stringify(body) : null, headers: {
            ...method === 'POST' ? { 'Content-Type': contentType } : {}
        }
    })).json()



export const API = {
    get: (url, queryParams) => request(url, undefined, queryParams),
    post: (url, body, queryParams, contentType) => request(url, body, queryParams, 'POST', contentType)
}