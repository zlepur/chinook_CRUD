import React, { Component } from "react";

export default class DetailView extends Component {
    render() {
        console.log(this.props.match);
        return <div>DetailView</div>;
    }
}
