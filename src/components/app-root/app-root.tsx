import { Component, Host, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';
const Router = createRouter();

@Component({
  tag: 'app-root',
})
export class AppRoot {

  render() {
    return (
      <Host>
        <Router.Switch>
          <Route path="/">
            <home-page />
          </Route>
          <Route path="/register">
            <registration-form />
          </Route>
          <Route path="/login">
            <login-form />
          </Route>
          <Route path="/userhome">
            <user-home />
          </Route>
          <Route path="/adminhome">
            <admin-home />
          </Route>
          <Route path="/booking">
            <app-booking />
          </Route>
          <Route path="/confirmation">
            <confirm-booking />
          </Route>
          <Route path="/profile">
            <user-profile />
          </Route>
        </Router.Switch>
      </Host>
    );
  }
}