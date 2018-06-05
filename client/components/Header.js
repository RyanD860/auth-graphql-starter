import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../queries/CurrentUser";
import { Link } from "react-router";
import logout from "../mutations/Logout";

class Header extends Component {
  onLogoutCLick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }
  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutCLick.bind(this)}>Log Out</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="login">Log In</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo left"> Home </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(graphql(query)(Header));
