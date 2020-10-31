import React, { FC, useMemo } from 'react'

type NumberProps = {
    suffix?: React.ReactNode
    precision?: number
    value: string | number
}

export const Number: FC<NumberProps> = ({ value, suffix, precision }) => {
    const number = useMemo(() => parseFloat(parseFloat(value as string).toFixed(precision)).toString(), [
        value,
        precision,
    ])

    return (
        <div>
            {number}
            {suffix}
        </div>
    )
}

Number.defaultProps = {
    precision: 10
}

type CurrencyProps = {
    precision?: number
    currency?: 'tbtc' | 'btc' | 'eth' | 'usd'
    value: string | number
}

const CurrencyTypes = {
    'usd': "$",
    'eth': 'ETH',
    'btc': 'BTC',
    'tbtc': 'TBTC'
}

export const Currency: FC<CurrencyProps> = ({value, precision, currency}) => {
    const suffix = ' ' + CurrencyTypes[currency]
    return <Number value={value} precision={precision} suffix={suffix} />
}

Currency.defaultProps = {
    precision: 2,
    currency: 'tbtc'
}
