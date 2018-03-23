import React, { Component } from 'react'
import { Route, Link, MemoryRouter } from 'react-router-dom';
import './Main.css'
import CardList from '../CardList/CardList'
import firebase from 'firebase'
import moment from 'moment'
import uuid from 'uuid'
import swal from 'sweetalert'

class Main extends Component {
	constructor (props) {
		super(props)
		this.state = {
			cincoMil: [],
			diezMil: []
		}

		this.handleNewCard = this.handleNewCard.bind(this)
		this.confirmDeleteCard = this.confirmDeleteCard.bind(this)
	}

	componentWillMount() {
		const cardRefCinco = firebase.database().ref().child(`${this.props.user.displayName}`).child(`cincoMilCard`)
		const cardRefDiez = firebase.database().ref().child(`${this.props.user.displayName}`).child('diezMilCard')

		cardRefCinco.on('child_added', snapshot => {
			this.setState({
				cincoMil: this.state.cincoMil.concat(snapshot.val())
			})
		})

		cardRefDiez.on('child_added', snapshot => {
			this.setState({
				diezMil: this.state.diezMil.concat(snapshot.val())
			})
		})

	}

	confirmDeleteCard(ev) {
		ev.preventDefault()
		if(ev.target.monto.value === '5000') {
			const databaseCincoRef = firebase.database().ref().child(`${this.props.user.displayName}`).child(`cincoMilCard`).child(ev.target.key.value)
			databaseCincoRef.remove()
		} else if(ev.target.monto.value === '10000') {
			const databaseDiezRef = firebase.database().ref().child(`${this.props.user.displayName}`).child(`diezMilCard`).child(ev.target.key.value)
			databaseDiezRef.remove()
		}
		swal({
			title: 'La tarjeta ha sido eliminada, dejará de aparecer cuando actualice',
			icon: 'success',
		})
	}

	handleNewCard(ev) {
		ev.preventDefault()
		moment.lang('es', {
		  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
		  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
		  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
		  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
		  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
		})
		let newCard = {
			secretCode: ev.target.secret.value,
			serialCode: ev.target.serial.value,
			monto: ev.target.monto.value,
			link: ev.target.link.value,
			usada: false,
			date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			id: uuid.v4()
		}

		if(ev.target.monto.value === '5000') {
			const cardRefCinco = firebase.database().ref().child(`${this.props.user.displayName}`).child('cincoMilCard')
			const cardIdCinco = cardRefCinco.push()
			newCard.key = cardIdCinco.key
			cardIdCinco.set(newCard)
		}

		if(ev.target.monto.value === '10000') {
			const cardRefDiez = firebase.database().ref().child(`${this.props.user.displayName}`).child('diezMilCard')
			const cardIdDiez = cardRefDiez.push()
			newCard.key = cardIdDiez.key
			cardIdDiez.set(newCard)
		}

		swal("La tarjeta se ha añadido correctamente", {
			 icon: "success",
		});

	}


	render() {
		return(
			<MemoryRouter>
				<main>
					<div className="PricesList">
						<Link to="/cincoMil" className="price">5.000 Bs</Link>
						<Link to="/diezMil" className="price">10.000 Bs</Link>
					</div>

					<Route exact path='/' render={() => {
			        	return(
			        		<h2 className="title">Por favor, seleccione un monto</h2>
			        	)   
			        }} />

			        <Route exact path="/cincoMil" render={() => {
			        	return(
			        		<CardList 
			        			tarjeta={this.state.cincoMil}
			        			handleNewCard={this.handleNewCard}
			        			confirmDelete={this.confirmDeleteCard}
			        			/>
			        	)
			        }} />

			        <Route exact path="/diezMil" render={() => {
			        	return(
			        		<CardList 
			        			tarjeta={this.state.diezMil}
			        			handleNewCard={this.handleNewCard}
			        			confirmDelete={this.confirmDeleteCard}
			        			/>
			        	)
			        }} />

			    </main>
			</MemoryRouter>
		)
	}
}

export default Main