import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import { getCurrentCity } from '../../../utils/location'

import { BASE_URL } from '../../../utils/url'
// 导入封装的 fetch 请求
import { API } from '../../../utils/api'

// 导入导航栏图片
import nav1 from '../../../assets/images/nav-1.png'
import nav2 from '../../../assets/images/nav-2.png'
import nav3 from '../../../assets/images/nav-3.png'
import nav4 from '../../../assets/images/nav-4.png'

import './index.css'
import SearchHeader from '../../../components/SearchHeader'

const navList = [
    { name: '整租', src: nav1, path: '/home/list' },
    { name: '合租', src: nav2, path: '/home/list' },
    { name: '地图找房', src: nav3, path: '/map' },
    { name: '去出租', src: nav4, path: '/rent/add' }
]

export default class extends React.Component {
    state = {
        // 轮播列表数据
        swiperList: [],
        // 租房小组列表数据
        groupList: [],
        // 资讯列表数据
        newsList: [],
        // 当前城市信息
        cityName: ''
    }

    // 获取轮播图数据
    async getSwiperList() {
        // 需要用 json() 方法转换二进制数据流得到 响应数据
        const res = await API.get('/home/swiper')
        console.log(res);

        if (res.status === 200) {
            this.setState({
                swiperList: res.body
            })
        }
    }

    // 获取租房小组数据
    async getGroupList() {
        const res = await (await fetch('http://127.0.0.1:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')).json()
        console.log(res);

        if (res.status === 200) {
            this.setState({
                groupList: res.body
            })
        }
    }

    // 获取新闻列表
    async getNewsList() {
        const res = await (await fetch('http://127.0.0.1:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')).json()
        console.log(res);

        if (res.status === 200) {
            this.setState({
                newsList: res.body
            })
        }
    }

    // 获取城市名称
    async getCityName() {
        const res = await getCurrentCity()
        this.setState({
            cityName: res.label
        })
    }

    componentDidMount() {
        // 获取轮播图数据
        this.getSwiperList()
        // 获取租房小组数据
        this.getGroupList()
        // 获取新闻列表
        this.getNewsList()

        // 调用百度API，获取当前城市信息
        this.getCityName()
    }

    render() {
        return (
            <div>
                <div className="swiper">
                    {/* 轮播图 */}
                    <Carousel key={this.state.swiperList.length} autoplay infinite>
                        {this.state.swiperList.map(i => (
                            <a key={i.id} href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: 212 }}>
                                <img src={BASE_URL + i.imgSrc} alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }} />
                            </a>
                        ))}
                    </Carousel>

                    {/* 搜索框 */}
                    <SearchHeader cityName={this.state.cityName} />
                </div>

                {/* 导航菜单 */}
                <Flex className="nav">
                    {navList.map((i, idx) => (
                        <Flex.Item key={idx} onClick={() => { this.props.history[i.path.startsWith('/home') ? 'replace' : 'push'](i.path) }}>
                            <img src={i.src} alt="" />
                            <h2>{i.name}</h2>
                        </Flex.Item>
                    ))}
                </Flex>

                {/* 租房小组 */}
                <div className="group">
                    {/* 头部小标题 */}
                    <h3 className="group-title">
                        租房小组 <span className="more">更多</span>
                    </h3>
                    <Grid data={this.state.groupList} columnNum={2}
                        square={false} activeStyle={true}
                        renderItem={item => (
                            <Flex className="group-item" justify="around">
                                <div className="desc">
                                    <p className="title">{item.title}</p>
                                    <span className="info">{item.desc}</span>
                                </div>
                                <img src={`http://127.0.0.1:8080${item.imgSrc}`} alt=""/>
                            </Flex>
                        )}
                    />
                </div>

                {/* 新闻资讯 */}
                <div className="news">
                    <h3 className="news-title">最新资讯</h3>
                    <WingBlank size="md">
                        {this.state.newsList.map(item => (
                            <div className="news-item" key={item.id}>
                                <div className="imgwrap">
                                    <img src={`http://127.0.0.1:8080${item.imgSrc}`} alt=""/>
                                </div>
                                <Flex className="content" direction="column" justify="between">
                                    <h3 className="title">{item.title}</h3>
                                    <Flex className="info" justify="between">
                                        <span>{item.from}</span>
                                        <span>{item.date}</span>
                                    </Flex>
                                </Flex>
                            </div>
                        ))}
                    </WingBlank>
                </div>

            </div>
        )
    }
}