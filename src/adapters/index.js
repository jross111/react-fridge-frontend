const baseUrl = 'http://localhost:3000/api/v1'

export default class FridgeAdapter  {
  static all(){
    return fetch(`${this.foodUrl()}`)
      .then( res => res.json() )
  }

  static allCats(){
    return fetch(`${this.catsUrl()}`)
      .then( res => res.json() )
  }


  static createCat(cat){
    return fetch(`${this.foodUrl()}`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        category: {
          name: cat.name.value,
        }
      })
    }).then(response => response.json() )
  }


  static create(food){
    return fetch(`${this.foodUrl()}`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        food: {
          name: food.name.value,
          expiration_date: food.expiration_date.value,
          quantity: food.quantity.value,
          category_id: parseInt(food.category.value)
        }
      })
    }).then(response => response.json() )
    // .then(window.location.href = "http://localhost:3001/foods")
  }

  static update(food){
    return fetch(`${this.foodUrl()}/${food.id}`, {
      method: 'PATCH',
      headers: this.headers(),
      body: JSON.stringify({
        food: {
          name: food.name.value,
          days: food.days.value,
          quantity: food.quantity.value,
          category_id: food.category_id.value
        }
      })
    })
  }

  static destroy(id){
    return fetch(`${this.foodUrl()}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json() )
  }

  static headers(){
    return {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }

  static foodUrl(){
    return `${baseUrl}/foods`
  }

  static catsUrl (){
    return `${baseUrl}/categories`
  }
}
