import React, { PropTypes } from 'react';
// import RcCollapse from 'rc-collapse';
import './bjyinghanglist.less';

const Assets = function (props, context) {

    const {
        text,
        onClicks
    } = props;


    return (
        <div className="rit-menu-card-list" onClick={onClicks}>
            <div className="rit-menu-card-list-left">{text}</div>
            <div className="rit-menu-card-list-right"></div>
        </div>
    )
}
export default Assets;