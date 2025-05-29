module.exports = {
  presets: ['babel-preset-expo'], // или 'module:metro-react-native-babel-preset'
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }],
  ],
};
