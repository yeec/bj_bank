/**
 * Created by conivision on 2016/6/15.
 */
import React, { Component, PropTypes } from 'react'
import './index.less'

class JianKangCePingList extends Component {

	constructor( props ){
		super( props );
		this.state = {
			imgUrl: this.props.imgUrl
        }
	}
	
	render(){
		return (
			<div className="rit-guanaijiankang-bg-bgimg" onClick={this.props.clickhandle}>
				<img className="ryt-jiankuang-xiaozhishi-pic7" src={this.props.imgUrl}/>
			</div>
				
		);
	}
}

// JianKangCePingList.propTypes = {
// 	imgUrl: PropTypes.string,
// 	srcUrl: PropTypes.string
// };

// JianKangCePingList.defaultProps = {
// 	imgUrl: '',
// 	srcUrl: ''
// };

// JianKangCePingList.displayName = 'JianKangCePingList';

export default JianKangCePingList;
