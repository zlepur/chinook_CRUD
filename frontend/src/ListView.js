import React, { Component } from "react";
import Axios from "axios";
import TableBody from "./TableBody";
import TableColumns from "./TableColumns";
import Pagination from "./Pagination";
import "bulma";
import "./ListView.css";

export default class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            paginationData: null
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.hostURL = "http://localhost:8000";
    }

    async componentDidMount() {
        if (!this.props.match.url) return;
        await this.fetchTableData(this.props.location);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.url === prevProps.match.url) return;
        await this.fetchTableData(this.props.location);
    }

    async fetchTableData(location) {
        let url = new URL(this.hostURL);
        url.pathname = location.pathname;
        url.search = location.search;
        try {
            var response = await Axios.get(url.toString());
        } catch (err) {
            console.error(err);
            // TODO: Alert user of error!
            this.setState({ data: null });
            return;
        }
        this.setTableData(response);
    }

    setTableData(response) {
        let paginationData = {
            next: response.data.next,
            previous: response.data.previous,
            count: response.data.count
        };
        this.setState({
            data: response.data.results,
            paginationData: paginationData
        });
    }

    saveChanges(tablePath, rowData) {
        let url = new URL(this.hostURL);
        url.pathname = `${tablePath}${rowData.pk}/`;
        Axios.put(url.toString(), rowData).catch(err => {
            console.error(err);
            // TODO: Alert user of error!
        });
    }

    render() {
        if (!this.props.match.url || !this.state.data) return null;

        return (
            <div>
                <div className="scrollable">
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <TableColumns data={this.state.data} />
                            </tr>
                        </thead>
                        <tbody>
                            <TableBody
                                data={this.state.data}
                                tablePath={this.props.match.url}
                                saveChanges={this.saveChanges}
                            />
                        </tbody>
                    </table>
                </div>
                <Pagination data={this.state.paginationData} />
            </div>
        );
    }
}
