import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthAdminPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            role
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!, $role: String!) {
            createUser(userInput: {email: $email, password: $password, role: $role}) {
              _id
              email
              role
            }
          }
        `,
        variables: {
          email: email,
          password: password,
          role: 'admin'
        }
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
            resData.data.login.role
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <h1>Admin Authentication</h1>
          <TextField id="email" label="email" type="email" fullWidth="True" inputRef={this.emailEl} />
        </div>
        <div className="form-control">

          <TextField id="password" label="password" type="password" fullWidth="True" size='medium' inputRef={this.passwordEl} />
        </div>
        <div className="form-actions">
          <Button variant="contained" color="primary" type="submit">Submit</Button>
          <Button onClick={this.switchModeHandler}>
            {this.state.isLogin ? 'Register' : 'Login'}
          </Button>
        </div>
      </form>
    );
  }
}

export default AuthAdminPage;