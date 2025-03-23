//Gustavo Fuentes Gonzales
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Types "./types";
import Validation "./validation";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import { phash } "mo:map/Map";
import Iter "mo:base/Iter";
import Data "canister:data";

actor {

  // public shared query ({caller}) func greet(name : Text) : async Text {
  //   if(Principal.isAnonymous(caller)) return "No tiene permiso para usar este funcion";
  //   return "Hello Payonium user: " # name # "!";
  // };

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

    if(newProfile.dni != "") {

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
            principal = newProfile.principal;   
      };

      //Map.set(profiles, thash, newProfile.email, profileWithRole);
      Map.set(profiles, thash, newProfile.principal, profileWithRole);
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
  };


  // función para obtener el perfil de un usuario (solo el propio)
  public shared ({caller}) func getMyProfile(principal: Text): async Types.GetProfileResult {
      if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

      Debug.print("el principal text es: " # principal);
      // Convertimos el principal del caller a texto
      // let callerText = Principal.toText(caller);

      // Debug.print("el principal text es: " # callerText);
      
      // Buscamos el perfil del usuario que hace la solicitud
      let maybeProfile = Map.get(profiles, thash, principal);

      switch (maybeProfile) {
          case (null) {
              Debug.print("No se encontró el perfil para el principal: " # principal);
              return #err(#userDoesNotExist); // Si el perfil no existe, retornamos un error
          };
          case (?profile) {
               let profileText = "Nombre: " # profile.name # ", Apellido: " # profile.lastname # 
                        ", Email: " # profile.email # ", DNI: " # profile.dni # 
                        ", País de origen: " # profile.countryorigindocument # 
                        ", Teléfono: " # profile.phone # ", País de residencia: " # profile.countryresidence # 
                        ", Rol: " # profile.role;

                // Imprimir el perfil completo como texto
                Debug.print("Perfil encontrado: " # profileText);
              // Si el perfil existe, lo retornamos
              return #ok(#profile(profile));       //return #ok(profile);   #ok(#profile(profile));
          };
      };
  };



  //Manejo de cuentas
  public shared ({caller}) func addAccount(newAccount: Types.Account): async Types.GetProfileResult {
    if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

    if(newAccount.owner != caller) return #err(#youAreNotTheOwnerOfThisAccount);

    return await Data.addAccount(newAccount);
  };

  // **************
  public shared (msg) func getMyAccounts(userDni: Text): async Types.GetProfileResult {
    if (Principal.isAnonymous(msg.caller)) return #err(#userNotAuthenticated);  // Validación de autenticación

    Debug.print("Principal que llama desde main: " # Principal.toText(msg.caller));

    //let principalKey = Principal.toText(userPrincipal);

    let maybeProfile = Map.get(profiles, thash, userDni);

    switch (maybeProfile) {
            case (null) {
                return #err(#userDoesNotExist);
            };
            case (?profile) {
                //retorna las tareas de un usuario paticular
                let userAccount = await Data.getAccountsByPrincipal(profile.owner);
                //return #ok(userTasks);
                return #ok(#accounts(userAccount));
            };
        };

  };






// Función para eliminar una cuenta
  // public shared ({caller}) func delAccount(simpleaccountnumber: Text): async Types.GetProfileResult {
  //   if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);  // Validación de autenticación

  //   // Se valida que el propietario de la cuenta sea el que está llamando
  //   let result = await Data.getAccountByNumber(simpleaccountnumber);
  //   switch(result) {
  //     case #err(_err) { return result; };  // Si no se encuentra la cuenta, retornar el error
  //     case #ok(?accounts) {
  //       let account = accounts[0]; // Suponemos que la función getAccountByNumber devuelve solo una cuenta
  //       if (account.owner != caller) {
  //         return #err(#youAreNotTheOwnerOfThisAccount);  // Validación de propietario
  //       }
  //     };
  //   }

  //   // Llamada a la función de data.mo para eliminar la cuenta
  //   return await Data.delAccount(simpleaccountnumber);
  // };

  // // Función para obtener una cuenta por número de cuenta
  // public query ({caller}) func getAccountByNumber(simpleaccountnumber: Text): async Types.GetProfileResult {
  //   if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);  // Validación de autenticación

  //   // Llamada a la función de data.mo para obtener una cuenta por su número
  //   return await Data.getAccountByNumber(simpleaccountnumber);
  // };

  // // Función para actualizar una cuenta
  // public shared ({caller}) func updateAccount(simpleaccountnumber: Text, updatedAccount: Types.Account): async Types.GetProfileResult {
  //   if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);  // Validación de autenticación

  //   // Verifica que el propietario de la cuenta sea el que está llamando
  //   let result = await Data.getAccountByNumber(simpleaccountnumber);
  //   switch(result) {
  //     case #err(_err) { return result; };  // Si no se encuentra la cuenta, retornar el error
  //     case #ok(?accounts) {
  //       let account = accounts[0];  // Suponemos que la función getAccountByNumber devuelve solo una cuenta
  //       if (account.owner != caller) {
  //         return #err(#youAreNotTheOwnerOfThisAccount);  // Validación de propietario
  //       }
  //     };
  //   }

  //   // Llamada a la función de data.mo para actualizar la cuenta
  //   return await Data.updateAccount(simpleaccountnumber, updatedAccount);
  // };





};


