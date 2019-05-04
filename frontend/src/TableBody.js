import React from "react";
import TableRow from "./TableRow";

export default function TableBody(props) {
    let rows = [];
    for (let rowData of props.data) {
        let row = (
            <TableRow
                rowData={rowData}
                editMode={props.editMode}
                setEditMode={props.setEditMode}
                onInputChange={props.onInputChange}
                saveChanges={props.saveChanges}
                cancelChanges={props.cancelChanges}
            />
        );
        rows.push(
            <tr key={rowData.pk} data-key={rowData.pk}>
                {row}
            </tr>
        );
    }
    return rows;
}
