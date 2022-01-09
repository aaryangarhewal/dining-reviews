import React from "react";
import { Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Dinings from "./components/dinings";
import DiningsList from "./components/dinings-list";
import Login from "./components/login";
import About from "./components/about";
import ContactUs from "./components/contactUs";


function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/dinings">Dining Reviews</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
            <Link to={"/dinings"} className="nav-link">
              Dinings
            </Link>
          </li>
        <li className="nav-item ">
        
                                <Link className="nav-link" to="/About" >About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ContactUs" >Contact Us</Link>
                            </li></div>
        <div className="navbar-nav mr-auto ">
          
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        
        
      </div>
    </div>
  </div>
</nav>
<div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/dinings"]} component={DiningsList} />
          <Route exact path={"/About"} component={About} />
          <Route exact path={"/ContactUs"} component={ContactUs} />
          <Route 
            path="/dinings/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/dinings/:id"
            render={(props) => (
              <Dinings {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
