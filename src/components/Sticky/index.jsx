import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <div>
                {/* 展位元素 */}
                <div />
                {/* 内容元素 */}
                <div>{this.props.children}</div>
            </div>
        )
    }
}