import React, {useEffect} from 'react'
import DateBar from "../MainPage/DateBar";
import Meals from "../MainPage/Meals";
import Footer from "../MainPage/Footer";

import {connect} from "react-redux";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {default as productsOperations} from "../../state/ducks/products/operations";
import {default as mealsOperations} from "../../state/ducks/meals/operations"

const MainPage = ({userId, isUserLogged, fetchDays, fetchProducts, fetchMeals}) => {

    useEffect(() => {
        if(isUserLogged) {
            fetchDays(userId);
            fetchProducts(userId);
            fetchMeals(userId);
        }

        },[fetchDays, fetchProducts, fetchMeals, isUserLogged, userId])

    return(
        <main>
            <DateBar />
            <Meals />
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
        displayedDate: state.displayedDate
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDays: (userId) => {
            daysOperations.getDays(userId)
        },
        fetchProducts: (userId) => {
            productsOperations.getProducts(userId)
        },
        fetchMeals: (userId) => {
            mealsOperations.getMeals(userId)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

