import React, { Component, PropTypes } from 'react'
// import RcCollapse from 'rc-collapse';
import './bjyinhangbutton.less';

class Bjyinhangmenubutton extends Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
           title: this.props.title,
           classs: this.props.classs,
        }
        
    }
    render() {
        return (
            <div className="rit-menu-cardss" onClick={this.props.clickhandle}>
	            <button className={this.props.classs}>{this.props.title}</button>
	        </div>
        );
    }
}

Bjyinhangmenubutton.propTypes = {
    title: PropTypes.string,
    classs: PropTypes.string,
};

Bjyinhangmenubutton.defaultProps = {
    title: "",
    classs: ""
};

Bjyinhangmenubutton.displayName = 'Bjyinhangmenubutton';

export default Bjyinhangmenubutton;
