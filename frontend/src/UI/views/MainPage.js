import React, {useEffect} from 'react'
import DateBar from "../MainPage/DateBar";
import Meals from "../MainPage/Meals";
import Footer from "../MainPage/Footer";

import {connect} from "react-redux";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {default as productsOperations} from "../../state/ducks/products/operations";
import {default as mealsOperations} from "../../state/ducks/meals/operations"
import operations from "../../state/ducks/user/operations";

const MainPage = ({fetchDays, fetchProducts, fetchUser, fetchMeals}) => {

    useEffect(() => {
        fetchDays();
        fetchProducts();
        fetchUser();
        fetchMeals();
        },[fetchDays, fetchProducts, fetchUser, fetchMeals])

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
        meals: state.entities.meals.allIds.map(n => state.entities.meals.byId[n]),
        days: state.entities.days.allIds.map(n => state.entities.days.byId[n]),
        products: state.entities.products.allIds.map(n => state.entities.products.byId[n]),
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
        },
        fetchUser: (userId) => {
            dispatch(operations.getUser(userId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

