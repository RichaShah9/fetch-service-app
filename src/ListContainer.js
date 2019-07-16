import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Panel, Button, ButtonToolbar } from 'react-bootstrap';
import RestAPI from './rest.api';

export default class ListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: []
        };
        this.restAPI = new RestAPI();
    }

    componentDidMount() {
        this.restAPI.fetch('com.axelor.apps.base.db.Partner', 14).then(res =>
            res.json().then(result => {
                const { data } = result;
                if (data && data.length) {
                    this.setState((prevState) => {
                        return { customer: data[0] };
                    })
                }
            })
        );
    }

    render() {
        const onDelete = (e) => {
            this.restAPI.delete('com.axelor.apps.base.db.Partner', this.state.customer.id)
        };

        const onUpdate = (e) => {
            const data = {
                name: 'Richa Shah',
                fullName: 'Richa Shah',
                fixedPhone: '+98.98.9898',
                fax: '+56565656',
                emailAddress: {
                    name: 'r.shah@axelor.com'
                },
                version: this.state.customer.version
            }
            this.restAPI.update('com.axelor.apps.base.db.Partner', data, this.state.customer.id).then(res => console.log(res));
        };

        const listgroupInstance = (

            <div>
                <Panel header="Retrieved Data" bsStyle="primary">
                    <ListGroup>
                        <ListGroupItem header="Customer Name">{this.state.customer.name}</ListGroupItem>
                        <ListGroupItem header="Mobile number" >{this.state.customer.fixedPhone}</ListGroupItem>
                        <ListGroupItem header="Fax" >{this.state.customer.fax}</ListGroupItem>
                        <ListGroupItem header="Notes" >{this.state.customer.description}</ListGroupItem>
                    </ListGroup>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={(e) => onDelete(e)} > Remove </Button>
                        <Button bsStyle="primary" onClick={(e) => onUpdate(e)}> Update </Button>
                    </ButtonToolbar>
                </Panel>
            </div>
        );

        return (
            <div>
                {listgroupInstance}
            </div>
        );
    }
}