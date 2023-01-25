const getResponseHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
    }
}

module.exports = {
    getResponseHeaders
}