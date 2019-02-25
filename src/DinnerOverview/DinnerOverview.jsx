import React, { Component } from "react";



class DinnerOverview extends Component {
  render() {
    return (

      <div className="dinnerOverview">
      <div id="myDinnerView" className="col-sm-12">

        <div id="gallery" className="container placeholders">

          </div>

          <div id="dinnerCost" className="container text-center">

          </div>


          <div className="text-center">
              <button id="recipeBtn" className="btn">Print Full Recipe</button>
          </div> 
      </div>
      </div>

    );
  }

}


export default DinnerOverview;
