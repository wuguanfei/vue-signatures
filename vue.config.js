module.exports = {
	// 选项...
	publicPath: process.env.NODE_ENV === 'production'
		? '/vue-signatures/'
		: '/'
}