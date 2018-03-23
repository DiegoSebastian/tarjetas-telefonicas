import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
	render(){
		return(
			<div className="login">
				<p className="loginTitle">Por favor inicie sesión con Google para usar la aplicación</p>
				<button className="loginButton" onClick={this.props.onAuth}><i className="fab fa-google"></i>Iniciar sesión con Google</button>
			</div>
		)
	}
}

export default Login