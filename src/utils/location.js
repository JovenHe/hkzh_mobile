export const CURRENT_CITY_KEY = 'CURRENT_CITY'

export const getCurrentCity = () => new Promise((resolve, reject) => {
    // 获取本地存储的当前城市信息
    const city = localStorage.getItem(CURRENT_CITY_KEY);

    if(city) {
        resolve(JSON.parse(city))
    } else {
        // 不存在，获取当前城市信息
        new window.BMap.LocalCity().get(async result => {
            const res = await (await fetch(`http://127.0.0.1:8080/area/info?name=${result.name}`)).json()

            if (res.status === 200) {
                // 存储到本地
                localStorage.setItem(CURRENT_CITY_KEY, JSON.stringify(res.body));
                resolve(res.body)
            } else reject(res)
        })
    }
})