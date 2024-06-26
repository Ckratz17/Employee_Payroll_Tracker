const addEmployee = document.getElementById('add-employees-btn')
let employeeArr = []
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const salary = document.getElementById('salary')

function createEmployee() {
    
    const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        salary: parseFloat(salary.value)
    }
    
    if (isNaN(employee.salary)) {
        employee.salary = 0
    }

    employeeArr.push(employee)
    // console.log(employeeArr)
    localStorage.setItem('employees', JSON.stringify(employeeArr));
    firstName.value = ''
    lastName.value = ''
    salary.value = ''
    createTable(employeeArr)
    displayAvgSalary()
}

function displayAvgSalary() {
    let avg = document.getElementById('avg-salary')
    let totalSalary = 0

    for(const employee of employeeArr){
        totalSalary += employee.salary
    }

    let avgSalary = totalSalary/employeeArr.length

    avg.textContent = `Average Salary: ${avgSalary.toLocaleString("en-US", {
        // Format the salary as currency
        style: "currency",
        currency: "USD"
    })}`

    

}

function createTable() {

    const employeeTable = document.querySelector('#employee-table');

    console.log(employeeArr);
    // Clear the employee table
    employeeTable.innerHTML = '';

    if (employeeArr !== null) {

        for (let i = 0; i < employeeArr.length; i++) {
            const employee = employeeArr[i];

            const newTableRow = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = employee.firstName;
            newTableRow.append(firstNameCell);

            const lastNameCell = document.createElement("td");
            lastNameCell.textContent = employee.lastName;
            newTableRow.append(lastNameCell);

            const salaryCell = document.createElement("td");
            salaryCell.textContent = employee.salary.toLocaleString("en-US",{
                style:"currency",
                currency:"USD"
              });

            newTableRow.append(salaryCell);

            employeeTable.append(newTableRow);

        }
    }

}

addEmployee.addEventListener('click', (e) => {
    e.preventDefault()
    createEmployee()
})

function init() {
    const allEmployees = JSON.parse(localStorage.getItem('employees'))

    if (allEmployees !== null) {
        employeeArr = allEmployees
    }

    createTable()
    displayAvgSalary()
}

init()