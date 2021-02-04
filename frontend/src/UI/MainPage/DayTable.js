import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from "@material-ui/core/TableFooter";
import AddMealForm from "./AddMealForm";
import CircularProgress from "@material-ui/core/CircularProgress";

const DayTable = ({sumByDay, sumsByMeal}) => {


    const TableComponent = () => {
        const data = [sumByDay, ...sumsByMeal]
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" style={{border: "solid 2px #a6a6a6"}}>
                    <TableHead style={{borderBottom: "solid 2px #a6a6a6"}}>
                        <TableRow>
                            <TableCell style={{fontWeight:"bold"}}> DAY SUMMARY </TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, i) => (
                            <TableRow key={row.mealtype}>
                                <TableCell component="th" scope="row">
                                    {row.mealtype}
                                </TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{row.calories}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{row.fats}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{row.carbs}</TableCell>
                                <TableCell align="right"
                                           style={(i === 0) ? {fontWeight: "bold"}: {}}>{row.proteins}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <AddMealForm />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
    const ConditionalRender = () => {
        return (
            typeof sumByDay !== "undefined" && typeof sumsByMeal !== "undefined" ?
                (
                    <TableComponent />
                ) : (
                    <CircularProgress />
                )
        )}

        return (
            <ConditionalRender />
        )

}
export default DayTable