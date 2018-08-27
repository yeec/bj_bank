/**
 * Created by conivision on 2016/6/15.
 */
import React, { Component, PropTypes } from 'react'
import './index.less'

class BaoXianList extends Component {

	constructor( props ){
		super( props );
		this.state = {
        	imgUrl: this.props.imgUrl,
			qixian: this.props.qixian,
			money: this.props.money,
            age: this.props.age,
        }
	}
	
	render(){
		return (
			// <div className="ryt-jiankuang-xiaozhishi-cia1" onClick={this.props.handleClick}>
			// 	<img className="ryt-jiankuang-xiaozhishi-pic" src={this.props.imgUrl}/>
			// 	<div className="ryt-jiankuang-xiaozhishi-text">{this.props.qixian}</div>
			// </div>
			<div className="rit-lc">
				<div className="ryt-jiankuang-xiaozhishi-hight"></div>
				<div className="rit-lc-xbz-card">
					<div className="rit-lc-xbz-card-bg1">
						<img className="ryt-jiankuang-baoxian-img" onClick={this.props.handleClick} src={this.props.imgUrl}/>
					</div>
					<div className="rit-lc-xbz-card-list">
						<div className="rit-lc-xbz-card-list-li1">
							<div className="rit-lc-xbz-card-list-li-top1">{this.props.money}元</div>
							<div className="rit-lc-xbz-card-list-li-buttom">最低投保额</div>
						</div>
						<div className="ryt-jiankuang-xiaozhishi-highta"></div>
						<div className="rit-lc-xbz-card-list-li-left"></div>
						<div className="rit-lc-xbz-card-list-li1">
							<div className="rit-lc-xbz-card-list-li-top2">{this.props.age}</div>
							<div className="rit-lc-xbz-card-list-li-buttom">投保年龄</div>
						</div>
						<div className="ryt-jiankuang-xiaozhishi-highta"></div>
						<div className="rit-lc-xbz-card-list-li1">
							<div className="rit-lc-xbz-card-list-li-top2">{this.props.qixian}</div>
							<div className="rit-lc-xbz-card-list-li-buttom">投保期限</div>
						</div>
					</div>
				</div>
				<div className="ryt-jiankuang-xiaozhishi-hights"></div>
			</div>
		);
	}
}

// BaoXianList.propTypes = {
// 	imgUrl: PropTypes.string,
// 	qixian: PropTypes.string,
// 	money: PropTypes.string,
//     age: PropTypes.string,
// };

// BaoXianList.defaultProps = {
// 	imgUrl: '',
// 	qixian: '',
// 	money: '',
//     age: '',
// };

// BaoXianList.displayName = 'BaoXianList';

export default BaoXianList;
