// REACT, REDUX
import React from "react";
import {connect} from "react-redux";

// SELECTORS, ACTIONS, OPERATIONS
import selectors from "../../state/ducks/products/selectors";
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";

// Material-UI
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";

// COMPONENTS
import AutocompleteForm from "./AutocompleteForm";

const TableFooterBody = ({day, meal, userId, deleteMeal, updateDay, products}) => {

    const DeleteMeal = () => {
        return (
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    const newDay = {...day, meals: day.meals.filter(n => n !== meal.id)}
                    deleteMeal(userId, meal.id)
                    updateDay(userId, newDay)
                }}
            >
                Delete
            </Button>
        )
    }

    return(
        <React.Fragment>
            <AutocompleteForm products={products} meal={meal}/>
            <TableCell><DeleteMeal/></TableCell>
            <TableCell/>
            <TableCell/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        products: selectors.products(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMeal: (userId, mealId) => dispatch(mealsOperations.deleteMeal(userId, mealId)),
        updateDay: (userId, day) => dispatch(daysOperations.updateDay(userId, day)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableFooterBody)