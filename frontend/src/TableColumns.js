import React from "react";

export default function TableColumns(props) {
    let column_names = [];
    for (let name in props.data[0]) {
        if (name === "pk") continue;
        column_names.push(<th key={name}>{name}</th>);
    }
    column_names.push(<th key="actions" />);
    column_names.push(<th key="cancelActionHeader" />);
    return column_names;
}
