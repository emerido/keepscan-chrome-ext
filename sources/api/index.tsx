import { NetworkType } from '~/types'
import { TBTC_TYPE } from '~/consts'

const http = {
    get: (url: string): Promise<any> => {
        const path = getKeepscanPath(TBTC_TYPE, url)

        return fetch(path)
            .then((value) => value.json())
            .catch((error) => console.error(error))
    },
}

export const fetchStats = () => http.get('/api/statistic')
export const fetchRandomTdt = (lotSize: number) => http.get(`/api/deposit/random?lotSize=${lotSize}`)

export const getTbtcHost = (network: NetworkType) =>
    network === 'testNet' ? 'https://dapp.test.tbtc.network/' : 'https://dapp.tbtc.network/'

export const getTbtcPath = (network: NetworkType, path: string) => getTbtcHost(network).replace(/\/$/, '') + path

export const getKeepscanHost = (network: NetworkType) =>
    network === 'testNet' ? 'https://testnet.keepscan.com/' : 'https://keepscan.com/'

export const getKeepscanPath = (network: NetworkType, path: string = '/') =>
    getKeepscanHost(network).replace(/\/$/, '') + path
