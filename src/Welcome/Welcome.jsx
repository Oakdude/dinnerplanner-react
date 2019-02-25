import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome container">

          <div id="welcomeDiv" className="jumbotron text-center">
      			<p id="welcomeText">
      				Welcome to Dinner Planner! Lorem ipsum och så vidare sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      			</p>
    		  </div>

          <div className="text-center">
            <Link to="/search">
              <button type="button" className="btn btn-lg"><span>Create New Dinner</span></button>
            </Link>
          </div>

      </div>
    );
  }
}

export default Welcome;
