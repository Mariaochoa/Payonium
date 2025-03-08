

module Types {

    public type Role = {
        #superadmin;
        #admin;
        #user;
    };

    public type Profile ={  
        name: Text;
        lastname: Text;
        dni: Text;
        countryorigindocument: Text;
        email: Text;
        phone: Text;
        password: Text;
        countryresidence: Text;
        owner: Principal;
        role: Role;
    };
}