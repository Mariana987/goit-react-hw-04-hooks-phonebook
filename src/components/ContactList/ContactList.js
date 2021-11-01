import PropTypes from 'prop-types';
import Contact from '../Contact';

export default function ContactList({ getVisibleContacts, deleteContact }) {
    return (
        <ul>
            {getVisibleContacts().map(contact => (
                <Contact key={contact.id}
                    contact={contact}
                    deleteContact={deleteContact} />
            ))}
        </ul>
    );
}

ContactList.propTypes = {
    getVisibleContacts: PropTypes.func,
    deleteContact: PropTypes.func,
};