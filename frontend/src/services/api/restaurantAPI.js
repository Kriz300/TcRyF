//Components Imports
import restaurantapi from '../../config/restaurantAxios';

//Send a request for all restaurants
//Need handle errors
export async function getRestaurants(){
    //await new Promise(r => setTimeout(r, 10000));// -> Delay para ver el spinner

    const response = await restaurantapi.get("/index/");
    return response.data;
}

//Send a parameters for a search
//Need handle errors
export async function filterRestaurants(restaurantFilters){
    const response = await restaurantapi.post("/filters/", restaurantFilters);
    return response.data;
}

//Send a request for insert restaurant
//Need handle errors
export async function insertRestaurants(restaurantInsert){
    const response = await restaurantapi.post("/insert/", restaurantInsert);
    return response.data;
}

//Send a request for edit restaurant
//Need handle errors
export async function putRestaurants(restaurantUpdate){
    const response = await restaurantapi.put("/update/", restaurantUpdate);
    return response.data;
}

//Send a request for delete restaurant
//Need handle errors
export async function deleteRestaurants(restaurantID){
    const response = await restaurantapi.delete("/delete/" + restaurantID.toString());
    return response.data;
}