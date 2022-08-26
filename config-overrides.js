//配置具体的修改规则
const { override, fixBabelImports,addLessLoader,adjustStyleLoaders} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions:{
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#3E7AF7' },
    }
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
);