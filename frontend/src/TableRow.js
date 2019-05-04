import React from "react";
import { isObject, toNumber, isNaN } from "lodash";

export default function TableRow(props) {
    let data = [];
    for (let [key, value] of Object.entries(props.rowData)) {
        if (key === "pk") continue;

        if (isObject(value)) {
            data.push(
                <td key={key}>
                    <a href={value.url}>{value.data}</a>
                </td>
            );
        } else if (props.rowData.pk === props.editMode) {
            data.push(
                <GenericInput
                    value={value}
                    key={key}
                    onInputChange={props.onInputChange}
                    inputID={key}
                    rowID={props.rowData.pk}
                />
            );
        } else {
            data.push(<td key={key}>{value}</td>);
        }
    }

    if (props.editMode === props.rowData.pk) {
        data.push(
            <td key="saveButton">
                <button onClick={props.saveChanges}>Save</button>
            </td>
        );
        data.push(
            <td key="cancelButton">
                <button onClick={evt => props.cancelChanges()}>Cancel</button>
            </td>
        );
    } else {
        data.push(
            <td key="editButton">
                <button onClick={props.setEditMode}>Edit</button>
            </td>
        );
    }
    return data;
}

function GenericInput(props) {
    let maybeNum = toNumber(props.value);
    let type = isNaN(maybeNum) ? "text" : "number";
    return (
        <td>
            <input
                value={props.value}
                type={type}
                onChange={evt => props.onInputChange(evt.target.value, props.rowID, props.inputID)}
            />
        </td>
    );
}
