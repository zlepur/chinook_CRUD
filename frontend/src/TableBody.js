import React from "react";
import { isObject } from "lodash";

export default function TableBody(props) {
    let rows = [];
    for (let row of props.data) {
        let data = [];
        for (let [key, value] of Object.entries(row)) {
            if (key === "pk") continue;

            if (isObject(value)) {
                data.push(
                    <td key={key}>
                        <a href={value.url}>{value.data}</a>
                    </td>
                );
            } else {
                data.push(<td key={key}>{value}</td>);
            }
        }
        rows.push(<tr key={row.pk}>{data}</tr>);
    }
    return rows;
}
