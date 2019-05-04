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
            paginationData: null,
            editMode: null
        };
        this.backupRow = null;
        this.setEditMode = this.setEditMode.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
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

    onInputChange(value, rowID, inputID) {
        let pk = rowID - 1;
        let data = [...this.state.data];
        let row = { ...data[pk] };
        row[inputID] = value;
        data[pk] = row;
        this.setState({ data });
    }

    saveChanges(evt) {
        //TODO: Make a network request
        this.backupRow = null;
        this.setState({ editMode: null });
    }

    setEditMode(evt) {
        if (this.backupRow !== null) {
            this.cancelChanges();
        }
        let elem = evt.currentTarget.closest("tr");
        let editMode = elem.getAttribute("data-key");
        let pk = editMode - 1;
        this.backupRow = [this.state.data[pk], pk];
        this.setState({ editMode });
    }

    cancelChanges() {
        let data = [...this.state.data];
        let [backupRow, pk] = this.backupRow;
        data[pk] = backupRow;
        this.backupRow = null;
        this.setState({ data, editMode: null });
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
                                editMode={parseInt(this.state.editMode)}
                                setEditMode={this.setEditMode}
                                onInputChange={this.onInputChange}
                                saveChanges={this.saveChanges}
                                cancelChanges={this.cancelChanges}
                            />
                        </tbody>
                    </table>
                </div>
                <Pagination data={this.state.paginationData} />
            </div>
        );
    }
}
