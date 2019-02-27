import React, { Component } from "react";
import "./Sidebar.css";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      menu: this.updateSidebar(),
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  updateSidebar() {
    console.log("ran update sidebar")
    /*let savedMenu = localStorage.getItem("menu");
    if(savedMenu != null) {
      let savedMenu1 = JSON.parse(savedMenu);
      console.log(savedMenu1);
    }
    console.log("localMenu from sidebar: ", savedMenu);*/
    if(modelInstance.menu.length > 0){
      let array = [];
      let dishesArr = this.props.model.getMenuNameAndCost();
      let a = this.props.model.getNumberOfGuests();
      let num = 0;
      for(let dish of dishesArr){
    		array.push(<tr key={num}><th>{dish[0]}</th><th>{(dish[1]*a).toFixed(2)}</th></tr>);
        num++;
        this.setState({
          menu: array
        });
    }}
  }
  componentDidMount() {
    this.props.model.addObserver(this);
    this.updateSidebar();

  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.updateSidebar();
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);

  };


  render() {
    return (
      <div className="Sidebar">
      <div id="sidebar" className="col-md-2 sidebar"> {/* sidebar absolute/fixed för olika bra*/}
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              {/* Button that toggles the navbar on and off on small screens */}
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myDinnerCollapse1" aria-expanded="false">
              {/* Hides information from screen readers */}
                <span className="sr-only"></span>
                {/* button icon bars */}
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div>
                <h2>My Dinner</h2>
              </div>
            </div> {/* end of nav header */}

            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="myDinnerCollapse1">

              <div className="col-xs-12">

                <form id="people" className="navbar-form">
                  <div className="form-group-md">
                    <label htmlFor="numberOfGuests">People</label>
                    <input
                      type="number"
                      min="1"
                      value={this.state.numberOfGuests}
                      onChange={this.onNumberOfGuestsChanged}
                    />
                  </div>
                </form>
              </div>

              <div>
                <table id="addedDishesTable" className="table table-striped table-hover table">
                  <thead>
                    <tr>
                      <th>Dish </th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody id="sidebarTable">
                    {this.state.menu}

                  </tbody>
                </table>
              </div>

            <div id="sidebarTotalCost" className="text-right totalCost">
              {modelInstance.getTotalMenuPrice()} SEK
            </div>

            <div className="text-center">
                {/* Knappen ska vara disabled när ingenting har lagts till i menyn */}
                <Link to="/overview">
                <button id="confirmDinnerBtn" type="button" className="btn btn-md"><span>Confirm Dinner</span></button>
                </Link>
          </div>
          </div>{/* navbar-collapse */}
        </nav>
      </div>
      </div>

    );
  }
}

export default Sidebar;
