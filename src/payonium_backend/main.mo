//Gustavo Fuentes Gonzales
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Types "./types";
import Validation "./validation";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import Iter "mo:base/Iter";

actor {

  public shared query ({caller}) func greet(name : Text) : async Text {
    if(Principal.isAnonymous(caller)) return "No tiene permiso para usar este funcion";
    return "Hello Payonium user: " # name # "!";
  };

  public shared query (msg) func whoAmI(): async Principal{
    return msg.caller;
  };
  
  stable var profiles =Map.new<Text, Types.Profile>();


  // Función para convertir Text a Role
  func textToRole(roleText : Text) : ?Types.Role {
    switch (roleText) {
      case ("superadmin") { ?#superadmin };
      case ("admin") { ?#admin };
      case ("operator") { ?#operator };
      case ("assistant") { ?#assistant };
      case ("user") { ?#user };
      case (_) { null }; // Si no coincide, retornamos null
    }
  };

  //registro de usuarios
  public shared ({caller}) func registerUser(newProfile: Types.Profile) : async Types.GetProfileResult {
    if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

    // let isEmailValid = Validation.validateEmail(newProfile.email);
    // let isNameValid = Validation.validateName(newProfile.name);
    // let isLastNameValid = Validation.validateName(newProfile.lastname);
    // let isCountryOriginDocumentValid = Validation.validateCountry(newProfile.countryorigindocument);

    //if(isNameValid and isEmailValid and isLastNameValid and isCountryOriginDocumentValid){

    if(newProfile.email != "") {

      let role = switch (textToRole(newProfile.role)){
        case (?r) {r};
        case (null) { return #err(#unregisteredUser_invelidRole)};
      };

      var profileWithRole = {
            name = newProfile.name;
            lastname = newProfile.lastname;
            dni = newProfile.dni;
            countryorigindocument = newProfile.countryorigindocument;
            email = newProfile.email;
            phone = newProfile.phone;
            password = newProfile.password;
            countryresidence = newProfile.countryresidence;
            //owner = newProfile.owner;
            owner = caller;
            role = newProfile.role;
            bankaccount = newProfile.bankaccount;
            depositcurrency = newProfile.depositcurrency;
        
      };

      Map.set(profiles, thash, newProfile.email, profileWithRole);
      Debug.print("se registro el usuario: " # newProfile.name);
      return #ok(#userSuccessfullyAdded);
    } else {
      Debug.print("no se registro al usuario");
      return #err(#unregisteredUser_nameOrEmailIsInvalid);
    }

  };

  //obtencion de registros de usuarios
  public query ({caller}) func getProfiles(): async Types.GetProfileResult {
    if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

    let profileIter = Map.vals(profiles);
    return #ok(#profiles(Iter.toArray(profileIter)));
  }


};


