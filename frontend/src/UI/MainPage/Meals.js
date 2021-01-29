import React from 'react'
import Meal from "./Meal";
import AddMealForm from "./AddMealForm";

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