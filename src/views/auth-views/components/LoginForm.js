import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInWithGoogle, 
	signInWithFacebook 
} from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const LoginForm = props => {
	
	const navigate = useNavigate();

	const { 
	
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		signIn, 
		token, 
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect = true
	} = props

	const initialCredential = {
		// email: 'user1@themenate.net',
		// password: '2005ipo'
		email: 'yourmail@gmail.com',
		password: 'Password'
	}

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	});
	


	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form" 
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email or username',
						},
						{ 
							type: 'text',
							message: 'Please enter a validate email or user name!'
						}
					]} >
					<Input prefix={<MailOutlined className="" style={{color:'rgb(177, 149, 65)'}}  />} style={{border:'1px solid black'}}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your passwordd',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="" style={{color:'rgb(177, 149, 65)'}} />} style={{border:'1px solid black'}}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} style={{color:'black',background:'rgb(177, 149, 65)',border:'1px solid black'}}>
						Sign In
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} style={{color:'black',background:'white',border:'none'}}>
						Sign In Using Secret
					</Button>
				</Form.Item>
			
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
