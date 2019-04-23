import React, { Component } from "react";
import "bulma";
import "./App.css";
import ListView from "./ListView";
import DetailView from "./DetailView";

export default class App extends Component {
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
          <div className="columns">
            <div className="column">
              <ListView />
            </div>
            <div className="column">
              <DetailView />
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              By <a href="mailto: zvonimir.lepur@gmail.com">Zvonimir Lepur</a>.
            </p>
            <p>
              The source code is licensed under
              <a href="http://opensource.org/licenses/mit-license.php">
                {" "}
                MIT
              </a>{" "}
              license.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
