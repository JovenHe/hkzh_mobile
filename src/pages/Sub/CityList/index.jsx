import React from 'react'
import { Toast } from 'antd-mobile';
// 导入 react-virtualized 长列表组件
import { List, AutoSizer } from 'react-virtualized';

import './index.css'
import { getCurrentCity, CURRENT_CITY_KEY } from '../../../utils/location';
import NavHeader from '../../../components/NavHeader';

// 格式化城市列表数据
const parseCityList = (list) => {
    const cityList = {}

    list.forEach(item => {
        // 拿到开头字母
        const letter = item.short[0]

         if(cityList[letter]) {
             cityList[letter].push(item)
         } else {
             cityList[letter] = [item]
         }
    })

    const cityIndex = Object.keys(cityList).sort()

    return {cityList, cityIndex}
}

// 准备一个映射数组处理索引数组前两项
const cityIndexWraper = {
    '#': '当前城市',
    hot: '热门城市'
}

// 城市列表每一行标题的高度
const TITLE_HEIGHT = 36;
// 城市列表每一行城市名称的高度
const NAME_HEIGHT = 50;
// 存在房源信息的城市
const HOST_CITY = ['北京', '上海', '广州', '深圳']

export default class extends React.Component {
    state = {
        cityList: {},
        cityIndex: [],
        // 右侧索引列表当前激活状态的索引
        activeIndex: 0
    }

    listRef = null

    // 获取所有一级城市列表
    async getCityList() {
        const res = await (await fetch('http://127.0.0.1:8080/area/city?level=1')).json()
        console.log(res);

        if(res.status === 200) {
            // 格式化城市列表数据
            const { cityList, cityIndex } = parseCityList(res.body)
            const hotCityList = await this.getHotCity()
            console.log(hotCityList);

            // 将热门城市信息添加到处理的数据中
            cityList['hot'] = hotCityList
            cityIndex.unshift('hot')

            // 获取当前城市信息，添加到城市列表数据
            const currentCity = await getCurrentCity()
            // currentCity => 对象{}，需要处理成数组[]储存进去
            cityList['#'] = [currentCity]
            cityIndex.unshift('#')

            console.log( cityList, cityIndex);
            this.setState({ cityList, cityIndex })
            // 提前计算所有行的高度
            // this.setState({ cityList, cityIndex }, () => this.listRef.measureAllRows())
        }
    }

    // 获取热门城市列表数据
    async getHotCity() {
        const res = await (await fetch('http://127.0.0.1:8080/area/hot')).json()
        console.log(res);

        return res.body || []
    }

    rowRenderer({
        key, // 唯一 Key
        index, // 索引号
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项在List中是可见的
        style, // 重点属性：一定要给每一个行数添加该样式
      }) {
        // 每一项的索引
        const cityIndexName = this.state.cityIndex[index]

        return (
            <div key={key} style={style} className="city">
                {/* 渲染索引号 */}
                <div className="title">{cityIndexWraper[cityIndexName] || cityIndexName.toUpperCase()}</div>
                {this.state.cityList[cityIndexName].map(item => (
                    <div className="name" key={item.value} onClick={() => this.changeCity(item)}>
                        {item.label}
                    </div>
                ))}
            </div>
        )
    }

    // 获取每一行的高度
    getRowHeight({index}) {
        const { cityIndex, cityList } = this.state;

        return cityList[cityIndex[index]].length * NAME_HEIGHT + TITLE_HEIGHT
    }

    // 渲染右侧索引列表
    renderCityIndex() {
        const { activeIndex } = this.state;

        return (
            <ul className="city-index">
                {this.state.cityIndex.map((item, idx) => (
                    <li className="city-index-item" key={item} onClick={this.scrollToRow.bind(this, idx)}>
                        <span className={activeIndex === idx ? 'index-active' : ''}>
                            {item === 'hot' ? '热' : item.toUpperCase()}
                        </span>
                    </li>
                ))}
            </ul>
        )
    }

    // 城市索引列表高亮
    onRowsRendered({startIndex}) {
        if(startIndex !== this.state.activeIndex) {
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    // 根据索引滚动到对应的位置
    scrollToRow(index) {
        this.listRef.scrollToRow(index)
    }

    // 点击城市名称切换当前城市
    changeCity({ label, value }) {
        if (HOST_CITY.includes(label)) {
            localStorage.setItem(CURRENT_CITY_KEY, JSON.stringify({ label, value }))
            this.props.history.goBack()
        } else {
            Toast.info('当前城市没有房源', 1, null, false)
        }
    }

    componentDidMount() {
        // 获取所有一级城市列表
        this.getCityList()
    }

    render() {
        return (
            <div className="citylist">
                {/* 顶部导航栏 */}
                <NavHeader title="城市选择" />

                {/* 城市长列表 */}
                <AutoSizer>
                    {({height, width}) => (
                        <List
                            ref={el => this.listRef = el}
                            scrollToAlignment="start"
                            width={width}
                            height={height - 45}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowHeight.bind(this)}
                            rowRenderer={this.rowRenderer.bind(this)}
                            onRowsRendered={this.onRowsRendered.bind(this)}
                        />
                    )}
                </AutoSizer>
                
                {/* 右侧索引列表 */}
                {this.renderCityIndex()}

            </div>
        )
    }
}