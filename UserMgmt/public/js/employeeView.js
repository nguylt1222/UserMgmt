(function (angular){

    var theModule = angular.module("employeeView", ['ngTable', '720kb.datepicker', 'ui.bootstrap']);
   
    
    theModule.controller("employeeViewController", ["$scope", "$http", "$window", 
             
        function ($scope, $http, $window) {
            
     
            $scope.init = function () {
            //Calls the getUsers api to populate the employee table (employeeList) from the database
                $scope.employeeList = [];
                               
                $http.get("/data/employees")
                .then(function (result) {
                    //success
                    $scope.employeeList = result.data;

                    $scope.init.success = true;
                    console.log('GetEmployeeList: ' + result.data);
                }, function (err) {
                    //error
                    alert(err);
                    $scope.init.success  = false;
                    console.log('Error with GetEmployeeList: ' + data);
                });
            }
            
 
            $scope.clearForm = function () {
                // Clears the fields in the form
            try{
                $scope.init(); 
                $("#firstname").val(" ");
                $("#lastname").val(" ");                
                $("#middle").val("");
                $("#address1").val("");
                $("#address2").val("");
                $("#city").val("");
                $("#state").val("");
                $("#zip").val("");
                $("#email").val("");
                $("#email").removeAttr('required');
                $("#phone").val("");
                $("#dateHired").val("");
                $("#dateHired").removeAttr('required');
                $("#position").val("");
                $("#active").prop("checked", true);
                $scope._id = null;

                $scope.clearForm.success = true;

            } catch (err) {
                $scope.clearForm.success = false;
                alert("Error in clearForm: " + err);
            }

            }
            
            
            
            $scope.validate = function () {
                // Validates the fields on the form with the required business logic
                var valid = true,
                    msg = "";
                
                if ($scope.firstName == null || $scope.firstName == " ") {
                    valid = false;
                    msg = "First Name is a required field.\n";
                }
                
                if ($scope.lastName == null || $scope.lastName == " ") {
                    valid = false;
                    msg += "Last Name is a required field.\n";
                }
                
                if ($scope.email == null) {
                    valid = false;
                    msg += "Email is a required field.\n";
                } else {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test($scope.email)) {
                        valid = false;
                        msg += "Email is not a valid format.\n";
                    }
                }
                
                if ($scope.phone != null && ($scope.phone.toString()).length != 10) {
                    valid = false;
                    msg += "Phone number must be a 10 digit value. \n";
                }
                
                if ($scope.dateHired == null) {
                    valid = false;
                    msg += "Date Hired is a required field.\n";
                }
                
                if ($scope.zip != null && ($scope.zip.toString()).length != 5) {
                    valid = false
                    msg += "Zip code must be a 5 digit value.\n";
                }
                
                //if ($("#active")[0].checked != true) {
                //    valid = false;
                //    msg += "Active flag is a required field.\n";
                //}
                
                if (valid) {
                    $scope.validate.valid = true;
                    return true
                } else {
                    $scope.validate.invalid = false;
                    alert("Validation warning: \n" + msg + "");
                    return false;
                }
            }
       
            
            $scope.deleteEmployee = function (index) {
                // Function to call the delete api to delete a given employee from the database

                if ($window.confirm("Warning: You are about to delete this record for " + $scope.employeeList[index].Name.firstName + " " + $scope.employeeList[index].Name.lastName +
                 ".  Would you like to proceed?")) {
                    var _id = $scope.employeeList[index]._id;
                    
                    $http.delete("/api/deleteEmployee/" + _id)
                    .success(function (data) {
                        $scope.init();
                        //$scope.formData = {};
                        //$scope.employeeList = data;
                        $scope.deleteEmployee.success = true;
                        console.log('DeleteEmployee: ' + data);
                    }, function (err) {
                        //error
                        alert(err);
                        $scope.deleteEmployee.success  = false;
                        console.log('Error with CreateEmployee: ' + data);
                    });
                    
                    $scope.employeeList.splice(index, 1);
                }

            }
            
            
            $scope.editEmployee = function (employee) {
            // Populates the fields on the form with the selected employee object
                
                try {
                          
                    $scope._id = employee._id;
                    $scope.firstName = employee.Name.firstName;
                    $scope.lastName = employee.Name.lastName;
                    $scope.middle = employee.Name.middle;
                    $scope.address1 = employee.Address.address1;
                    $scope.address2 = employee.Address.address2;
                    $scope.city = employee.Address.city;
                    $scope.state = employee.Address.state;
                    $scope.zip = employee.Address.zip;
                    $scope.email = employee.email;
                    $scope.phone = employee.phone;
                    $scope.dateHired = employee.dateHired;
                    $scope.active = employee.active;
                    $scope.position = employee.position;
                    $scope.editEmployee.success = true;

                    $scope.init.success = true;

                } catch (err)  {
                    $scope.editEmployee.success = false;
                    alert("Error in editEmployee: " + err );
                 }

            }
            

            
            $scope.updateEmployee = function (employee) {
                // Calls the updateEmployee api to update the employee object in the database

                var newEmployeeUrl = "/api/updateEmployee/" + employee._id;
                
                $http.post(newEmployeeUrl, employee)

                .success(function (data) {
                    //if success then reload the page
                    $scope.init();

                    $scope.updateEmployee.success = true;
                    console.log('UpdateEmployee: ' + data);

                }, function (err) {
                    //else display an alert and log the error to the console.
                    $scope.updateEmployee.success = false;
                    alert(err);
                    console.log('Error with CreateEmployee: ' + data);
                });

            }
           
            
            $scope.createEmployee = function (employee) {
            // Calls the createEmployee api to insert a new employee object in the database
                    var newEmployeeUrl = "/api/newEmployee";
                
                $http.post(newEmployeeUrl, employee)

                    .success(function (data) {
                    //if success then reload the page
                        $scope.clearForm();
                        $scope.init();

                        $scope.createEmployee.success = true;
                        console.log('CreateEmployee: ' + data);
                    }, function (err) {
                    //else display an alert and log the error to the console.
                        $scope.createEmployee.success = false;
                        alert(err);
                        console.log('Error with CreateEmployee: ' + data);
                    });

            }
            
        $scope.saveEmployee = function () {
         // Method to handle the Save operation on the form. If the employee is a new employee then call the createEmployee
         // else call the updateEmployee to update the employee info
                
                try {
                    //Assign the fields on the form to an employee object         
                    var editemployee = {
                        _id: $scope._id,
                        Name: {
                            firstName: $scope.firstName,
                            lastName: $scope.lastName,
                            middle: $scope.middle
                        },
                        Address: {
                            address1: $scope.address1,
                            address2: $scope.address2,
                            city: $scope.city,
                            state: $scope.state,
                            zip: $scope.zip
                        },
                        email: $scope.email,
                        phone: $scope.phone,
                        dateHired: $scope.dateHired,
                        position: $scope.position,
                        active: $("#active")[0].checked,
                    };
                    
                    
                    if ($scope.validate(editemployee)) {
                        if ($scope._id != void (0)) {
                        //if the _id is NOT undefined then update the employee record for an existing employee
                            $scope.updateEmployee(editemployee);
                        } else {
                            
                        //otherwise create a new employee record 
                            $scope.createEmployee(editemployee);
                        }
                    }
                    
                    $scope.saveEmployee.success = true;

                } catch (err) {
                    $scope.saveEmployee.success = false;
                    alert(err);
                    console.log('Error with SaveEmployee: ' + err);
                }
        }
            
        //Calls the init function to get list of users and populate the employee table    
        $scope.init(); 


    }]);


})(window.angular);
