import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../App.css'

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch employees
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const deleteEmployee = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this employee?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const updatedEmployees = employees.filter(employee => employee.emp_id !== id);
            setEmployees(updatedEmployees);
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div>
    <h1>Employees List</h1>
    <Link to="/add"><button>Add Employee</button></Link>
    {employees.length === 0 ? (
      <h2>No Employees in the system</h2>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.emp_id}>
              <td>
                <Link to={`/employee/${employee.emp_id}`}>{employee.name}</Link>
              </td>
              <td>{employee.emp_id}</td>
              <td>
                <button className='btn' onClick={() => deleteEmployee(employee.emp_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default EmployeesList;
