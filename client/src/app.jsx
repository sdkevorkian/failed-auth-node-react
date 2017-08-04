import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Base from './components/Base.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';
import { createBrowserHistory } from 'history'

injectTapEventPlugin();

let history = createBrowserHistory();

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
            <main>
                <Base/>
                <Switch>
                        <Route exact
                            path="/"
                            getComponent={(location, callback) => {
                                if (Auth.isUserAuthenticated()) {
                                  callback(null, DashboardPage);
                                } else {
                                  callback(null, HomePage);
                                }
                              }
                            } />
                        <Route path="/signup" component={SignUpPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route
                            path="/logout"
                            onEnter={ (nextState, replace) => {
                                Auth.deauthenticateUser();
                                replace('/');
                            } }
                        />
                </Switch>
            </main>
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
