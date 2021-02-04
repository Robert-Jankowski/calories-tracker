import React from 'react'
import Meal from "./Meal";

const Meals = ({mealsByDay, sumsByMeal}) => {

    const ListOfMeals = () => {
        return(
            <section>
                {mealsByDay?.meals.map((meal,i) =>
                {
                    const sums = sumsByMeal.find(sum => sum.id === meal.id)
                    return(
                        <Meal meal={meal} key={`meal${i}`} sums={sums}/>
                    )
                })}
            </section>
        )
    }


    return(
        <section>
            <ListOfMeals />
        </section>
    )
}


export default Meals