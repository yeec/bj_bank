/**
 * Created by conivision on 2016/6/15.
 */
import React, { Component, PropTypes } from 'react'
import './index.less'

class JianKangZhiShiList extends Component {

	constructor( props ){
		super( props );
		this.state = {
        	imgUrl: this.props.imgUrl,
            headertitle: this.props.headertitle,
        }
	}
	
	render(){
		return (
			<div className="ryt-jiankuang-xiaozhishi-cia1" onClick={this.props.handleClick}>
				<img className="ryt-jiankuang-xiaozhishi-pic" src={this.props.imgUrl}/>
				<div className="ryt-jiankuang-xiaozhishi-text">{this.props.headertitle}</div>
			</div>
		);
	}
}

// JianKangZhiShiList.propTypes = {
// 	imgUrl: PropTypes.string,
// 	headertitle: PropTypes.string
// };

// JianKangZhiShiList.defaultProps = {
// 	imgUrl: '',
// 	headertitle: ''
// };

// JianKangZhiShiList.displayName = 'JianKangZhiShiList';

export default JianKangZhiShiList;
