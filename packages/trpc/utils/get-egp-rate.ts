export const getEgpRate = async () => {
    return await fetch("https://api.exchangerate-api.com/v4/latest/USD").then((data: any) => data.json()).then((data) => data.rates.EGP)
}