import React, { Component } from 'react';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const NEW_COMMENT = gql`
subscription{
  newComment{
    id,
    text
  }
}

`;

class ListComments extends Component {

	
	render() {
		let comments = []
		return (
			<ul>
				<Subscription
					subscription={NEW_COMMENT}
				>
					{
						({ data, loading }) => {
							if (loading) return (<h4>Cargando...</h4>)
							const text = data.newComment.text
							comments.push(text)
							return (
								comments.map((text) => (
									<li>{text}</li>
								))
							)
						}
					}
				</Subscription>
			</ul>
		)
	}


}


export default ListComments;
