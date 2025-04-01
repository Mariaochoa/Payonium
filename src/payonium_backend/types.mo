
import Result "mo:base/Result";
import Principal "mo:base/Principal";

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
        principal: Text;  
        //status: Bool;    
    };

    public type Account = {
        namebankaccount: Text;
        simpleaccountnumber: Text;
        longaccountnumber: Text;
        depositcurrency: Text;
        owner: Principal;
    };

    type GetProfileResultOk = {
        #profile: Profile;
        #profiles: [Profile];
        #userSuccessfullyAdded;
        #userSuccessfullyDeleted;

        #account: Account;
        #accounts: [Account];
        #accountSuccessfullyAdded;
        #accountSuccessfullyDeleted;
        #accountSuccessfullyUpdated;
    };

    type GetProfileResultErr = { 
        #userDoesNotExist;
        #userNotAuthenticated;
        #unregisteredUser_nameOrEmailIsInvalid;
        #countryDataNotFound;
        #unregisteredUser_invelidRole;
        #userAlreadyExists;

        #invalidAccount;
        #noAccountFound;
        #youAreNotTheOwnerOfThisAccount;
    };

    public type GetProfileResult = Result.Result<GetProfileResultOk, GetProfileResultErr>;

    public type Order = {
        amount: Nat;
        currency: Text;
        account: Text;
        description: Text;
        dni: Text;
        email: Text;
        owner: Principal;
    };

type GetOrderResultOk = {
        #order: Order;
        #orders: [Order];
        #orderSuccessfullyAdded;
        #orderSuccessfullyComplete;

    };

    type GetOrderResultErr = { 
        #userNotAuthenticated;
        #userDoesNotExist;
        #invalidOrder;
        #noOrderFound;
        #youAreNotTheOwnerOfThisOrder;

        #userDoesNotActiveOrNotExist;
    };

    public type GetOrderResult = Result.Result<GetOrderResultOk, GetOrderResultErr>;


}