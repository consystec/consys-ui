import React, { ReactNode } from 'react';
import { utilsCss } from '../../index';

interface DetailInputProps {
	title?: string;
	children?: ReactNode;
	extra?: boolean;
}

const DetailInput: React.FC<DetailInputProps> = ({ title, children, extra }) => {

	return (
		<span>
			<div className={utilsCss.mb1}
				style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
				{title}
			</div>
			<div className={utilsCss.mb2}>
				{children}
			</div>
			{extra &&
				<div className={utilsCss.mtn1}>
					{extra}
				</div>
			}
		</span>
	);
}

export default DetailInput;