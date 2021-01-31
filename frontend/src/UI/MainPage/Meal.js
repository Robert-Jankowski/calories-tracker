import React from 'react'
import {connect} from "react-redux";
import operations, {default as mealsOperations} from "../../state/ducks/meals/operations";
import {default as daysOperations} from "../../state/ducks/days/operations";

//MATERIALS-UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import TableFooterBody from "./TableFooterBody";

const Meal = ({meal, userId, day, deleteMeal, updateDay, replaceMeal}) => {


    const useStyles = makeStyles({
        table: {
            maxWidth: 800,
            width: 1000
        },
        icon: {
            color:"#bd3611",
            transition: ".5s",
            '&:hover': {
                color: "#ff0000",
                cursor: "pointer"
            }

        }
    });
    const classes = useStyles();

    const nutritionByMeal = meal?.products?.reduce((acc, a) =>
            ({
                calories: acc.calories + a.calories,
                proteins: acc.proteins + a.proteins,
                fats: acc.fats + a.fats,
                carbs: acc.carbs + a.carbs
            })
        , {calories: 0, proteins: 0, fats: 0, carbs: 0})

    const DeleteProduct = ({product}) => {
        return (
            <IconButton aria-label="delete"
                        onClick={() => {
                            replaceMeal(userId, {...meal,
                                products: [...meal.products.filter(p => p.id !== product.id)].map(p => p.id)})
                        }}>
                <DeleteIcon style={{margin: "0"}}/>
            </IconButton>
        )
    }



    const ProductTable = ({meal_name, products}) => {

        return (
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table" style={{border: "solid 2px #a6a6a6"}}>
                    <TableHead style={{borderBottom: "solid 2px #a6a6a6"}}>
                        <TableRow>
                            <TableCell><h2>{meal_name}</h2></TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, i) => (
                            <TableRow key={product.name}>
                                <TableCell component="th" scope="row">
                                    {i === 0 ?
                                        (<p/>) : (
                                        <div>
                                            <DeleteProduct product={product} />
                                            {product.name}
                                        </div>
                                        )}

                                </TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{product.calories}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{product.fats}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{product.carbs}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{product.proteins}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableFooterBody day={day} meal={meal} userId={userId}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }

    const ConditionalRender = () => {
        return (
            typeof nutritionByMeal !== "undefined" && typeof day !== "undefined" && typeof meal !== "undefined" ?
            (
            <React.Fragment>
                <ProductTable products={[nutritionByMeal,...meal?.products]} meal_name={meal?.mealtype}/>
            </React.Fragment>
        ) : (
            <React.Fragment>
               <p>Loading...</p>
            </React.Fragment>
        )
        )}


    return(
            <div>
                <ConditionalRender />
            </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        replaceMeal: (userId, meal) => dispatch(operations.replaceMeal(userId, meal))
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.userState.userId,
        day: state.entities.days.byId[state.displayedDate]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meal)