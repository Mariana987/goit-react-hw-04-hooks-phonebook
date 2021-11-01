
import { useState, useEffect } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import Form from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';


const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? defaultValue;

  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state])
  return [state, setState];

}

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts',
    [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  const [filter, setFilter] = useState('');



  const getFormData = data => {
    if (
      contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())
    ) {
      alert(`You have already had ${data.name} in your contacts!`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    setContacts([contact, ...contacts])

  };


  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setFilter(value)
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return visibleContacts;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id))
  };



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



