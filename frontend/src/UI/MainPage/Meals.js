import React from 'react'
import Meal from "./Meal";
import AddMealForm from "./AddMealForm";

const Meals = ({mealsByDay}) => {

    const ListOfMeals = () => {
        return(
            <section>
                {mealsByDay?.meals.map((meal,i) => {
                    return(
                        <Meal meal={meal} key={`meal${i}`}/>
                    )
                })}
            </section>
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