import React, { Component } from "react";
import { isObject, toNumber, isNaN, isEqual } from "lodash";

export default class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.rowData,
            editMode: false
        };
        this.baseState = this.state.data;
        this.onInputChange = this.onInputChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.types = this.buildTypes(props.rowData);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (isEqual(prevProps.rowData, this.props.rowData)) return;
        this.setState({ data: this.props.rowData });
        this.baseState = this.props.rowData;
    }

    cancel(evt) {
        this.setState({ data: this.baseState, editMode: false });
    }

    buildTypes(rowData) {
        let types = {};
        for (let [key, value] of Object.entries(rowData)) {
            let maybeNum = toNumber(value);
            let type = isNaN(maybeNum) ? "text" : "number";
            types[key] = type;
        }
        return types;
    }

    onInputChange(evt) {
        let val = evt.target.value;
        let key = evt.currentTarget.getAttribute("data-inputid");
        let data = { ...this.state.data };
        data[key] = val;
        this.setState({ data });
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }

    saveChanges(evt) {
        this.props.saveChanges(this.props.tablePath, this.state.data);
        this.baseState = this.state.data;
        this.setState({ editMode: false });
    }

    deleteRow(evt) {
        let isDeleted = this.props.deleteRow(this.props.tablePath, this.state.data.pk);
        if (isDeleted) this.setState({ data: null, editMode: false });
    }

    render() {
        if (this.state.data === null) return null;

        let data = [];
        for (let [key, value] of Object.entries(this.state.data)) {
            if (key === "pk") continue;

            if (isObject(value)) {
                data.push(
                    <td key={key}>
                        <a href={value.url}>{value.data}</a>
                    </td>
                );
            } else if (this.state.editMode) {
                data.push(
                    <td key={key}>
                        <input
                            value={value}
                            data-inputid={key}
                            onChange={this.onInputChange}
                            type={this.types[key]}
                        />
                    </td>
                );
            } else {
                data.push(<td key={key}>{value}</td>);
            }
        }

        if (this.state.editMode) {
            data.push(
                <td key="saveButton">
                    <button onClick={this.saveChanges}>Save</button>
                </td>
            );
            data.push(
                <td key="cancelButton">
                    <button onClick={this.cancel}>Cancel</button>
                </td>
            );
        } else {
            data.push(
                <td key="editButton">
                    <button onClick={this.toggleEditMode}>Edit</button>
                </td>
            );
            data.push(
                <td key="deleteButton">
                    <button onClick={this.deleteRow}>Delete</button>
                </td>
            );
        }
        return <tr>{data}</tr>;
    }
}
