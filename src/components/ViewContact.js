import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ViewContact = () => {
    const { id, name, email, phone } = useParams();
    return (
        <div className="container">
            <h2>ID: {id}</h2>
            <h2>Name: {name}</h2>
            <h2>Email: {email}</h2>
            <h2>Phone: {phone}</h2>
            <Link to='/'>
                <button className='btn btn-success'>
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    BACK
                </button>
            </Link>
        </div>
    )
};

export default ViewContact;