import React, { Component } from "react";
import TableRow from "./TableRow";

export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverKey: null,
            editModeKey: null
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
    }

    handleMouseEnter(evt) {
        let hoverKey = evt.currentTarget.getAttribute("data-key");
        if (this.state.editModeKey === hoverKey) return;
        this.setState({ hoverKey });
    }

    handleMouseLeave(evt) {
        this.setState({ hoverKey: null });
    }

    setEditMode(evt) {
        let elem = evt.currentTarget.closest("tr");
        let editModeKey = elem.getAttribute("data-key");
        this.setState({ editModeKey, hoverKey: null });
    }

    render() {
        let rows = [];
        for (let rowData of this.props.data) {
            let row = (
                <TableRow
                    rowData={rowData}
                    editModeKey={parseInt(this.state.editModeKey)}
                    hoverKey={parseInt(this.state.hoverKey)}
                    setEditMode={this.setEditMode}
                />
            );
            rows.push(
                <tr
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    key={rowData.pk}
                    data-key={rowData.pk}
                >
                    {row}
                </tr>
            );
        }
        return rows;
    }
}
