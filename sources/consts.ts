import {NetworkType} from "~/types";

export const ChromeTabsQuery = {
    active: true,
    currentWindow: true,
}

export let TBTC_TYPE: NetworkType = 'mainNet'
export let TBTC_URL:string = ''


chrome.tabs.query(ChromeTabsQuery, (tabs) => {
    TBTC_URL = tabs[0].url
    TBTC_TYPE = tabs[0].url.match(/dapp\.test/) ? 'testNet' : 'mainNet'
})
