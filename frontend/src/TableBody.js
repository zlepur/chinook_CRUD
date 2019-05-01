import React from "react";
import TableRow from "./TableRow";

export default function TableBody(props) {
    let rows = [];
    for (let rowData of props.data) {
        let row = (
            <TableRow
                rowData={rowData}
                editModeKey={props.editModeKey}
                hoverKey={props.hoverKey}
                setEditMode={props.setEditMode}
                onInputChange={props.onInputChange}
                saveChanges={props.saveChanges}
                cancelChanges={props.cancelChanges}
            />
        );
        rows.push(
            <tr
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                key={rowData.pk}
                data-key={rowData.pk}
            >
                {row}
            </tr>
        );
    }
    return rows;
}
