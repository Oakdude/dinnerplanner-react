import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
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


                  </tbody>
                </table>
              </div>

            <div id="sidebarTotalCost" className="text-right totalCost">

            </div>

            <div className="text-center">
                {/* Knappen ska vara disabled när ingenting har lagts till i menyn */}
                <button id="confirmDinnerBtn" type="button" className="btn btn-md"><span>Confirm Dinner</span></button>
            </div>
          </div>{/* navbar-collapse */}
        </nav>
      </div>
      </div>

    );
  }
}

export default Sidebar;
