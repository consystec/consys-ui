import React, { CSSProperties, ReactNode } from 'react';
import { Row, Col } from 'antd';

export interface ScreenProps {
	padding?: number | string;
	style?: CSSProperties;
	children?: ReactNode,
}

const Screen: React.FC<ScreenProps> = ({ padding, style, children }) => {
	return (
		<Row justify='space-around'
			align='middle'>
			<Col span={23}
				style={{ padding: padding || 16, ...style }}>
				{children}
			</Col>
		</Row>
	);
}

export default Screen;