import React, { Component } from 'react'

import FilterFooter from '../../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    selectedValues: []
  }

  // 渲染标签
  renderFilters(ary) {
    const { selectedValues } = this.state

    // 高亮类名： styles.tagActive
    return ary.map(item => (
      <span key={item.value} className={[styles.tag, selectedValues.includes(item.value) ? styles.tagActive : ''].join(' ')} onClick={() => this.tagClick(item.value)}>{item.label}</span>
    ))
  }

  tagClick(value) {
    const  { selectedValues } = this.state

    selectedValues.some((i, idx, arr) => i === value && arr.splice(idx, 1)) || selectedValues.push(value)

    this.setState({selectedValues})
  }

  render() {
    const { roomType, oriented, floor, characteristic } = this.props.data

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={this.props.onCancel}/>

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} />
      </div>
    )
  }
}
