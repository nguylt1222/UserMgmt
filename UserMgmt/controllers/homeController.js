(function (homeController) {
    
    var data = require("../data");

    homeController.init = function (app) {
        

        app.get("/", function (req, res) {
            res.render("index");
        });
        
        //api to get the employee form
        app.get("/newEmployeeForm", function (req, res) {
            res.render("newemployee.html");

        });
        
        //api to redirect employee to index page
        app.get("/employee", function (req, res) {
            //res.render("index", { messages: req.flash("errormessage") });
            res.render("index");
        });
        
        
        //api to get the employee data from the db
        app.get("/data/employees", function (req, res) {
            
            res.set("Content-Type", "application/json");
            
            data.getEmployeeList(function (err, results) {
                res.send(results);
            });
        });

        //api to get the employee data for the given employee id
        app.get("/api/employees/:empID", function (req, res) {
            
            var empID = req.params.empID;
            
            data.getEmployee(empID, function (error, employee) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(employee);

                }
            });

        });
              
        //api to delete the employee record for the given employee id
        app.delete("/api/deleteEmployee/:_id", function (req, res) {
            
            var _id = req.params._id;
            
            data.deleteEmployee(_id, function (err) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.redirect("/");
                }
            });

        });
        
        //api to update the employee record fo the given id
        app.post("/api/updateEmployee/:_id", function (req, res) { 
            
            var _id = req.params._id;
            
            var employee = {
                Name: {
                    firstName: req.body.Name.firstName,
                    lastName: req.body.Name.lastName,
                    middle: req.body.Name.middle
                },
                Address: {
                    address1: req.body.Address.address1,
                    address2: req.body.Address.address2,
                    city: req.body.Address.city,
                    state: req.body.Address.state,
                    zip: req.body.Address.zip
                },
                email: req.body.email,
                phone: req.body.phone,
                dateHired: req.body.dateHired,
                active: req.body.active,
                position: req.body.position
            };

            data.updateEmployee(_id, employee, function (err) {
                if (err) {
                    res.send(400, err);
                    console.log(err);
                    res.redirect("/");
                } else {
                    res.redirect("/");
                }
            });
        });

        //api to create a new employee 
        app.post("/api/newEmployee", function (req, res) {

            var employee = {
                id: req.body.id,
                Name: {
                    firstName: req.body.Name.firstName,
                    lastName: req.body.Name.lastName,
                    middle: req.body.Name.middle
                },
                Address: {
                    address1: req.body.Address.address1,
                    address2: req.body.Address.address2,
                    city: req.body.Address.city,
                    state: req.body.Address.state,
                    zip: req.body.Address.zip
                },
                email: req.body.email,
                phone: req.body.phone,
                dateHired: req.body.dateHired,
                active: req.body.active,
                position: req.body.position
            };
            
            data.createNewEmployee(employee, function (err) {
                if (err) {
                    //handle error
                    console.log(err);
                  //  req.flash("errormessage", err);    
                 //   res.send(err);
                    res.redirect("/");
                } else {
                    console.log("New Employee created: " + JSON.stringify(employee));
                    res.redirect("/");                   
                }
            });
        });        

   
    };
})(module.exports);