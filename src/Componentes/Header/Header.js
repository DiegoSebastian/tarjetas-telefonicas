import React, { Component } from 'react'
import './Header.css'
import logo from '../../logo.svg';

class Header extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<header className="App-header">
    	      <img src={logo} className="App-logo" alt="logo" />
    	      <h1 className="App-title">Tarjetas telefónicas</h1>
    	      {(this.props.user) ? <button className="logoutButton" onClick={this.props.onLogout}><i className="fas fa-sign-out-alt"></i>Cerrar sesión</button> : ''}
    	      
    	    </header>
		)
	}
}

export default Header