import React from "react";
import { isObject, isInteger } from "lodash";

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
        } else if (props.rowData.pk === props.editModeKey) {
            data.push(<GenericInput value={value} key={key} />);
        } else {
            data.push(<td key={key}>{value}</td>);
        }
    }

    if (props.hoverKey === props.rowData.pk) {
        data.push(
            <td key="editButton">
                <button onClick={props.setEditMode}>Edit</button>
            </td>
        );
    }

    if (props.editModeKey === props.rowData.pk) {
        data.push(
            <td key="saveButton">
                <button onClick={props.saveChanges}>Save</button>
            </td>
        );
    }
    return data;
}

function GenericInput(props) {
    let type = isInteger(props.value) ? "number" : "text";
    return (
        <td>
            <input value={props.value} type={type} readOnly />
        </td>
    );
}
