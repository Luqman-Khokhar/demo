import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import { 
	EditOutlined, 
	LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'store/slices/authSlice';

const MenuItem = (props) => (
	<a className="d-flex align-items-center" href={props.path}>
		<Icon className="font-size-md" type={props.icon} />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</a>
)

const MenuItemSignOut = (props) => (
	<span className="d-flex align-items-center">
		<LogoutOutlined className="font-size-md" />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</span>
)

export const NavProfile = () => {

	const dispatch = useDispatch();

	const handleClick = ({ key }) => {
		if (key === 'Sign Out') {
			handleSignOut()
		}
	}

	const handleSignOut = () => {
		dispatch(signOut())
	}

	const menu = (
		<Menu
			onClick={handleClick}
			items={
				[
					{
						key: 'Edit Profile',
						label: <MenuItem path="/" label="Edit Profile" icon={EditOutlined} />,
					},
					{
						key: 'Sign Out',
						label: <MenuItemSignOut label="Sign Out" />,
					}
				]
			}
		/>
	) 

	return (
		<Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
			<div className="nav-item">
				<div className="d-flex align-items-center">
					<Avatar src="/img/avatars/thumb1.png" />
					<div className="pl-2 d-none d-sm-block profile-text">
						<div className="font-size-base font-weight-bold">Al slaam</div>
						<span className="opacity-0-8">Lemo Services</span>
					</div>
				</div>
			</div>
		</Dropdown>
	);
}

export default NavProfile
