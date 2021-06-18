import React from 'react';
import PropTypes from 'prop-types';
// import ElementContactList from "../ElementContactList/ElementContactList";
// import styles from './ContactList.module.css';

const ContactList = ({ shownContacts, onClick }) => {
    return (
        <ul>TodoList</ul>
    );
 };

 
ContactList.propTypes = {
    shownContacts: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ContactList;