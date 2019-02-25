import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/33";
const API_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this.numberOfGuests = 4;
    this.types = ['all','main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'drink'];
    this.getNumberOfGuests();
    this.selectedDish = 1;
  }

  /**
   * Get the number of guestshttps://spoonacular-recipe-food-nutrition-v1.p.mashape.com
   * @returns {number}
   */
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

/*  getIngredients(array) {
    var ingredients = [];
    for(let ingredient of array){

        ingredients.push(ingredient);
      }
    return ingredients;
  }*/

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this.numberOfGuests = num;
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
export default modelInstance;
