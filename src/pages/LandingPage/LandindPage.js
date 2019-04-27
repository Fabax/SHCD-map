import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandindPage extends Component {
  render() {
    return (
      <div className="container is-fullhd">
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">London map</h1>
              <h2 className="subtitle">
                for Sherlock Holmes consulting detective
              </h2>
              <Link to="/map" className="button is-primary">
                Enter
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
