import React from 'react'
import {connect} from "react-redux";
import Product from "./Product";
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";
import FindPage from "../views/FindPage";

const Meal = ({meal, userId, day, deleteMeal, updateDay}) => {

    const nutritionByMeal = meal?.products?.reduce((acc, a) =>
            ({
                calories: acc.calories + a.calories,
                proteins: acc.proteins + a.proteins,
                fats: acc.fats + a.fats,
                carbs: acc.carbs + a.carbs
            })
        , {calories: 0, proteins: 0, fats: 0, carbs: 0})

    const DeleteButton = () => {
        return (
            <button
            onClick={() => {
                const newDay = {...day, meals: day.meals.filter(n => n !== meal.id)}
                deleteMeal(userId, meal.id)
                updateDay(userId, newDay)
            }}>Delete</button>
        )
    }

    const MealInfo = () => {
        return typeof nutritionByMeal !== undefined ? (
            <div>
                <h1>{meal.mealtype}</h1>
                <p>{nutritionByMeal?.calories} kcal</p>
                <p>{nutritionByMeal?.proteins} proteins</p>
                <p>{nutritionByMeal?.carbs} carbs</p>
                <p>{nutritionByMeal?.fats} fats</p>
            </div>
        ) : (
            <div>
                <h1>{meal.mealtype}</h1>
            </div>
        )
    }

    const ProductsList = () => {
        return(
            <ul key={`products_list${meal.id}`}>
                {meal.products?.map(product => {
                    return(
                        <Product product={product} meal={meal}/>
                    )
                })}
            </ul>
        )
    }

    const AddButton = () => {
        return(
            <button>
                Add product
            </button>
        )
    }

    const ConditionalRender = () => {
        return (
            typeof nutritionByMeal !== undefined && typeof day !== undefined ?
            (
            <React.Fragment>
                <MealInfo />
                <DeleteButton />
                <ProductsList />
                {/*<AddButton />*/}
                <FindPage meal={meal}/>
            </React.Fragment>
        ) : (
            <React.Fragment>
               <p>Loading...</p>
            </React.Fragment>
        )
        )}

    return(
        <li key={`meal${meal.id}`}>
            <div>
                <ConditionalRender />
            </div>
        </li>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMeal: (userId, mealId) => dispatch(mealsOperations.deleteMeal(userId, mealId)),
        updateDay: (userId, day) => dispatch(daysOperations.updateDay(userId, day))
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.userState.userId,
        day: state.entities.days.byId[state.displayedDate]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meal)