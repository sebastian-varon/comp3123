const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.get('/:eid', getEmployeeById);
router.put('/:eid', updateEmployee);
router.delete('/', deleteEmployee);

module.exports = router;