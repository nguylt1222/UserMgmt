describe('Controller: employeeViewController', function () {
    
   beforeEach(module('employeeView'));
    
    var $controller;
    
    var MainCtrl
    var scope;
    var employee;
    
    var serviceApi;
    var q;
    var deferred;

    
    console.log('tests loaded**************************************');

    beforeEach(inject(function ($controller, $rootScope) {
        $controller = _$controller_;
        
        scope = $rootScope.$new();
        MainCtrl = $controller('employeeViewController', {$scope: scope});
    }));
    

    
    describe('scope.init method', function () {

        it('should load data into employeeList', function () {
            expect(scope.init.success).to.equal(true);
        });

    });
    
    
    describe('scope.editEmployee method', function () {
        beforeEach(function () {
            employee = {
                Name: {
                    firstName: "Linda",
                    lastName: "Nguyen",
                    middle: "T"
                },
                Address: {
                    address1: "100 Some street name",
                    address2: "Apt. 123",
                    city: "Leesburg",
                    state: "VA",
                    zip: "20176",
                },
                email: "Linda_Nguyen@verizon.net",
                phone: "7037777777",
                dateHired: "2010-01-01",
                position: "Direct",
                active: "true"
            };
            
            scope.editEmployee(employee);
        });
        
        it('employee form is populated', function () {
            expect(scope.editEmployee.success).to.equal(true);
        });

    });
    
    
    describe('scope.validate method', function () {
        beforeEach(function () {
            scope.validate();
        });
        
        it('employee form is valid', function () {
            expect(scope.validate.valid).to.equal(true);
        });
        
        it('employee form is not valid', function () {
            expect(scope.validate.invalid).to.equal(true);
        });

    });
    
    
    describe('scope.saveEmployee method', function () {
        beforeEach(function () {
            scope.saveEmployee();
        });

        it('the save operation is successfully handled for the employee record', function () {
            expect(scope.saveEmployee.success).to.equal(true);
        });

    });
    
    
    describe('scope.createEmployee method', function () {
        beforeEach(function () {
            employee = {
                Name: {
                    firstName: "Linda",
                    lastName: "Nguyen",
                    middle: "T"
                },
                Address: {
                    address1: "100 Some street name",
                    address2: "Apt. 123",
                    city: "Leesburg",
                    state: "VA",
                    zip: "20176",
                },
                email: "Linda_Nguyen@verizon.net",
                phone: "7037777777",
                dateHired: "2010-01-01",
                position: "Direct",
                active: "true"
            };

            scope.createEmployee(employee);
        });
        
        it('employee record is created', function () {
            expect(scope.createEmployee.success).to.equal(true);
        });
        
    });
    
    
    describe('scope.updateEmployee method', function () {
        beforeEach(function () {
            employee = {
                Name: {
                    firstName: "Linda",
                    lastName: "Nguyen- updated",
                    middle: "T"
                },
                Address: {
                    address1: "201 Main Street",
                    address2: "Apt. 200",
                    city: "Leesburg",
                    state: "VA",
                    zip: "20176",
                },
                email: "Linda_Nguyen@verizon.net",
                phone: "7037777777",
                dateHired: "2010-01-01",
                position: "Indirect",
                active: "true"
            };

            scope.updateEmployee(employee);
        });
              
        it('employee record is update', function () {
            expect(scope.updateEmployee.success).to.equal(true);
        });
        
    });


    describe('scope.clearform method', function () {
        
        it('should clear form', function () {
            expect(scope.clearform.success).to.equal(true);
        });

    });

    describe('scope.deleteEmployee method', function () {
        beforeEach(function () {
            var indx = scope.employeeList.length;
            scope.deleteEmployee(index-1);
        });
        
        it('employee record at position 0 should be deleted', function () {
            expect(scope.deleteEmployee.success).to.equal(true);
        });

    });

    
  

});
