import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  './addemployee.css'

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip: '',
  });
  const [contacts, setContacts] = useState([{ contact_method: 'EMAIL', value: '' }]);
  const navigate = useNavigate();

  const handleContactChange = (index, event) => {
    const newContacts = contacts.map((contact, i) => {
      if (i === index) {
        return { ...contact, [event.target.name]: event.target.value };
      }
      return contact;
    });
    setContacts(newContacts);
  };

  const addContactMethod = () => {
    setContacts([...contacts, { contact_method: 'EMAIL', value: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emp_id = Date.now().toString(); //  ID generation
    const newEmployee = { emp_id, name, address, contacts };
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    storedEmployees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(storedEmployees));
    navigate('/');
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <h3>Address:</h3>
          <label>Line 1:</label>
          <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
          <label>City:</label>
          <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
          <label>Country:</label>
          <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
          <label>Zip:</label>
          <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
        </div>
        <div>
          <h3>Contact Methods:</h3>
          {contacts.map((contact, index) => (
            <div key={index}>
              <select name="contact_method" value={contact.contact_method} onChange={(e) => handleContactChange(index, e)}>
                <option value="EMAIL">EMAIL</option>
                <option value="PHONE">PHONE</option>
              </select>
              <input
                type="text"
                name="value"
                value={contact.value}
                onChange={(e) => handleContactChange(index, e)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addContactMethod}>Add Contact Method</button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
