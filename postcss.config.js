let environment = {
	plugins: [
		'tailwindcss',
		'autoprefixer',
		'postcss-import',
		'postcss-flexbugs-fixes',
	],
}

if (process.env.RAILS_ENV === "production") {
	environment.plugins.push(
		require('@fullhuman/postcss-purgecss')({
			content: [
			'./app/**/*.html.erb',
			'./app/**/*.js.erb',
			'./app/helpers/**/*.rb',
			],
			safelist: ['a', 'open'],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
		})
	)
}

module.exports = environment