import React, { useCallback, useEffect, useState } from 'react'
import styles from './app.less'
import { StatCard } from 'components/stat'
import { fetchStats, getTbtcHost } from '~/api'
import { Currency } from 'components/format/numbers'
import { SelectTdt } from 'components/select-tdt'
import { ChromeTabsQuery, TBTC_TYPE, TBTC_URL } from '~/consts'

export const App = () => {
    const [stats, setStats] = useState<any>({})

    useEffect(() => {
        fetchStats().then((stats) => setStats(stats || {}))
    }, [])

    const sendMessage = useCallback((address) => {
        chrome.tabs.query(ChromeTabsQuery, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { sender: 'popup', action: 'insert-tdt', payload: address },
                (response) => {
                    console.log('Response is', response)
                }
            )
        })
    }, [])

    const content = TBTC_URL.match(/tbtc\.network\/redeem\/?$/) ? (
        <SelectTdt onSelect={sendMessage} />
    ) : (
        <div className={styles.grid}>
            <StatCard title="Current Supply">
                <StatValue value={stats.totalSupply} placeholder="-">
                    <Currency value={stats.totalSupply} />
                </StatValue>
            </StatCard>
            <StatCard title="Total Minted">
                <StatValue value={stats.totalMinted} placeholder="-">
                    <Currency value={stats.totalMinted} />
                </StatValue>
            </StatCard>
            <StatCard title="Supply Cap">
                <StatValue value={stats.supplyCap} placeholder="-">
                    <Currency value={stats.supplyCap} />
                </StatValue>
            </StatCard>
        </div>
    )

    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <a href="https://keepscan.com/" target="_blank" className={styles.link}>
                    <h1 className={styles.logo}>KeepScan</h1>
                </a>

                <div className={styles.network}>{TBTC_TYPE.toLowerCase()}</div>
            </div>

            <div className={styles.content}>{content}</div>

            <div className={styles.footer}>
                <a target="_blank" href={getTbtcHost(TBTC_TYPE)} className={styles.tbtcLink}>
                    Open tBTC DApp
                </a>
            </div>
        </div>
    )
}

const StatValue = ({ value, children, placeholder }) => {
    if (null == value) {
        return placeholder
    }
    return children
}
