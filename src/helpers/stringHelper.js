import {PLATFORMS, BROWSERS} from "../Constants";

export function getBrowser(userAgent){
    if(!userAgent) return '';

    userAgent = userAgent.toLowerCase();

    for(const browser of BROWSERS) if(userAgent.indexOf(browser) > -1) return browser;

    return '';
}

export function getPlatform(userAgent){
    if(!userAgent) return '';

    userAgent = userAgent.toLowerCase();

    for(const platform of PLATFORMS) if(userAgent.indexOf(platform) > -1) return platform;

    return '';
}
