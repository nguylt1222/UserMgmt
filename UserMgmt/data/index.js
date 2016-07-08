(function (data) {
    
    
    var employeeData = require("./employeeData");
    var database = require("./database");
    var mongodb = require("mongodb");


    data.getEmployee = function (empID, next) {
    //Finds the employee record from the db.employees collection for the given employee ID
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.employees.findOne({ id: empID }, next);
            }
        });
    };
    
    data.updateEmployee = function (_id, employee, next) {
    //Updates the employee record with the employee object in the db.employees collection for the given _id
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
               
                db.employees.update({ _id: new mongodb.ObjectID(_id) }, 
                {       Name: {
                            firstName: employee.Name.firstName,
                            lastName: employee.Name.lastName,
                            middle: employee.Name.middle
                        },
                        Address: {
                            address1: employee.Address.address1,
                            address2: employee.Address.address2,
                            city: employee.Address.city,
                            state: employee.Address.state,
                            zip: employee.Address.zip
                        },
                        email: employee.email,
                        phone: employee.phone,
                        dateHired: employee.dateHired,
                        active: employee.active,
                        position: employee.position                  
                  }, next);
            }
        });
    };

    
    data.deleteEmployee = function (_id, next) {
    //Deletes the employee record from the db.employees collection whose Objectid equals the given _id
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.employees.deleteOne({ _id: new mongodb.ObjectID(_id) }, next);
            }
        });
    };
    
    
    data.createNewEmployee = function (employee, next) {
     //Inserts an employee object into the db.employees collection.  If the employee's first name, last name and email address exists then return a message.
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.employees.find({ "Name.firstName": employee.Name.firstName, "Name.lastName": employee.Name.lastName, email : employee.email }).count(function (err, count) {
                    
                    if (err) {
                        next(err);
                    } else {
                        if (count > 0) {
                            next("Employee already exists");
                        } else {
                            db.employees.insert(employee, function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null);
                                }
                            });
                        }
                    }
                })
           }
        
        });
    
    }


   
    
    data.getEmployeeList = function (next) {
    //Get all employees from the db.employees collection.
        database.getDb(function (err, db) {
            if (err) { 
                next(err, null);
            } else {
                db.employees.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else { 
                        next(null, results);
                    }
                });
            }
        });
    };

    
    function seedEmployeeData() {
    //Seed the db.employees collection with the employee seeded data.  If the db.employees table is not empty then return a message that the collection has been seeded.
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed employee data: " + err);
            } else {
                //test to see if data exists
                db.employees.count(function (err, count) {
                    if (err) {
                        console.log("Failed to retrieve database count");
                    } else {
                        if (count == 0) {
                            console.log("Seeding the employee database...");
                            employeeData.employees.forEach(function (item) {
                                db.employees.insert(item, function (err) {
                                    if (err) console.log("Failed to insert employee into database");
                                });
                            })
                        } else {
                            console.log("Employee data already seeded...");
                        }
                    }
                })
            }
                 
        });
    }
    
    //Calls the method to seed the employee data.
    seedEmployeeData();


})(module.exports);