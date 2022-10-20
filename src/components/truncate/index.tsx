import React, { useState, ReactNode, CSSProperties } from 'react';
import { Tooltip, TooltipProps } from 'antd';
import truncateCss from '../../css/truncate.css';

interface TruncateProps {
	seeMore?: boolean;
	tooltip?: boolean;
	onTruncate?: (text: string) => void;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	tooltipProps?: TooltipProps,
	size?: string | number;
}

const Truncate: React.FC<TruncateProps> = (props) => {
	const [text, setText] = useState('');
	const [viewAll, setViewAll] = useState(false);

	const onSeeMore = () => {
		setViewAll(old => !old);
	}

	const elementRef = (ref: HTMLDivElement) => {
		const { offsetHeight, scrollHeight, offsetWidth, scrollWidth, innerText } = (ref || {});

		setTimeout(() => {
			if (offsetHeight < scrollHeight || offsetWidth < scrollWidth) {
				setText(innerText);
			} else {
				setText('');
			}

			props?.onTruncate?.(text);
		}, 100)
	}

	const { seeMore, className, children, size, tooltip, tooltipProps } = props;
	const style = props.style || {};

	if (typeof size !== 'undefined') {
		style.width = size;
	}

	const button = (
		<a onClick={onSeeMore}>
			{!viewAll ? 'Ver mais...' : 'Ver menos...'}
		</a>
	);

	return (
		<Tooltip title={!viewAll && tooltip ? text : ''}
			overlayClassName='not-draggable'
			placement='top'
			{...tooltipProps}>
			<div ref={elementRef}
				style={style}
				className={[className, 'not-draggable', !viewAll ? truncateCss.truncate : ''].join(' ')}>
				{children}
				{viewAll ? button : null}
			</div>
			{text && seeMore && !viewAll ?
				<div onClick={onSeeMore}
					style={{
						backgroundColor: '#fff',
						marginTop: '-1.2rem',
						position: 'absolute',
						right: 0,
						cursor: 'pointer',
						padding: '0px 8px',
					}}>
					{button}
				</div>
				: null}
		</Tooltip>
	);
}

export default Truncate;