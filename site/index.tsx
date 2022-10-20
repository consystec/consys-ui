import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import App from './App';

ReactDOM.render(
	<ConfigProvider locale={ptBR}>
		<App />
	</ConfigProvider>,
	document.getElementById('root'),
)