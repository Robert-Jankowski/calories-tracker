import React from 'react'

const DateBar = ({changeDay, displayedDate, addDay, days, userId}) => {

    function addDays(datestring, toAdd) {
        const [yy,mm,dd] = datestring.split("-")
        return new Date(parseInt(yy),parseInt(mm) -1,parseInt(dd) + 1 + toAdd).toISOString().slice(0, 10)
    }

    const PreviousDay = () => {

        return(
            <button onClick={() => {
                const previousDay = addDays(displayedDate, -1)
                if (!(previousDay in days))
                    addDay(userId, previousDay)
                changeDay(previousDay)
            }}>
                Previous day
            </button>
        )
    }

    const NextDay = () => {

        return(
            <button onClick={() => {
                const nextDay = addDays(displayedDate, 1)
                if (!(nextDay in days))
                    addDay(userId, nextDay)
                changeDay(nextDay)
            }}>
                Next day
            </button>
        )
    }
    const DisplayedDate = () => {
        return (
            <p>{displayedDate}</p>
        )
    }

    return(
        <section>
            <PreviousDay />
            <DisplayedDate />
            <NextDay />
        </section>
    )
}
export default DateBar