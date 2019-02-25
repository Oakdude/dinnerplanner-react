import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome.jsx";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish.jsx";
import DinnerOverview from "./DinnerOverview/DinnerOverview.jsx";
import DishDetails from "./DishDetails/DishDetails.jsx";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/overview"
            render={() => <DinnerOverview model={modelInstance} />}
          />
          <Route
            path="/dish/:dishID"
            
            component={DishDetails}
          />

        </header>
      </div>
    );
  }
}

export default App;
