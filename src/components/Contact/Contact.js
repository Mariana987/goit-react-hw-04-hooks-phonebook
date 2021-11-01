import PropTypes from 'prop-types';
import s from './Contact.module.css';

export default function Contact({ contact, deleteContact }) {
    return (
        <li className={s.item}>
            {contact.name}: {contact.number}{' '}
            <button onClick={() => deleteContact(contact.id)} className={s.button}>Delete</button>
        </li>
    );
}

Contact.propTypes = {
    concact: PropTypes.string,
    deleteContact: PropTypes.func,
};