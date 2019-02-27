import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import modelInstance from "../data/DinnerModel";


class DinnerOverview extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      menu: modelInstance.getMenu(),
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menuPrice: modelInstance.getTotalMenuPrice().toFixed(2)
    }
  }

  getDishesFromMenu() {
    let container = [];
    let num = 0;
    for(let dish of this.state.menu){
      let img = dish.image;
      let title = dish.title;
      let price = dish.pricePerServing.toFixed(2);

        container.push(
            <div key={num} className="col-xs-12 col-sm-5 col-md-4 placeholder">
            <img src={img} alt="bild"></img>
            <div><h4 id="overviewTitles">{title}</h4>
            <p>{price} SEK</p>
            </div>
            </div>);
      num ++;
    }
    return container;
  }


  render() {

    return (
      <React.Fragment>
        <Header model={modelInstance} />

        <div className="dinnerOverview">
          <div id="myDinnerView" className="col-sm-12">

            <div id="gallery" className="container placeholders">
                {this.getDishesFromMenu()}
            </div>

              <div id="dinnerCost" className="container text-center">
                <h4>Dinner total: {this.state.menuPrice} SEK</h4>
                <p>{(this.state.menuPrice/this.state.numberOfGuests).toFixed(2)} SEK per person</p>
              </div>


              <div className="text-center">
                <Link to="/printout">
                  <button id="recipeBtn" className="btn">Print Full Recipe</button>
                </Link>
              </div>
          </div>
        </div>
      </React.Fragment>

    );
  }

}


export default DinnerOverview;
