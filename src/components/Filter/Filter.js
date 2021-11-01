import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
    <label>
        <p>Find contacts by name:</p>
        <input
            type="text"
            value={value}
            name="filter"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            onChange={onChange}
        />
    </label>
);

export default Filter;

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};