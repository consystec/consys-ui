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
	let ref: HTMLDivElement;
	let timeout: NodeJS.Timeout;

	const onSeeMore = () => {
		setViewAll(old => !old);
	}

	const elementRef = (divRef: HTMLDivElement) => {
		const { onTruncate } = props;

		ref = divRef;

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			let text = '';

			if (ref.offsetHeight < ref.scrollHeight || ref.offsetWidth < ref.scrollWidth) {
				text = ref.innerText;
			}

			setText(text);
			onTruncate?.(text);
		}, 100);
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
				<div className={truncateCss.seeMore}>
					{button}
				</div>
				: null}
		</Tooltip>
	);
}

export default Truncate;