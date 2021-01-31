import React from 'react'
import Meal from "./Meal";
import AddMealForm from "./AddMealForm";

const Meals = ({mealsByDay}) => {

    const ListOfMeals = () => {
        return(
            <div>
                {mealsByDay?.meals.map(meal => {
                    return(
                        <Meal meal={meal}/>
                    )
                })}
            </div>
        )
    }


    return(
        <section>
            <AddMealForm />
            <ListOfMeals />
        </section>
    )
}


export default Meals