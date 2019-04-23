import React from "react";
import { Link } from "react-router-dom";

export default function ModelsView(props) {
    let list = [];
    for (let name in props.models) {
        let url = new URL(props.models[name]);
        list.push(
            <Link to={url.pathname} className="panel-block" key={name}>
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
