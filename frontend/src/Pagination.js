import React from "react";
import "bulma";

export default function Pagination(props) {
    if (!props.data) return null;
    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a className="pagination-previous" href={props.data.previous}>
                Previous
            </a>
            <a className="pagination-next" href={props.data.next}>
                Next
            </a>
            <ul className="pagination-list">
                <li>
                    <a className="pagination-link" aria-label="Goto page 1">
                        1
                    </a>
                </li>
            </ul>
        </nav>
    );
}
