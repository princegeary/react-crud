import React, { Component } from 'react';
import firebase from '../firebase';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
import './Contacts.css';

class Contacts extends Component {
    state = {
        contacts: [],
        contactIndex: '',
        id: '',
    }

    componentDidMount() {
        const contactsRef = firebase.database().ref('contacts');
        contactsRef.on('value', (snapshot) => {
            let contacts = snapshot.val();
            let newState = [];
            for (let i in contacts) {
                newState.push({
                    id: i,
                    name: contacts[i].name,
                    email: contacts[i].email,
                    phone: contacts[i].phone
                });
            }
            this.setState({
                contacts: newState
            });
        });
    }

    deleteContactHandler = contactIndex => {
        if (window.confirm('Are you sure you want to permanently delete this contact?')) {
            const contactsRef = firebase.database().ref(`/contacts/${contactIndex}`);
            contactsRef.remove(err => {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({
                        id: ''
                    });
                }
            });
        }
    }

    updateContactHandler = (contactIndex, id) => {
        this.setState({ contactIndex: contactIndex, id: id });
    }

    render() {
        return (
            <div>
                <header>
                    {/* <div className='wrapper'>
                        <h1>Fun Food Friends</h1>
                    </div> */}
                </header>
                <ContactForm
                    id={this.state.id}
                    contactIndex={this.state.contactIndex}
                    contacts={this.state.contacts} />
                <div></div>
                <div className='container'>
                    <table className='my-table'>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Id</th>
                                <th style={{ width: '20%' }}>Name</th>
                                <th style={{ width: '20%' }}>Email</th>
                                <th style={{ width: '10%' }}>Contact</th>
                                <th style={{ width: '30%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.contacts.map((contact, index) => {
                                return (
                                    <tr key={contact.id}>
                                        <td>{contact.id}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Link to={`view/${contact.id}/${contact.name}/${contact.email}/${contact.phone}`} >
                                                <button
                                                    className='btn btn-primary'>
                                                    VIEW
                                                    </button>
                                            </Link>
                                            <button
                                                className='btn btn-success'
                                                onClick={() => this.updateContactHandler(index, contact.id)}>
                                                UPDATE
                                                </button>
                                            <button className='btn btn-danger'
                                                onClick={this.deleteContactHandler.bind(this, contact.id)}>
                                                DELETE
                                                </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default Contacts;
