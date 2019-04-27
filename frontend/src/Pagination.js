import React from "react";
import "bulma";

export default function Pagination(props) {
    if (!props.data) return null;
    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a
                className="pagination-previous"
                disabled={!props.data.previous}
                href={props.data.previous}
            >
                Previous
            </a>
            <a className="pagination-next" disabled={!props.data.next} href={props.data.next}>
                Next
            </a>
        </nav>
    );
}
