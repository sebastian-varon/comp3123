import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: "", position: "" });
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees/search`, {
        params: search,
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/employees`, newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({ name: "", position: "", department: "", salary: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/employees/${editEmployee._id}`,
        editEmployee
      );
      setEmployees(
        employees.map((emp) => (emp._id === editEmployee._id ? response.data : emp))
      );
      setEditEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>

      {/* Search Form */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <TextField
          label="Search by Department"
          value={search.department}
          onChange={(e) => setSearch({ ...search, department: e.target.value })}
          fullWidth
        />
        <TextField
          label="Search by Position"
          value={search.position}
          onChange={(e) => setSearch({ ...search, position: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Box>

      {/* Add Employee Form */}
      <Box
        component="form"
        onSubmit={handleAddEmployee}
        sx={{
          display: "grid",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <TextField
          label="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          required
        />
        <TextField
          label="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          required
        />
        <TextField
          label="Department"
          value={newEmployee.department}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
          required
        />
        <TextField
          label="Salary"
          type="number"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
          required
        />
        <Button variant="contained" color="secondary" type="submit">
          Add Employee
        </Button>
      </Box>

      {/* Employee List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>${emp.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditEmployee(emp)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteEmployee(emp._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Form */}
      {editEmployee && (
        <Box
          component="form"
          onSubmit={handleEditEmployee}
          sx={{
            display: "grid",
            gap: 2,
            marginTop: 4,
          }}
        >
          <TextField
            label="Name"
            value={editEmployee.name}
            onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
          />
          <TextField
            label="Position"
            value={editEmployee.position}
            onChange={(e) => setEditEmployee({ ...editEmployee, position: e.target.value })}
          />
          <TextField
            label="Department"
            value={editEmployee.department}
            onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}
          />
          <TextField
            label="Salary"
            type="number"
            value={editEmployee.salary}
            onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit">
            Update Employee
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeList;