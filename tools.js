import {weatherService, exchangeRateService} from "./api_services.js"
async function getWeather(city) {
    return weatherService(city)
}
async function exchangeRate(codeFrom, codeTo) {
    return exchangeRateService(codeFrom, codeTo)
}
async function travelInfo(info) {
    return info;
}
export const TOOLS = {
    "getWeather": async (city) => await getWeather(city),
    "exchangeRate": async (codeFrom, codeTo) => await exchangeRate(codeFrom, codeTo),
    "travelInfo": async (info) => await travelInfo(info)
}