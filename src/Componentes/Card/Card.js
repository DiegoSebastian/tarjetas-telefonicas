import React, { Component } from 'react'
import './Card.css'
import swal from 'sweetalert'

class Card extends Component {
	constructor(props) {
		super(props)

		this.state = {
			used: this.props.datos.used,
			alert: false,
			cardNumber: this.props.cardNumber,
			show: false,
		}

		this.onPressState = this.onPressState.bind(this)
		this.onPressAlert = this.onPressAlert.bind(this)
		this.confirmChangeState = this.confirmChangeState.bind(this)
		this.confirmChangeAlert = this.confirmChangeAlert.bind(this)
		this.showConfirm = this.showConfirm.bind(this)
		this.cancelDelete = this.cancelDelete.bind(this)
	}

	confirmChangeState() {
		swal({
			title: '¿Estas seguro que deseas cambiar el estado de la tarjeta?',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
		 	if (willDelete) {
				swal("El estado de la tarjeta ha sido cambiado", {
		      	icon: "success",
		    	});
				this.onPressState()
		  	} else {
		    	swal("No se ha cambiado el estado de la tarjeta");
		  	}
		});
	}

	confirmChangeAlert() {
		if(this.state.alert === false) {
			swal({
				title: '¿Está seguro que deséa poner la tarjeta en estado de reclamo?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
			 	if (willDelete) {
					swal("La tarjeta se ha puesto en estado de reclamo", {
			      	icon: "success",
			    	});
					this.onPressAlert()
			  	} else {
			    	swal("No se ha puesta la tarjeta en estado de reclamo");
			  	}
			});
		} else {
			swal({
				title: '¿Está seguro que deséa quitar la tarjeta del estado de reclamo?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
			.then((willDelete) => {
			 	if (willDelete) {
					swal("La tarjeta se ha quitado del estado de reclamo", {
			      	icon: "success",
			    	});
					this.onPressAlert()
			  	} else {
			    	swal("No se ha quitado la tarjeta del estado de reclamo");
			  	}
			});
		}
	}

	onPressState () {
		if(this.state.used === false){
			this.setState({
				used: true
			})
		} else {
			this.setState({
				used: false
			})
		}
	}

	onPressAlert () {
		if(this.state.alert === false){
			this.setState({
				alert: true
			})
		} else {
			this.setState({
				alert: false
			})
		}
	}

	showConfirm () {
		this.setState({
			show: true
		})
	}

	cancelDelete () {
		this.setState({
			show: false
		})
	}

	render() {
		return(
			<div className="card">
				<div className="cardHeader">
					<h3 className="cardTitle">Tarjeta de {this.props.datos.monto} bs</h3>
					<p>Fecha: {this.props.datos.date}</p>
				</div>
				<div className="cardBody">
					<div className="secretCode data">
						<h4 className="title">Código secreto:</h4>
						<span>{this.props.datos.secretCode}</span>
					</div>
					
					<div className="serial data">
						<h4 className="title">Serial:</h4>
						<span>{this.props.datos.serialCode}</span>
					</div>
					
					<div className="ticket data">
						<h4 className="title">Ticket:</h4>
						<a href={this.props.datos.link} target="_blank">Enlace</a>
					</div>
				</div>
				<a href='http://www.movilnet.com.ve/recargas/' target="_blank" className="recargar">Recargar</a>
				<a href='https://www.tusaldoenlinea.com' target="_blank" className="recargar">Conatar</a>
				<form className="deleteCard" onSubmit={this.props.confirmDelete}>
					<input type="text" name="key" value={this.props.datos.key} className="hidden"/>
					<input type="text" name="monto" value={this.props.datos.monto} className="hidden"/>
					<button type="button" onClick={this.showConfirm} className="buttonDelete">Eliminar Tarjeta<i className="fas fa-times iconDelete"></i></button>
					{(this.state.show) ? <div>
						<p>¿seguro que desea eliminar esta tarjeta?</p>
						<button type="submit" className="aceptar">si</button>
						<button onClick={this.cancelDelete} className="cancelar">No</button>
					</div>: ''}
				</form>
			</div>
		)
	}
}

export default Card