import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// import './index.css'
import styles from './index.module.css'

function NavHeader({title, history, onLeftClick}) {
    // 左侧返回按钮的默认点击事件
    const defaultPrevent = () => history.goBack()

    return (
        // 顶部导航
        <NavBar className={styles.navbar} mode="light" icon={< i className="iconfont icon-back" />}
            onLeftClick={ onLeftClick || defaultPrevent}
        > {title}</NavBar >
    )
}

// 添加 props 校验
NavHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onLeftClick: PropTypes.func
}

// 使用 withRouter 包裹函数组件，使其具备 history 路由功能
export default withRouter(NavHeader)