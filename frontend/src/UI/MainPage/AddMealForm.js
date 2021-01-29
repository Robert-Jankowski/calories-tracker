import {v4 as uuid} from "uuid"
import React, {useState} from "react"
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {connect} from "react-redux";

const AddMealForm = ({userId, day, addMeal, updateDay}) => {

    const [selected, setSelected] = useState("breakfast")
    const options = ["breakfast", "brunch", "lunch", "dinner", "snack", "supper"]

    const FormSelect = () => {
        return(
            <select
                onChange={(e) => {
                    setSelected(e.target.value)
                }}>
                {options.map(option => {
                    return(
                        <option value={option}>{option}</option>
                    )
                })}
            </select>
        )
    }

    const FormButton = () => {
        return(
            <button onClick={() => {
                const newMealId = uuid()
                addMeal(userId, selected, newMealId)
                updateDay(userId, {...day, meals: [...day.meals, newMealId]})
            }}>
                Add meal
            </button>
        )
    }

    return(
        <div>
            <FormSelect />
            <FormButton />
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMeal: (userId, meal_type , meal_id) => dispatch(mealsOperations.addMeal(userId, meal_type, meal_id)),
        updateDay: (userId, day) => dispatch(daysOperations.updateDay(userId, day))
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.userState.userId,
        day: state.entities.days.byId[state.displayedDate]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMealForm)