import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">

        <Sidebar model={this.props.model} />

          <div id="dashboard" className="col-sm-9 col-sm-offset-2 col-md-10">
            <div className="col-sm-12">
              <h3>FIND DISH</h3>
              <nav className="navbar navbar-expand-lg">
                <div id="navbarSupportedContent">
                  <form className="form-inline mr-auto">
                    <input id="searchInput" className="form-control input-group-lg" type="text" placeholder="Search"/>
                    <select id="dishTypeSelector" className="form-control input-group-lg">


                    </select>

                    <button id="searchBtn" className="btn">Search</button>
                  </form>
                </div>
              </nav>
            </div>
            <div className="col-sm-12 col-off">
              <div id="gallery" className="row placeholders">
                
                <Dishes />

              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default SelectDish;
