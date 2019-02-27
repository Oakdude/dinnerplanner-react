import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
      <div id="dinnerOverviewHeader" className="col-md-12">
          <div id="guestsView5and6" className="col-xs-4">
            <h3>My Dinner: {modelInstance.numberOfGuests} people</h3>
          </div>
          <Link to="/search">
          <div className="float-right">
            <button id="backEditDinnerBtn" className="btn pull-right">Go back and edit dinner</button>
          </div>
        </Link>
      </div>
      </React.Fragment>
    );
  }
}

export default Header;
