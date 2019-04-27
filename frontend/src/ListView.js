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
    }

    async componentDidMount() {
        if (!this.props.match.url) return;
        await this.fetchData(this.props.location);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.url === prevProps.match.url) return;
        await this.fetchData(this.props.location);
    }

    async fetchData(location) {
        let response;
        try {
            let url = new URL("http://localhost:8000");
            url.pathname = location.pathname;
            url.search = location.search;
            response = await Axios.get(url.toString());
        } catch (err) {
            console.error(err);
            this.setState({ data: null });
            return;
        }
        this.setData(response);
    }

    setData(response) {
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

    render() {
        if (!this.props.match.url || !this.state.data) return null;

        return (
            <div>
                <div className="scrollable">
                    <table className="table">
                        <thead>
                            <tr>
                                <TableColumns data={this.state.data} />
                            </tr>
                        </thead>
                        <tbody>
                            <TableBody data={this.state.data} />
                        </tbody>
                    </table>
                </div>
                <Pagination data={this.state.paginationData} />
            </div>
        );
    }
}
