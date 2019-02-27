import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Dishes from "../Dishes/Dishes.jsx";
import modelInstance from "../data/DinnerModel";
import "./SelectDish.css";



class SelectDish extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      search: "",
      types: this.props.model.getTypes(),
      currentType: "all"

    };
    this.inputChanged = this.inputChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  types = function(){
    var options = [];
    var num = 1;
    for(let type of this.state.types){

      options.push(<option key={num} value={type}> {type.charAt(0).toUpperCase() + type.slice(1)} </option>)
      num ++;
    }

    return options;
  }

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

  typeChanged = e => {
    this.setState({
      currentType: e.target.value
    });
    console.log(this.currentType);
  }

  inputChanged(e) {
    this.setState({search: e.target.value});

  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="SelectDish">

        <Sidebar model={this.props.model} />

          <div id="dashboard" className="col-sm-9 col-sm-offset-2 col-md-10">
            <div className="col-sm-12">
              <h3>FIND DISH</h3>
              <nav className="navbar navbar-expand-lg">
                <div id="navbarSupportedContent">
                  <form className="form-inline mr-auto" onSubmit={this.handleSubmit}>
                    <input id="searchInput" className="form-control input-group-lg" type="text" placeholder="Search"
                      value={this.state.search} onChange={this.inputChanged}/>
                    <select onChange={this.typeChanged} id="dishTypeSelector" className="form-control input-group-lg">

                      {this.types()}

                    </select>

                    <button id="searchBtn" className="btn">Search</button>
                  </form>
                </div>
              </nav>
            </div>
            <div className="col-sm-12 col-off">
              <div id="gallery" className="row placeholders">

                <Dishes model={modelInstance} dishSearch={this.state.search} dishType={this.state.currentType} />

              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default SelectDish;
