import Principal "mo:base/Principal";
import Types "./types";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Debug "mo:base/Debug";


actor Data{

    stable var accounts = Map.new<Text, Types.Account>();

    // Función para agregar cuenta bancaria
    public shared ({caller}) func addAccount(newAccount: Types.Account): async Types.GetProfileResult {
        if(Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        if(newAccount.simpleaccountnumber != "") {

            Map.set(accounts, thash, newAccount.simpleaccountnumber, newAccount);
            Debug.print("se registro la cuenta: " # newAccount.simpleaccountnumber);
            return #ok(#accountSuccessfullyAdded);

        } else {
            Debug.print("No se adicionó el usuario");
            return #err(#invalidAccount);
        };
    };


}
