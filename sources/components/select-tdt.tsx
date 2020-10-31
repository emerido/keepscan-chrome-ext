import React, { FC, useCallback } from 'react'
import styles from './select-tdt.less'
import { fetchRandomTdt } from '~/api'
import {TBTC_TYPE} from "~/consts";

type SelectTdtProps = {
    onSelect: (lotSize: number) => any
}

const lotSizes = (net: 'testNet' | 'mainNet') =>
    net === 'testNet' ? [0.001, 0.01, 0.1, 0.2, 0.5, 1] : [0.01, 0.1, 0.2, 0.5, 1, 5, 10]


export const SelectTdt: FC<SelectTdtProps> = ({ onSelect }) => {
    const onClick = useCallback(
        (size) => {
            fetchRandomTdt(size).then((result) => {
                onSelect(result.address)
            })
        },
        [onSelect]
    )

    const sizes = lotSizes(TBTC_TYPE)
        .map((size) => <LotSize key={size} size={size} onClick={onClick} />)

    return <div className={styles.list}>{sizes}</div>
}

const LotSize = ({ size, onClick }) => {
    const onClicked = useCallback(() => {
        onClick(size)
    }, [size, onClick])
    return (
        <div className={styles.lot_size} onClick={onClicked}>
            <span>{size} ฿</span>
        </div>
    )
}
