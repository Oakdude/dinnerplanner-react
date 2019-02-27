import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import Sidebar from "../Sidebar/Sidebar.jsx";
import "./DishDetails.css";

class DishDetails extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),

      status: "LOADING",
  }
}


ingredients = function(){
  var ingredients = [];
  var num = 1;
  let p = this.state.numberOfGuests;
  for(let ingredient of this.state.ingredients){

    ingredients.push(<tr key={num}><td>{p*ingredient.amount.toFixed(2) + " " + ingredient.unit}
  </td><td>{ingredient.name}</td><td>SEK</td><td>{p*1.5*ingredient.amount}</td></tr>)
    num ++;
  }

  return ingredients;
}

update() {
  this.setState({
    numberOfGuests: this.props.model.getNumberOfGuests()
  });
}


componentDidMount() {
  // when data is retrieved we update the state
  // this will cause the component to re-render
  //console.log(this.props.location.para.title + "hejhej");
  this.props.model.addObserver(this);
  modelInstance
    .fetchDish(this.props.match.params.dishID)
    .then(dish => {

      this.setState({
        status: "LOADED",
        dish: dish,
        ingredients: dish[0].extendedIngredients
      });
    })
    .catch((error) => {
      console.log("error", error);
      this.setState({
        status: "ERROR"
      });
    });
}

// this is called when component is removed from the DOM
// good place to remove observer
componentWillUnmount() {
  this.props.model.removeObserver(this);
}

onClick = () => {
  modelInstance.addDishToMenu(this.props.match.params.dishID);
  ;
}

getDishPrice(a) {

  let price = a*this.state.numberOfGuests;
  return price.toFixed(2);
}

  render() {
    let dishPage = null;
    switch (this.state.status) {
      case "LOADING":
        dishPage = <div className='container loader'></div>;
        break;
      case "LOADED":
        let p = this.state.numberOfGuests;
        dishPage = this.state.dish.map(dish => (
          <React.Fragment key="1">
          <div className="col-md-4 text-left">
           <h1 id="title">{dish.title}</h1>
           <div id="dishImg">
             <img src={dish.image} alt="bild"></img>
           </div>
           <p>{modelInstance.summary}</p>

           <Link to="/search">
             <button id="backToMainButton" type="button" className="btn btn-md"><span>Back to search</span></button>
           </Link>
           </div>

          <div className="col-md-4 text-left">
            <h1><b>Ingredients</b></h1>
          </div>

          <div id="ingredientsCol" className="col-md-8">
              <p id="ingredientsPeople">Ingredients for {this.state.numberOfGuests} people</p>
              <table id="ingredientsTable" className="table" >
                  <thead>
                  </thead>
                  <tbody id="tableBody">
                    {this.ingredients()}

                  </tbody>
              </table>
              <div>
                <button id="addToMenuButton" type="button" className="btn btn-md"
                  onClick={this.onClick}><span>Add dish to menu</span>
                </button>

                <h3 id="ingredientsViewCost" className="text-right totalCost">
                  Total: {this.getDishPrice(dish.pricePerServing)} SEK
                </h3>
              </div>

          </div>

          <div id="preperationsCol" className="col-md-12 text-left">
            <h1><b>Preperations</b></h1>
            <div>
              <p id="instructionsP">{dish.instructions}
              </p>
            </div>
          </div>
          </React.Fragment>
        ));
        break;
      default:
        dishPage = <b>Failed to load data, please try again</b>;
        break;
      }

    return (
      <React.Fragment>
      <Sidebar model={this.props.model} />
        <div id="view3" className="col-sm-10">
            <div id="dishDetails" className="col-md-12">
              {dishPage}
            </div>
        </div>
      </React.Fragment>

      );
    }

}
export default DishDetails;
