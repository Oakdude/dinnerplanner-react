import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import modelInstance from "../data/DinnerModel";


class DinnerPrintout extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      menu: modelInstance.getMenu(),
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menuPrice: modelInstance.getTotalMenuPrice()
    }
  }




  render() {

    let printout = modelInstance.getMenu().map(dish => (
            <React.Fragment>
              <div id="overview" className="container-fluid">
                <div className="thumbnails col-md-2">
                    <img id={dish.id} src={dish.image} alt = "bild">
                    </img>
                </div>
                <div id="desc" class="col-md-4">
                    <h2>{dish.title}</h2>
                    <p>{dish.instructions}</p>
                </div>
              </div>
            </React.Fragment>

          ));

    return (
      <React.Fragment>
        <Header model={modelInstance} />

          <div id="view6" class="col-xs-12">
            {printout}
          </div>
      </React.Fragment>

    );
  }

}


export default DinnerPrintout;
