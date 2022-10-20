import React, { ReactNode, Suspense as SuspenseReact, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import { utilsCss } from '../../index';

interface SuspenseProps {
	children?: ReactNode;
	message?: ReactNode;
	size?: number | string;
	fallback?: ReactNode;
}

const Suspense: React.FC<SuspenseProps> = ({ children, message, size, fallback }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const minHeight = document.body.clientHeight * (80 / 100);

	useEffect(() => {
		setTimeout(() => setVisible(true), 200);
	}, [])

	const render = () => (
		<Row align='middle'
			justify='center'
			style={{ minHeight: size || minHeight }}>
			<Col span={24}
				className={[utilsCss.center, utilsCss.h2].join(' ')}>
				{visible &&
					<span>
						{message || 'Carregando Sistema'} <br /> <Spin size="large" />
					</span>
				}
			</Col>
		</Row>
	);

	return (
		<SuspenseReact fallback={fallback || render()}>
			{children}
		</SuspenseReact>
	);
}

export default Suspense;