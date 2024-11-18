const path = require('path');

module.exports = {
  // Ponto de entrada do seu aplicativo
  entry: './src/main.js', // ajuste o caminho conforme o seu projeto

  // Saída do seu bundle (arquivo compilado)
  output: {
    path: path.resolve(__dirname, 'dist'), // diretório de saída
    filename: 'bundle.js', // nome do arquivo gerado
  },

  // Modo de compilação (produção ou desenvolvimento)
  mode: 'development', // pode ser 'production' ou 'development'

  // Configuração de desenvolvimento (usado durante o desenvolvimento)
  devtool: 'source-map', // fornece map de fontes para depuração

  // Configuração de carregadores (loaders)
  module: {
    rules: [
      {
        test: /\.js$/, // para arquivos .js
        exclude: /node_modules/, // não aplica o loader em node_modules
        use: {
          loader: 'babel-loader', // usa o Babel para transpilar o JavaScript
          options: {
            presets: ['@babel/preset-env'], // configura Babel para usar presets
          },
        },
      },
      {
        test: /\.css$/, // para arquivos .css
        use: ['style-loader', 'css-loader'], // usa esses dois loaders para manipular CSS
      },
    ],
  },

  // Configuração de servidor de desenvolvimento (opcional, caso esteja usando webpack-dev-server)
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // pasta onde o conteúdo está
    port: 8080, // porta onde o servidor irá rodar
    open: true, // abre automaticamente o navegador
  },
};
