import React from 'react';
import { Row, Col } from 'antd';
import pkg from '../package.json';

const App: React.FC = () => {

	return (
		<Row style={{ marginTop: 15 }}
			justify='center'>
			<Col>
				<h1>Drawing UI {pkg.version}</h1>
			</Col>
			<Col span={24}>
				<Row align='middle'
					justify='center'>
					<Col span={6}>
						{/*Componente para testar aqui*/}
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default App;