import React, { Component } from 'react'

import {  Route, Navigate, Routes } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Billing from './Billing';
import Notification from './Notification';

const url = '/app/pages/setting'




const SettingContent = () => {

	return (
		<Routes>
			<Route path="edit-profile" element={<EditProfile />} />
			<Route path="change-password" element={<ChangePassword />} />
			<Route path="billing" element={<Billing />} />
			<Route path="notification" element={<Notification />} />
			<Route path="*" element={<Navigate to="edit-profile" replace />} />
		</Routes>
	)
}

export class Setting extends Component {
	render() {
		return (
			<>
			<h1>Setting</h1>
			</>
			
    	);
	}
}

export default Setting
