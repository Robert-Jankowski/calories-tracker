import React from 'react'
import Meal from "./Meal";
import AddMealForm from "./AddMealForm";
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {connect} from "react-redux";

const Meals = ({mealsByDay}) => {

    const ListOfMeals = () => {
        return(
            <ul>
                {mealsByDay?.meals.map(meal => {
                    return(
                        <Meal meal={meal}/>
                    )
                })}
            </ul>
        )
    }


    return(
        <section>
            <ListOfMeals />
            <AddMealForm />
        </section>
    )
}


export default Meals