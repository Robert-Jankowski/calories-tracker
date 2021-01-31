import React, {useEffect} from 'react'
import DateBar from "../MainPage/DateBar";
import Meals from "../MainPage/Meals";
import Footer from "../MainPage/Footer";

import {connect} from "react-redux";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {default as productsOperations} from "../../state/ducks/products/operations";
import {default as mealsOperations} from "../../state/ducks/meals/operations"
import {default as daysActions} from "../../state/ducks/days/actions"
import selectors from "../../state/ducks/meals/selectors";

const MainPage = ({userId, isUserLogged,
                  changeDay, addDay, days, displayedDate,
                  fetchDays, fetchProducts, fetchMeals,
                  mealsByDay}) => {

    useEffect(() => {
        if(isUserLogged) {
            fetchDays(userId);
            fetchProducts(userId);
            fetchMeals(userId);
        }

        },[fetchDays, fetchProducts, fetchMeals, isUserLogged, userId])

    useEffect(() => {
        if(isUserLogged && !(displayedDate in days))
            addDay(userId, displayedDate)
    },[fetchDays])

    return(
        <main style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <DateBar changeDay={changeDay} displayedDate={displayedDate} addDay={addDay} days={days} userId={userId}/>
            <Meals mealsByDay={mealsByDay}/>
            <Footer />
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userState.userId,
        isUserLogged: state.userState.isLogged,
        meals: state.entities.meals.allIds.map(n => state.entities.meals.byId[n]),
        days: state.entities.days.allIds.map(n => state.entities.days.byId[n]),
        products: state.entities.products.allIds.map(n => state.entities.products.byId[n]),
        displayedDate: state.displayedDate,
        mealsByDay: selectors.mealsByDay(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDays: (userId) => {
            dispatch(daysOperations.getDays(userId))
        },
        fetchProducts: (userId) => {
            dispatch(productsOperations.getProducts(userId))
        },
        fetchMeals: (userId) => {
            dispatch(mealsOperations.getMeals(userId))
        },
        changeDay: (day) => {
            dispatch(daysActions.changeDisplayedDate(day))
        },
        addDay: (userId, dayId) => {
            dispatch(daysOperations.addDay(userId, dayId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

