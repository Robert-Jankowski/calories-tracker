import React from 'react'
import Meal from "./Meal";

const Meals = ({mealsByDay}) => {
    return(
        <section>
            <ul>
            {mealsByDay?.meals.map(meal => {
                return(
                    <Meal meal={meal}/>
                )
            })}
            </ul>
        </section>
    )
}
export default Meals