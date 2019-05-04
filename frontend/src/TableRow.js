import React, { Component } from "react";
import { isObject, toNumber, isNaN } from "lodash";

export default class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { ...props.rowData },
            editMode: false
        };
        this.baseState = this.state.data;
        this.onInputChange = this.onInputChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.types = this.buildTypes(props.rowData);
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
        this.props.saveChanges(this.state.data);
        this.baseState = this.state.data;
        this.setState({ editMode: false });
    }

    render() {
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
                        <GenericInput
                            value={value}
                            inputid={key}
                            onInputChange={this.onInputChange}
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
        }
        return data;
    }
}

function GenericInput(props) {
    return (
        <input
            value={props.value}
            type={props.type}
            data-inputid={props.inputid}
            onChange={props.onInputChange}
        />
    );
}
