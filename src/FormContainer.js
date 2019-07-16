import React, {Component} from 'react';
import { Button, FormControl, FormGroup,ControlLabel, Panel } from 'react-bootstrap';
import RestAPI from './rest.api';

class FormContainer extends Component{
	constructor(props) {
		super(props);
		this.state = {
            form:{
				name: '',
				fullName:'',
                fixedPhone:'',
                fax:'',
				emailAddress: {
					name:''
				},
				isCustomer:true,
				description: '',    
			},
			items:[],
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
  	}

	handleFormSubmit(e) {
		e.preventDefault();
		const formPayload = {
            name: this.state.form.name,
			fullName: this.state.form.name,
			emailAddress: {address:this.state.form.emailAddress},
			description: this.state.form.description,
            selectedCustomerType: this.state.form.selectedCustomerType,
            fixedPhone:this.state.form.fixedPhone,
			fax:this.state.form.fax,
			isCustomer:true,
		};	
	
		const { items } = this.state.form;
		items.push({formPayload});
		this.setState((prevState, props) => {
			return { items };
        })
			
		const restAPI = new RestAPI();
		restAPI.add('com.axelor.apps.base.db.Partner', formPayload).then(res => console.log(res));

		console.log('All data: '+ JSON.stringify(this.state.items));
	}	       

	render(){

		const onChange = (e) => {
            const form = this.state;
            this.setState({ [e.target.name]: e.target.value });
            this.setState((prevState, props) => {
				return { form };
			})
		};

		const formInstance = (
			<form onSubmit={this.handleFormSubmit}>
	
				<FormGroup
					controlId="formname">
				<ControlLabel>Full Name</ControlLabel>
				<FormControl
					type="text"
					name="name"
					placeholder="Enter first name and last name"
					onChange={(e) => onChange(e)} 
					required="true" />
        		</FormGroup>

				<FormGroup
					controlId="formFixedPhone">
				<ControlLabel>Fixed Phone</ControlLabel>
				<FormControl
					type="text"
					name="fixedPhone"
					placeholder="Fixed Phone"
					onChange={(e) => onChange(e)}  />
        		</FormGroup>

				<FormGroup
					controlId="formFax">
				<ControlLabel>Fax</ControlLabel>
				<FormControl
					type="text"
					name="fax"
					placeholder="Fax"
					onChange={(e) => onChange(e)} />
        		</FormGroup>

				<FormGroup
					controlId="formEmail">
          		<ControlLabel>Email Address</ControlLabel>
          		<FormControl
					type="email"
					placeholder="Enter email" 
					name="emailAddress"
					onChange={(e) => onChange(e)} />
 	            <FormControl.Feedback />
        		</FormGroup>

			  	<FormGroup controlId="formControlsTextarea" rows="5">
					<ControlLabel>Notes</ControlLabel>
					<FormControl componentClass="textarea" 
					placeholder="Permanent Address" 
					name="description"
					onChange={(e) => onChange(e)} />
			  	</FormGroup>
		  ​
				<FormGroup>									
			 		<Button bsStyle="primary" type="submit"> Submit </Button>
				</FormGroup>
			</form>
		);

		const { form } = this.state;
		return (
            <div>
				<Panel header='Customer Form'>
					{formInstance}
				</Panel>
			</div>
		);
    }
}
export default FormContainer;