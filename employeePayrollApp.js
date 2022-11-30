class employeePayrollData {
    //getter and setter method
    get id(){return this.id;}
    set id(id){
        this.id=id;
    }
    get name(){return this.name;}
    set name(name){
    let nameRegex =RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(name))
        this._name=name;
        else throw 'Name is Incorrect';
}
get profilePic(){return this._profilePic; }
set profilePic(profilePic){
    this._profilePic = profilePic;
}
get gender(){return this._gender; } 
set gender(gender) {
    this._gender=gender;
}
get department(){return this._department; }
set department(department) {
    this._department=department;
}
get salary(){return this._salary; }
set salary(salary) {
    this._salary=salary;
}
get note(){return this._note; }
set note(note) {
    this._note=note;
}
get startDate(){return this._startDate; }
set startDate(startDate) {
    this._startDate=startDate;
}
//Method
toString(){
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
    return "id="+ this.id+ ", name='"+ this.name + ",gender='"+ this.gender + 
    ", profilePic='"+ this.profilePic + ", department="+ this.department +
    ", salary="+ this.salary + ", startDate=" + empDate + ", note=" + this.note;
}
}
//UC-2 Ability to set Event Listeners when Document is loaded so as to
//- Set Event Listener on Salary Range to display appropriate value
//- Validation of Name and Date

window.addEventListener('DOMContentLoaded', (event)=> {
    const name= document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length==0) {
            textError.textContent="";
            return;
        }
        try {
            new employeePayrollData().name=name.value;
            textError.textContent = "";

        } catch (e){
            textError.textContent=e;
        }
    });
    const salary= document.querySelector('#salary');
    const output= document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;

    });
});

//UC-3 Ability to create Employee Payroll Object On Save.
//- Validation of Name and Date and if failed then set the UI accordingly.

const Save = () => {
    try {
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
    } catch (e) {
      return;
    }
  };
const createEmployeePayroll=()=> {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById("#name")

    } catch (e) {
        setTextValue(".text-error", e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValue("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues ("[name=gender]").pop();
    employeePayrollData.department = getSelectedValueById("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let date = getInputValueById("#day")+ " "+getInputValueById("#month")+ " "+getInputValueById("#year");
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues=(propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

//UC-4 Ability to save the Employee Payroll Object to Local Storage. - Understand the difference between Local
//Storage, Session Storage and older feature of storing in cookies. Here are good references
//- HTML5 Storage - Quick Guide Local Storage supported Methods

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList!= undefined) {
        employeePayrollList.push(employeePayrollData);

    }else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}