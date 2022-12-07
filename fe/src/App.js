import { createBrowserHistory } from 'history';
import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Admin from './pages/Admin/Admin';
import Blog from './pages/Blog/Blog';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import signIn from './pages/SignIn/signIn';
import SignIn from './pages/SignIn/signIn';
import SignUp from './pages/SignUp/SignUp';
export const history = createBrowserHistory();
function App() {

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={signIn} />
          <Route exact path="/checkout/:id/:roomid" component={Checkout} />
          <Route exact path="/admin" component={Admin} />

        </Switch>
        {/* <Route exact path= "*" component={NotFound}/> */}
      </Router>
    </div>

  );
}

export default App;
