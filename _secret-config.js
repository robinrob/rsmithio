exports = module.exports = function(config) {
    return require('merge')(config, {
        cloudflare: {
            token  : '431609236d8480cf29f6cfbc2cbe34374ced5',
            email  : 'rs@rsmith.io',
            domain : 'rsmith.io'
        },
    })
}
