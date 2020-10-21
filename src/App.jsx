import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Button } from 'antd-mobile'

// 导入 ant design mobile 库样式
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'

import Main from './pages/Main'
import CityList from './pages/Sub/CityList'
import Map from './pages/Sub/Map'
import Search from './pages/Sub/Search'

// 导入全局样式
import './App.css'

const App = () => {
    return (
        <Router>
            {/* <Button type="primary">我是按钮</Button> */}
            <div className="app">
                {/* 默认路由 */}
                <Route path="/" exact render={() => <Redirect to="/home" />} />
                <Route path="/home" component={Main} />
                <Route path="/citylist" component={CityList} />
                <Route path="/search" component={Search} />
                <Route path="/map" component={Map} />
            </div>
        </Router>
    )
}

export default App