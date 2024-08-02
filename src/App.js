import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeesList from './Components/EmployeesLists';
import EmployeeDetails from './Components/EmployeeDetails';
import AddEmployee from './Components/AddEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/add" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;

