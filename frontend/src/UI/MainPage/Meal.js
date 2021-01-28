import React from 'react'
import selectors from "../../state/ducks/meals/selectors";

const Meal = ({meal}) => {

    const nutritionByMeal = meal.products.reduce((acc, a) =>
            ({
                calories: acc.calories + a.calories,
                proteins: acc.proteins + a.proteins,
                fats: acc.fats + a.fats,
                carbs: acc.carbs + a.carbs
            })
        , {calories: 0, proteins: 0, fats: 0, carbs: 0})


    return(
        <li key={`meal${meal.id}`}>
            <div>
                <div>
                    <h1>{meal.mealtype}</h1>
                    <p>{nutritionByMeal.calories} kcal</p>
                    <p>{nutritionByMeal.proteins} proteins</p>
                    <p>{nutritionByMeal.carbs} carbs</p>
                    <p>{nutritionByMeal.fats} fats</p>
                </div>
                <ul key={`products_list${meal.id}`}>
                    {meal.products?.map(product => {
                        return(
                            <li key={`product${product.id}`}>
                                <div>
                                    <h3>{product.name}</h3>
                                    <p>{product.calories} kcal</p>
                                    <p>{product.proteins} proteins</p>
                                    <p>{product.carbs} carbs</p>
                                    <p>{product.fats} fats</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </li>
    )
}

export default Meal