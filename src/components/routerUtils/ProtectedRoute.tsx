import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../index';

interface ProtectedRouteProps {
	to?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ to = '/' }) => {
	const [user, setUser] = useState(auth?.user);

	useEffect(() => {
		const onUserChange = auth.onUserChange((nUser: any) => {
			setUser(nUser);
		});

		return () => auth.removeUserChange(onUserChange);
	}, [])

	if (!user) {
		return (
			<Navigate to={to}
				replace />
		);
	}

	return <Outlet />;
}

export default ProtectedRoute;