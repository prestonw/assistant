module.exports = (api) => {
	// Prevent cache conflicts between test/build environments
	api.cache.using(() => process.env.NODE_ENV);
  
	const isTest = api.env('test');
  
	return {
	  presets: [
		[
		  '@babel/preset-env',
		  isTest
			? { targets: { node: 'current' } } // Optimised for Jest
			: { modules: false }               // Optimised for Webpack build
		],
		'@babel/preset-react'
	  ],
	  plugins: ['@babel/plugin-transform-runtime'],
	};
  };  