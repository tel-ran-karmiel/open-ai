import {weatherService, exchangeRateService} from "./api_services.js"
async function getWeather(city) {
    return weatherService(city)
}
async function exchangeRate(codeFrom, codeTo) {
    return exchangeRateService(codeFrom, codeTo)
}
export const TOOLS = {
    "getWeather": async (city) => await getWeather(city),
    "exchangeRate": async (codeFrom, codeTo) => await exchangeRate(codeFrom, codeTo)
}