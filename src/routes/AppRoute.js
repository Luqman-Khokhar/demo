import React, { useEffect } from 'react';
import { onBlankLayout } from 'store/slices/themeSlice';
import { useDispatch } from 'react-redux';

const AppRoute = ({ component: Component, routeKey, blankLayout, ...props }) => {

	const dispatch = useDispatch()

	useEffect(() => {
		const isBlank = blankLayout ? true : false
		dispatch(onBlankLayout(isBlank))

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blankLayout])
	
	return (
		<Component {...props} />
	)
}

export default AppRoute