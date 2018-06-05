import React, { Component } from "react";
import AuthForm from "./AuthForm";
import query from "../queries/CurrentUser";
import mutation from "../mutations/Login";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  componentWillUpdate(nextProps) {
    // this.props // the old , current set of props
    // nextProps // the next set of props that will be in place when the component re-renders
    if (!this.props.data.user && nextProps.data.user) {
      //redirect to dashboard
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query }]
      })
      .catch(err => {
        const errors = err.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(LoginForm));
