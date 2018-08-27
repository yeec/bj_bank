import React, { Component } from "react";

import Button from "components/base/button";
export default class PageTest extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ios_show: false,
      android_show: false
    };
  }
  render() {
    return (
      <div>
        <h1>Page Demo</h1>
        <Button type="ghost-dot">幽灵-虚线</Button>
      </div>
    );
  }
}
