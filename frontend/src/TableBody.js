import React from "react";
import TableRow from "./TableRow";

export default function TableBody(props) {
    let rows = [];
    for (let rowData of props.data) {
        let row = <TableRow rowData={rowData} saveChanges={props.saveChanges} />;
        rows.push(
            <tr key={rowData.pk} data-key={rowData.pk}>
                {row}
            </tr>
        );
    }
    return rows;
}
