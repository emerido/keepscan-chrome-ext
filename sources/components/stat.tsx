import React from 'react'
import styles from './stat.less'
import { Card } from 'components/card'

export const StatCard = ({ title, value = null, children = null }) => {
    return (
        <Card>
            <div className={styles.card}>
                <div className={styles.title}>{title}</div>
                <div className={styles.value}>{value || children}</div>
            </div>
        </Card>
    )
}
