import React, { Component } from 'react';
import firebase from '../firebase';

class ContactForm extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        phone: '',
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //error handling for submit
    handleSubmit = e => {
        e.preventDefault();

        if (this.validate()) {
            let noError = true;
            const contact = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            }

            if (this.state.id === '') {
                const contactsRef = firebase.database().ref('contacts')
                contactsRef.push(
                    contact,
                    err => {
                        if (err) {
                            console.log(err);
                            noError = false;
                        }
                    }
                );
            } else {
                const contactsRef = firebase.database().ref(`contacts/${this.state.id}`)
                contactsRef.set(
                    contact,
                    err => {
                        if (err) {
                            console.log(err);
                            noError = false;
                        }
                    }
                );
            }
            if (noError) {
                this.setState({
                    id: '',
                    name: '',
                    email: '',
                    phone: ''
                });
            }
        } else {
            window.alert('Please enter a valid email.')
        }
    }

    validate = () => {
        let email = this.state.email;
        let isValid = false;

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            isValid = true;
        }
        return isValid;
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.id !== prevProps.id) || (this.props.id !== prevState.id)) {
            const i = this.props.contactIndex;
            this.setState({
                id: this.props.id,
                name: this.props.contacts[i].name,
                email: this.props.contacts[i].email,
                phone: this.props.contacts[i].phone,
            });
        }
    }

    render() {
        return (
            <div className="container">
                <form autoComplete='off' onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Text Input"
                                onChange={this.onChangeHandler}
                                value={this.state.name} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Text Input"
                                onChange={this.onChangeHandler}
                                value={this.state.email} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Contact</label>
                            <input
                                required
                                className="form-control"
                                type="number"
                                name="phone"
                                placeholder="Text Input"
                                onChange={this.onChangeHandler}
                                value={this.state.phone} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-success">
                                {this.state.id === '' ? 'ADD' : 'UPDATE'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContactForm;