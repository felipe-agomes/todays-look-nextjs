import SetImages from '@/components/SetImages';
import { SetsProps } from '@/@types';

/* eslint-disable @next/next/no-img-element */
export default function ContentImage({ set }: { set: SetsProps }) {
	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '242px',
				height: '309.22px',
				background: '#fff',
				overflow: 'hidden',
			}}
		>
			<SetImages
				size={{ height: 86.04, width: 86.04 }}
				set={set}
				proportion={{ x: 0.67, y: 0.67 }}
			/>
		</div>
	);
}
