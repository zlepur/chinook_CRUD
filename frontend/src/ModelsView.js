import React from "react";
import { Link } from "react-router-dom";
import "bulma";

export default function ModelsView(props) {
    let list = [];
    let activeText = props.location.pathname
        .trim()
        .replace(/\//g, "")
        .replace(/[0-9]/g, "");
    for (let name in props.models) {
        let url = new URL(props.models[name]);
        let is_active = name === activeText ? "is-active has-background-info" : "";
        list.push(
            <Link to={url.pathname} className={"panel-block " + is_active} key={name}>
                {name}
            </Link>
        );
    }

    return (
        <nav className="panel has-text-centered">
            <p className="panel-heading">Models</p>
            <div>{list}</div>
        </nav>
    );
}
