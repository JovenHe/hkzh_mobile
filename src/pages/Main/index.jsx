import React from 'react'
import { Route } from 'react-router-dom'

import { TabBar } from 'antd-mobile'
import './main.css'

import Index from './Index/index'
import HouseList from './HouseList'
import News from './News'
import Profile from './Profile'

const tabBarArray = [{
    title: '首页', icon: 'icon-ind', path: '/home'
}, {
    title: '找房', icon: 'icon-findHouse', path: '/home/list'
}, {
    title: '资讯', icon: 'icon-infom', path: '/home/news'
}, {
    title: '我的', icon: 'icon-my', path: '/home/profile'
}]

export default class extends React.Component {
    state = {}

    renderTabBar() {
        return (
            <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent >
                {tabBarArray.map(i => (
                    <TabBar.Item
                    title={i.title}
                    key={i.title}
                    icon={<i className={`iconfont ${i.icon}`} />}
                    selectedIcon={<i className={`iconfont ${i.icon}`} />}
                    selected={this.props.history.location.pathname === i.path}
                    onPress={() => {
                        this.props.history.replace(i.path)
                    }}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }

    render() {
        return (
            <div className="main">
                {/* 子路由挂载点 */}
                <Route exact path="/home" component={Index} />
                <Route path="/home/list" component={HouseList} />
                <Route path="/home/news" component={News} />
                <Route path="/home/profile" component={Profile} />

                {/* 底部导航栏 */}
                {this.renderTabBar()}
            </div>
        )
    }
}