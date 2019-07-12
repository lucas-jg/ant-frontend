export const numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const backendHost = process.env.BACKEND_DOMAIN || 'http://localhost:1337'
