import React, { Component } from "react";
import Axios from "axios";
import { isArray } from "lodash";
import "bulma";
import "./ListView.css";

export default class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
    }

    async componentDidMount() {
        if (!this.props.match.url) return;
        await this.fetchList(this.props.match.url);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.url === prevProps.match.url) return;
        await this.fetchList(this.props.match.url);
    }

    async fetchList(url) {
        let response;
        try {
            response = await Axios.get("http://localhost:8000" + url);
        } catch (err) {
            console.error(err);
        }

        let list;
        if (isArray(response.data)) {
            list = response.data;
        } else {
            list = [response.data];
        }
        this.setState({ list });
    }

    buildTableBody() {
        let rows = [];
        for (let [num, row] of this.state.list.entries()) {
            let data = [];
            for (let val in row) {
                if (val === "list_url") continue;
                if (isArray(row[val])) {
                    let url = new URL(row[val][1]);
                    data.push(
                        <td key={val}>
                            <a href={url.pathname}>{row[val][0]}</a>
                        </td>
                    );
                } else {
                    data.push(<td key={val}>{row[val]}</td>);
                }
            }
            // XXX use PK from DB for key attr!
            rows.push(<tr key={num}>{data}</tr>);
        }
        return rows;
    }

    buildTableColumns() {
        let column_names = [];
        for (let name in this.state.list[0]) {
            if (name === "list_url") continue;
            column_names.push(<th key={name}>{name}</th>);
        }
        return column_names;
    }

    render() {
        if (!this.props.match.url || !this.state.list) return null;
        let columnNames = this.buildTableColumns();
        let tableBody = this.buildTableBody();
        return (
            <div className="scrollable">
                <table className="table">
                    <thead>
                        <tr>{columnNames}</tr>
                    </thead>
                    <tbody>{tableBody}</tbody>
                </table>
            </div>
        );
    }
}
