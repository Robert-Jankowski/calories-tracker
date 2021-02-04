import {v4 as uuid} from "uuid"
import React, {useState} from "react"
import {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";
import {connect} from "react-redux";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const AddMealForm = ({userId, day, addMeal, updateDay}) => {

    const [selected, setSelected] = useState("breakfast")
    const options = ["breakfast", "brunch", "lunch", "dinner", "snack", "supper"]

    const FormSelect = () => {
        return(
            <FormControl>
            <Select
                variant="filled"
                labelId="mealselect"
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value)
                }}>
                {options.map((option,i) => {
                            return(
                                <MenuItem key={`menuitem${i}`} value={option}>{option}</MenuItem>
                            )
                        })}
            </Select>
            </FormControl>
        )
    }

    const FormButton = () => {
        return(
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                const newMealId = uuid()
                addMeal(userId, selected, newMealId)
                updateDay(userId, {...day, meals: [...day.meals, newMealId]})
            }}>
                Add meal
            </Button>
        )
    }

    return(
        <header style={{display: "flex", justifyContent: "center"}}>
            <FormSelect />
            <FormButton />
        </header>
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