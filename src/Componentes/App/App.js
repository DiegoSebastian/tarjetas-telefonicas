import React, { Component } from 'react';
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer.js'
import Login from '../Login/Login'
import { Route, MemoryRouter } from 'react-router-dom';
import firebase from 'firebase'
import './App.css';
import swal from 'sweetalert';

class App extends Component {

	constructor() {
		super()
		this.state = {
			user: null
		}

		this.handleOnAuth = this.handleOnAuth.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					user
				})
			} else {
				this.setState({user: null})
			}
		})
	}

	handleOnAuth () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			.then(result => swal({
				title: `Ha inciado sesión correctamente, bienvenido ${result.user.displayName.split(' ')[0]}!`,
				icon: 'success',
			}))
			.catch(error => console.error(`Error: ${error.code}: ${error.message}`))
	}

	handleLogout () {
		firebase.auth().signOut()
			.then(() => swal({
				title: `Ha cerrado sesión corractamente, hasta luego ${this.state.user.displayName.split(' ')[0]}!`,
				icon: 'success',
			}))
			.catch(() => alert('ha ocurrido un error'))
	}

	render() {
		return (
			<MemoryRouter>
			<div className="App">
				<Header onLogout={this.handleLogout} user={this.state.user}/>
				<Route exact path='/' render={() => {
         		   if (this.state.user) {
         		     return (
         		       <Main 
         		         user={this.state.user}
         		         />
         		     )
         		   } else {
         		     return <Login onAuth={this.handleOnAuth}/>
         		   }
         		 }} />
				<Footer />
			</div>
			</MemoryRouter>
		);
	}
}

export default App;
