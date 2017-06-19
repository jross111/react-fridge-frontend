import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import FridgeAdapter from '../adapters/index'
import FoodList from './FoodList'
import Form from './Form'
import FoodDetail from './FoodDetail'
import { withRouter } from 'react-router'

export default class FridgeContainer extends Component {
  constructor(){
    super()
    this.state = {
      foods: []
    }

    this.createFood = this.createFood.bind(this)
    this.deleteFood = this.deleteFood.bind(this)

  }

  componentDidMount(){
    FridgeAdapter.all()
    .then(data => {
      this.setState({ foods: data })
    })
  }

  createFood(food){
    FridgeAdapter.create(food)
    .then(food => this.setState((previousState) => {
        return {
          foods: [...previousState.foods, food]
        }
      })
    )
  }

  deleteFood(id){
    FridgeAdapter.destroy(id)
    .then( () => {
      this.setState( previousState => {
        debugger
        return {
          foods: previousState.foods.filter( food => food.id !== id )
        }
      })
    })
  }

  render() {

    return (
      <div className="row">
        <div className="form">
          <Form createFood={this.createFood.bind(this)} />
        </div>
        <div className='col-md-8'>
          <Switch>
            <Route exact path='/foods/new' render={() => <Form createFood={this.createFood.bind(this)} type="Add a food"/>} />

            <Route exact path = '/foods' render= {() => <FoodList foods={this.state.foods} />}/>
            <Route exact path='/foods/:id' render={(routerProps) => {
              const id = routerProps.match.params.id
              const food = this.state.foods.find( s =>  s.id === parseInt(id) )
                if(!food){
                routerProps.history.push("/foods")
                return null
              }
              return <FoodDetail food={food} deleteFood={this.deleteFood}/>
            }} />
          </Switch>

        </div>
      </div>
    )
  }
}
