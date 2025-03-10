import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Types "./types";
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

  //registro de usuarios
  public shared ({caller}) func registerUser(newProfile: Types.Profile) : async Types.GetProfileResult {
    if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

    if(true){
      var profileWithRole = {
            name = newProfile.name;
            lastname = newProfile.lastname;
            dni = newProfile.dni;
            countryorigindocument = newProfile.countryorigindocument;
            email = newProfile.email;
            phone = newProfile.phone;
            password = newProfile.password;
            countryresidence = newProfile.countryresidence;
            owner = newProfile.owner;
            role = #user; 
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


