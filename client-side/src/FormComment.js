import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const ADD_COMMENT = gql`
	mutation addNewComment($text:String!){
  addComment(text:$text){
    id,text
  }
}

`;


class FormComment extends Component {

	state = {
		text:""
	}

	render() {
		return (
			<Mutation mutation={ADD_COMMENT}>
				{(addComment, { data }) => (

					<form action="" onSubmit={ e => {
						e.preventDefault();
						addComment({variables:{text:this.state.text}});
						this.setState({text:""});
					}} className="add">
						<label htmlFor="">Comment:</label>
						<textarea cols="30" rows="12" 
						name="text" id="text" value={this.state.text}
						onChange={ e => {
								const {value} = e.target
								this.setState({text:value});
							}}/>
						<button type="submit">Send</button>
					</form>
				)}

			</Mutation>
		)
	}


}


export default FormComment;