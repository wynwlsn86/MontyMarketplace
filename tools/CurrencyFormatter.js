const usdFormatter = new Intl.NumberFormat('en-us', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})

module.exports = usdFormatter
