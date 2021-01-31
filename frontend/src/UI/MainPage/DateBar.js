import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';

const DateBar = ({changeDay, displayedDate, addDay, days, userId}) => {

    function addDays(datestring, toAdd) {
        const [yy,mm,dd] = datestring.split("-")
        return new Date(parseInt(yy),parseInt(mm) -1,parseInt(dd) + 1 + toAdd).toISOString().slice(0, 10)
    }

    const PreviousDay = () => {

        return(
            <IconButton onClick={() => {
                const previousDay = addDays(displayedDate, -1)
                if (!(previousDay in days))
                    addDay(userId, previousDay)
                changeDay(previousDay)
            }}>
                <ArrowBackIcon />
            </IconButton>
        )
    }

    const NextDay = () => {

        return(
            <IconButton onClick={() => {
                const nextDay = addDays(displayedDate, 1)
                if (!(nextDay in days))
                    addDay(userId, nextDay)
                changeDay(nextDay)
            }}>
                <ArrowForwardIcon />
            </IconButton>
        )
    }
    const DisplayedDate = () => {
        return (
            <h2>{displayedDate}</h2>
        )
    }

    return(
        <section style={{display: "flex", justifyContent: "center"}}>
            <PreviousDay />
            <DisplayedDate />
            <NextDay />
        </section>
    )
}
export default DateBar