import React from 'react'
import SearchHeader from '../../../components/SearchHeader'
import { Flex } from 'antd-mobile'

import { getCurrentCity } from '../../../utils/location'
import styles from './index.module.css'

import Filter from './components/Filter/index'


export default class extends React.Component {
    state = {
        cityName: ''
    }

    async componentDidMount() {
        const { label } = await getCurrentCity()
        this.setState({ cityName: label })
    }

    render() {
        return (
            <div>
                <Flex className={styles.header}> 
                    <i className="iconfont icon-back" onClick={() => this.props.history.goBack()}></i>
                    <SearchHeader cityName={this.state.cityName} className={styles.searchHeader} />
                </Flex>

                <Filter />
            </div>
        )
    }
}