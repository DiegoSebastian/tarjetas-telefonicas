import React, { Component } from 'react'
import Card from '../Card/Card'
import './CardList.css'

class CardList extends Component {
	render() {
		return(
			<div className="CardList">
				<form className="form" onSubmit={this.props.handleNewCard}>
					<p className="title">Agregar Tarjeta</p>
            	    <input type="text" name="secret" placeholder="código secreto"/>
            	    <input type="text" name="serial" placeholder="código serial"/>
            	    <input type="text" name="link" placeholder="Enlace del ticket"/>
            	    <div className="radioGroup">
            	    	<input type="radio" name="monto" id="cincoMil" value="5000"/> <label htmlFor="cincoMil">5,000 bs</label>
            	    </div>
            	    <div className="radioGroup">
            	    	<input type="radio" name="monto" id="diezMil" value="10000"/> <label htmlFor="diezMil">10,000 bs</label>
            	    </div>
            	    
            	    <div className="form-buttons">
            	        <button className="send" type="submit">Enviar</button>
            	    </div>
            	</form>
				<h2 className="title">Estas son sus tarjetas</h2>
				<div className="tarjetas">
				{
					this.props.tarjeta.map((tarjeta) => {
						return(
							<Card 
								datos={tarjeta} 
								key={tarjeta.id}
								confirmDelete={this.props.confirmDelete}
								cardNumber={this.props.tarjeta.length}
								/>
						)
					}).reverse()}
				</div>
			</div>
		)
	}
}

export default CardList