import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
import { getCurrentCity } from '../../../../../utils/location'
import { API } from '../../../../../utils/api'

export default class Filter extends Component {
  state = {
    selected: '',
    openType: undefined,
    // 筛选条件的数据
    filtersData: {}
  }

  onselected(type) {
    this.setState({
      selected: this.state.selected + (this.state.selected.includes(type) ? '' : ' '+ type),
      openType: type
    })
  }

  onCancel() {
    this.setState({
      openType: undefined
    })
  }

  onOk() {
    this.setState({
      openType: undefined
    })
  }

  // 获取筛选数据
  async getFilterData() {
    const { value } = await getCurrentCity()
    const res = await API.get('/houses/condition', { id: value })
    console.log(res);

    this.setState({
      filtersData: res.body
    })
  }

  // 渲染FilterPicker组件的方法
  renderFilterPicker() {
    const { openType, filtersData: { area, subway, rentType, price }} = this.state

    if('area mode price'.includes(openType)) {
      // 拼接数据
      let data = [];
      // pickerView 显示的列数
      let cols = 3;
      switch (openType) {
        case 'area':
          // 区域数据
          data = [area, subway];
          break;
        case 'mode':
          // 方式数据
          data = rentType;
          cols = 1;
          break;
        case 'price':
          // 租金数据
          data = price;
          cols = 1;
          break;
        default: break;
      }

      return <FilterPicker type={openType} onCancel={this.onCancel.bind(this)} onOk={this.onOk.bind(this)} data={data} cols={cols} /> 
    } else return null
  }

  renderFilterMore() {
    const { openType, filtersData: { area, subway, rentType, price, ...data }} = this.state

    return openType === 'more' && <FilterMore data={data} onCancel={this.onCancel.bind(this)} />
  }

  componentDidMount() {
    this.getFilterData()
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {'area mode price'.includes(this.state.openType) ? <div className={styles.mask} /> : ''}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle selected={this.state.selected} onClick={this.onselected.bind(this)} />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
