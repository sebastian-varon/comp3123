const { check, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createEmployee = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isISO8601(),
    check('department', 'Department is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
        try {
            const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
            await employee.save();
            res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
];

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateEmployee = [
    check('email', 'Please include a valid email').optional().isEmail(),
    check('salary', 'Salary must be a number').optional().isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').optional().isISO8601(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json({ message: 'Employee details updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
];

const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        await Employee.findByIdAndDelete(eid);
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee };