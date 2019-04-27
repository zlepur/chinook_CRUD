import React, { Component } from "react";
import "bulma";
import "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListView from "./ListView";
import DetailView from "./DetailView";
import ModelsView from "./ModelsView";
import Axios from "axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: null
        };
    }

    async componentDidMount() {
        await this.fetchModels();
    }

    async fetchModels() {
        let response;
        try {
            response = await Axios.get("http://localhost:8000/");
        } catch (err) {
            console.error(err);
        }
        this.setState({ models: response.data });
    }

    render() {
        return (
            <div className="App">
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Chinook CRUD app</h1>
                            <h2 className="subtitle">
                                Powered by Django REST framework and React.js
                            </h2>
                        </div>
                    </div>
                </section>

                <div className="container">
                    <Router>
                        <div className="columns">
                            <div className="column is-one-fifth">
                                <Route
                                    path={"*"}
                                    render={routeProps => (
                                        <ModelsView {...routeProps} models={this.state.models} />
                                    )}
                                />
                            </div>

                            <div className="column is-four-fifths">
                                <Route exact path={"/:list"} component={ListView} />
                                <Route path={"/:list/:pk"} component={DetailView} />
                            </div>
                        </div>
                    </Router>
                </div>

                <footer className="footer">
                    <div className="content has-text-centered">
                        <p>
                            By <a href="mailto: zvonimir.lepur@gmail.com">Zvonimir Lepur</a>.
                        </p>
                        <p>
                            The source code is licensed under
                            <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>{" "}
                            license.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}
