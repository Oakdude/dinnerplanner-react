import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/33";
const API_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this.numberOfGuests;
    this.types = ['all','main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'drink'];
    this.getNumberOfGuests();
    this.selectedDish = 1;
    this.menu;

    if(localStorage.getItem("menu") === null) {
      this.menu = [];
      }else {
          this.menu = JSON.parse(localStorage.getItem("menu"));
      }

      if(localStorage.getItem("guests") === null) {
        this.numberOfGuests = 1;
      } else {
          this.numberOfGuests = localStorage.getItem("guests");
        }

  }

  /**
   * Get the number of guestshttps://spoonacular-recipe-food-nutrition-v1.p.mashape.com
   * @returns {number}
   */

  getMenu() {
    return this.menu;
  }
  setSelectedDish2(id){
    this.selectedDish = id;
    console.log(id);
  }
  getSelectedDish2(){
    return this.selectedDish;
  }

  getNumberOfGuests() {
    return this.numberOfGuests;
  }

  getTypes() {
  return this.types;
  }

  getDish(id) {
    this.fetchDish(id).then(dish =>{
	  	return dish;
	  });
  }

  getTotalMenuPrice() {
        let priceMenu = 0;

        for (let dish of this.menu) {
            priceMenu += dish.pricePerServing;
        }
				var a = this.getNumberOfGuests();
        return priceMenu.toFixed(2)*a;
}

/*  getIngredients(array) {
    var ingredients = [];
    for(let ingredient of array){

        ingredients.push(ingredient);
      }
    return ingredients;
  }*/

  fetchDishSummary(id) {
		var url = BASE_URL + "recipes/" + id + "/summary";
		return fetch(url,{
	            headers:{
	                "X-Mashape-Key": API_KEY,
	                "Access-Control-Allow-Origin" : "http://sunset.nada.kth.se:8080/iprog/group/33/recipes/"
	            }
	      }).then(this.processResponse)
          .then(data => data.summary);
        }

  getMenuNameAndCost() {
	let menuNameAndCost = [];
	for(var dish of this.menu){
		menuNameAndCost.push([dish.title, dish.pricePerServing]);
	}
	return menuNameAndCost;
	}

  addDishToMenu(id) {

      this.fetchDish(id).then(dish => {
      		this.menu.push(dish[0]);
          localStorage.setItem("menu", JSON.stringify(this.menu));
      		this.notifyObservers("dishAddedToMenu");
      	})

      }
  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this.numberOfGuests = num;
    localStorage.setItem("guests", num);
    this.notifyObservers();
  }

  // API methods
  fetchDish(id) {
  		var url = BASE_URL + "/recipes/informationBulk?ids=" + id;
  		//var url = "http://sunset.nada.kth.se:8080/iprog/group/33/recipes/" + id + "/summary";
  		return fetch(url,{
  	            headers:{
  	                "X-Mashape-Key": API_KEY,
  	                "Access-Control-Allow-Origin" : "http://sunset.nada.kth.se:8080/iprog/group/33/recipes/"
  	            }
  	      }).then(this.processResponse)
  	        .then(data => data);

  	}


  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, filter) {
    const url = `${BASE_URL}/recipes/search`;
    var queryURL = url;
    queryURL += "?type=" + type.replace(/\s/g, "+");
    if(filter) {
			queryURL += "&query=" + filter.replace(/\s/g, "+");
		}
    return fetch(queryURL, httpOptions).then(this.processResponse)
	        .then(data => data.results);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
modelInstance.addDishToMenu()
export default modelInstance;
