import React from 'react'

export const Bar = ({data, max}) => {
    console.log(data)
    console.log(max)
    return (
        <div className="column">
        {data.symbol}
        <div style={{height: (data.quote.USD.price/max) * 100 + "px"}} className="bar">
            
        </div>
        </div>
    )
}
