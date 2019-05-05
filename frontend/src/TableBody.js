import React from "react";
import TableRow from "./TableRow";

export default function TableBody(props) {
    let rows = [];
    for (let rowData of props.data) {
        rows.push(
            <TableRow
                key={`${props.tableUrl}-${rowData.pk}`}
                rowData={rowData}
                tableUrl={props.tableUrl}
                saveChanges={props.saveChanges}
            />
        );
    }
    return rows;
}
