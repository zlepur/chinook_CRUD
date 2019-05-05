import React from "react";
import TableRow from "./TableRow";

export default function TableBody(props) {
    let rows = [];
    for (let rowData of props.data) {
        rows.push(
            <TableRow
                key={`${props.tablePath}-${rowData.pk}`}
                rowData={rowData}
                tablePath={props.tablePath}
                saveChanges={props.saveChanges}
                deleteRow={props.deleteRow}
            />
        );
    }
    return rows;
}
