
import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserList from "./UserList";
import './../styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <main className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/">People Directory</Link>
          <span className="header-note">A directory of people</span>
        </header>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/users/:id" component={UserDetails} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
