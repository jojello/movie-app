import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <section className="container">
          <a href="#" onClick={this.handleLoojClick}>
            <h1>LOOJ</h1>
          </a>
        </section>
      </header>
    );
  }
}

export default Header;
