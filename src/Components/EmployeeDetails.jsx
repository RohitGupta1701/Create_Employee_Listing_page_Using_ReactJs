import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './addemployee.css'

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Simulating an API call to fetch employee details
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const emp = storedEmployees.find(emp => emp.emp_id === id);
    setEmployee(emp);
  }, [id]);

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className='content'>
      <h1>Employee Details</h1>
      <div className='texts'>
      <p>Name: {employee.name}</p>
      <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
      <h3>Contact Methods:</h3>
      <ul>
        {employee.contacts.map((contact, index) => (
          <li key={index}>{contact.contact_method}: {contact.value}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default EmployeeDetails;
