
import { Component } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import Form from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  getFormData = data => {
    if (
      this.state.contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())
    ) {
      alert(`You have already had ${data.name} in your contacts!`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const { contacts } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return visibleContacts;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const localContact = localStorage.getItem('contacts');

    const parsedContacts = JSON.parse(localContact)

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }


  render() {
    const { filter, contacts } = this.state;
    const { getFormData, handleInputChange, getVisibleContacts, deleteContact } = this;

    return (
      <Container>
        <h1>Phonebook</h1>
        <Form getFormData={getFormData} />
        <h2 className={s.contactsTitle}>Contacts</h2>
        <Filter value={filter} onChange={handleInputChange} />
        <ContactList
          contacts={contacts}
          getVisibleContacts={getVisibleContacts}
          deleteContact={deleteContact}
        />
      </Container>
    );
  }
}

export default App;
