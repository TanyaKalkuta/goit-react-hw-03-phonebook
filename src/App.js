import React from 'react';
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import Container from './Component/Container';
import ContactForm from './Component/ContactForm';
import Filter from './Component/Filter';
import ContactList from './Component/ContactList';
import contactsUser from "./json/contacts.json";


class App extends React.Component {
  static defaultProps = {
    contacts: contactsUser,
    filter: ''
  };

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };
  
  
  state = {
    // contacts:[],
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  
  formAddContact = ({ name, number }) => {
    // console.log(name, number);
    
    const contact = {
      id: uuidv4(),
      name: name,
      number: number      
    };
    const contactNames = this.state.contacts.map(contact => contact.name);
    this.renderContacts(contactNames, contact.name, contact);
  };
  
  renderContacts = (contactsList, contactName, newContact) => {
    if (contactsList.includes(contactName)) {
      alert(`${contactName} is already in contacts`)
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    };   
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };


  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter)
    })
   };
 
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({contacts:parsedContacts});      
    }    
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    if (this.state.contacts!==prevState.contacts) {
      console.log('Обновились контакты, записываем в хранилище');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
   
    return (
      <Container>
        <div>
          <h1>Phonebook</h1>
          <ContactForm
            onSubmit={this.formAddContact} />

          <h2>Contacts</h2>
          <Filter
          value={this.state.filter}
          onChange={ this.changeFilter }/>
          <ContactList
          shownContacts={this.getFilteredContacts}
          onClick={  this.deleteContact}/>
        </div>
      </Container>
      
    );
  };
}
export default App;
