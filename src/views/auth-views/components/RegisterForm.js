import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined,UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert} from "antd";
import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"


const rules = {
	username: [
		{ 
			required: true,
			message: 'Please input your username'
		},
		{ 
			type: 'username',
			message: 'Please enter a valid username'
		}
	],
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}


  

            
export const RegisterForm = (props) => {

	const [isValid, setIsValid] = useState(false);


    
	const handlePasswordChange = (event) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!\/\\]).{8,}$/;
		const value = event.target.value;
		const isValid = regex.test(value);
		setIsValid(isValid);
	  };




	const handleUsernameChange = (event) => {
		const regex = /^[a-zA-Z0-9_-]*$/;
		const value = event.target.value;
		const isValid = regex.test(value);
		setIsValid(isValid);
	  
	
	}; 



	      

	const { signUp, showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, allowRedirect = true } = props
	const signUpUrl = `http://192.168.1.100:8000/api/users/add_user`
	const method = "POST"
	// eslint-disable-next-line no-unused-vars
	const send_request = (values, url) => {
        // eslint-disable-next-line no-unused-vars
        const response = fetch(url, {
			method: method,
            body: JSON.stringify(values),
            headers: {
				'Content-Type': 'application/json',
		}}
		).then
	}
	const [form] = Form.useForm();

	const navigate = useNavigate();

	const onSignUp = () => {
    	form.validateFields().then(values => {
			showLoading()
			signUp(values, signUpUrl)
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

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


			                 {/* FORM CODE WITH RULES */} 



			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
			<Form.Item 
					name="username" 
					label="Username" 
					hasFeedback
				
				
					rules={[
						{
						  required: true,
						  message: "Required"
						}
						/* {
						  validator: (_, value) =>
							value.includes(" ")
							  ? Promise.resolve()
							  : Promise.reject(new Error("No spaces allowed"))
						} */,
						/* {
							userNameRule
						} */
						
						() => ({
						  validator(_, value) {
							if (isValid) {
							  return Promise.resolve();
							}
							return Promise.reject(
							  new Error('Username can only contain alphabets, digits, "-" and "_"')
							);
						  },
						}),
					  ]}
					  
				
				
				
				>
					<Input prefix={<UserOutlined  className="" style={{color:'#B19541'}}/>}style={{border:'1px solid black'}} maxlength="63"  minLength="4"  onChange={handleUsernameChange}/>
				</Form.Item>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="" style={{color:'#B19541'}}/>}style={{border:'1px solid black'}}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Password" 
					/* rules={rules.password} */
					rules={[
						{
						  required: true,
						  message: 'Please input your password!',
						},
						() => ({
						  validator(_, value) {
							if (isValid) {
							  return Promise.resolve();
							}
							return Promise.reject(
							  new Error(
								'Password must contain at least one capital letter, one small letter, and one number. It should not contain "!", "/" or "\" and should be at least 8 characters long.'
							  )
							);
						  },
						}),
					  ]}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="" style={{color:'#B19541'}}/>}style={{border:'1px solid black'}} maxlength="63"  minLength="8 " onChange={handlePasswordChange} />
				</Form.Item>
				<Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="" style={{color:'#B19541'}} />}style={{border:'1px solid black'}}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} style={{color:'black',backgroundColor:"#B19541"}}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signUp,
	showAuthMessage,
	hideAuthMessage,
	showLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
