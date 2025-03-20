
import Result "mo:base/Result";

module Types {

    public type Role = {
        #superadmin;
        #admin;
        #operator;
        #assistant;
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
        role: Text;        
    };

    public type Account = {
        namebankaccount: Text;
        simpleaccountnumber: Text;
        longaccountnumber: Text;
        depositcurrency: Text;
    };

    type GetProfileResultOk = {
        #profile: Profile;
        #profiles: [Profile];
        #userSuccessfullyAdded;
        #userSuccessfullyDeleted;

        #accountSuccessfullyAdded;
    };

    type GetProfileResultErr = { 
        #userDoesNotExist;
        #userNotAuthenticated;
        #unregisteredUser_nameOrEmailIsInvalid;
        #countryDataNotFound;
        #unregisteredUser_invelidRole;

        #invalidAccount
    };

    public type GetProfileResult = Result.Result<GetProfileResultOk, GetProfileResultErr>;



}