import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import { Link } from "react-router-dom";
import modelInstance from "../data/DinnerModel";
import SelectDish from "../SelectDish/SelectDish.jsx"
import "./Dishes.css";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"

    };
  }

  getDishes(type, search) {
    modelInstance
      .getAllDishes(search,type)
      .then(dishes => {

        this.setState({
          status: "LOADED",
          dishes: dishes
        });
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          status: "ERROR"
        });
      });
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {

    this.getDishes(this.props.dishSearch, this.props.dishType);
  }

  componentWillReceiveProps(newProps) {

    this.getDishes(newProps.dishSearch, newProps.dishType);
  }

  setSelectedDish(id) {
    this.props.model.setSelectedDish2(id);
  }
  render() {

    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":

        var url = "https://spoonacular.com/recipeImages/";

        dishesList = this.state.dishes.map(dish => (


          <Link key={dish.id} to={{pathname: "/dish/" + dish.id}}>
          <div key={dish.id} id={dish.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 placeholder dishSelector">
              <img className="no-pointer" src={url+dish.image} alt="bild"/>
              <div className="no-pointer">
                <h4>{dish.title}</h4>
              </div>
          </div>
        </Link>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">

        <ul>{dishesList}</ul>
      </div>
    );
  }
}

export default Dishes;
