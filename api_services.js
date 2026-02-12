export async function weatherService(city) {
    const URL_SERVICE = `http://api.weatherapi.com/v1/current.json?key=312f5712e6b047058f2200626252611&q=${city}`
    const resp = await fetch(URL_SERVICE)
    const data = await resp.json()
    return `weather in ${data.location.name}; temperature ${data.current.temp_c}, condition ${data.current.condition.text}`
    
}
export async function exchangeRateService(codeFrom, codeTo) {
    const URL_SERVICE = 'https://data.fixer.io/api/latest?access_key=b2d71961ebe71a300a02e73d03b6ebc8'
    const resp = await fetch(URL_SERVICE)
    const data = await resp.json()
    return `1 ${codeFrom} = ${Number(data.rates[codeTo] / data.rates[codeFrom]).toFixed(2)} ${codeTo}`

}