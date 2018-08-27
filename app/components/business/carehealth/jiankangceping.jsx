/**
 * Created by conivision on 2017/7/27.
 */
import React, { Component, PropTypes } from 'react'
import './index.less'

class JianKangCePing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="rit-guanaijiankang-bg">{this.props.children}</div>
        );
    }
}

// JianKangCePing.propTypes = {
//     children: PropTypes.any
// };

// JianKangCePing.defaultProps = {
//     children: null
// };

// JianKangCePing.displayName = 'JianKangCePing';

export default JianKangCePing
