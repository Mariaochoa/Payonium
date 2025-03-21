import Principal "mo:base/Principal";
import Types "./types";
import Map "mo:map/Map";
import { thash } "mo:map/Map";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Array "mo:base/Array";


actor Data{

    stable var accounts: [Types.Account] = [];

    private func internalAddAccount(newAccount: Types.Account): async Types.GetProfileResult {
        accounts := Array.append(accounts, [newAccount]);
        Debug.print("Cuenta bancaria registrada para el Principal: " # Principal.toText(newAccount.owner));
        return #ok(#accountSuccessfullyAdded);
    };

    public shared ({caller}) func addAccount(newAccount: Types.Account): async Types.GetProfileResult {
        //if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        // Verifica que el propietario de la cuenta sea el que está llamando
        // if (newAccount.owner != caller) {
        //     return #err(#youAreNotTheOwnerOfThisAccount);
        // };

        return await internalAddAccount(newAccount);
    };

    public query func getAllAccounts(): async [Types.Account] {
        return accounts;
    };

    public query ({caller}) func getAccountsByPrincipal(): async Types.GetProfileResult {
        //if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        // Filtramos las cuentas asociadas al 'caller' (usuario actual)
        let userAccounts = Array.filter<Types.Account>(accounts, func (account) { account.owner == caller });

        if (Array.size(userAccounts) == 0) {
            return #err(#noAccountFound);
        };

        return #ok(#accounts(userAccounts));
    };


    public shared ({caller}) func delAccount(simpleaccountnumber: Text): async Types.GetProfileResult {
        // if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        var accountFound = false;
        var updatedAccounts: [Types.Account] = [];

        // Usamos Iter.range para iterar sobre el arreglo de cuentas
        for (i in Iter.range(0, Array.size(accounts) - 1)) {
            let account = accounts[i];  // Accedemos a cada cuenta por su índice
            if (account.simpleaccountnumber == simpleaccountnumber) {
                // if (account.owner != caller) {
                //     return #err(#youAreNotTheOwnerOfThisAccount);
                // };
                accountFound := true;
            } else {
                updatedAccounts := Array.append(updatedAccounts, [account]);
            };
        };

        if (accountFound) {
            accounts := updatedAccounts;
            return #ok(#accountSuccessfullyDeleted);
        } else {
            return #err(#noAccountFound);
        }
    };

    public query ({caller}) func getAccountByNumber(simpleaccountnumber: Text): async Types.GetProfileResult {
        //if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let maybeAccount = Array.find<Types.Account>(accounts, func (account) { account.simpleaccountnumber == simpleaccountnumber });

        switch (maybeAccount) {
            case null {
                return #err(#noAccountFound);
            };
            case (?account) {
                // if (account.owner != caller) {
                //     return #err(#youAreNotTheOwnerOfThisAccount);
                // };
                return #ok(#accounts([account]));
            };
        };
    };

    public shared ({caller}) func updateAccount(simpleaccountnumber: Text, updatedAccount: Types.Account): async Types.GetProfileResult {
        //if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        var accountFound = false;
        var updatedAccounts: [Types.Account] = [];


        for (i in Iter.range(0, Array.size(accounts) - 1)) {
            let account = accounts[i];
            if (account.simpleaccountnumber == simpleaccountnumber) {
                // if (account.owner != caller) {
                //     return #err(#youAreNotTheOwnerOfThisAccount); 
                // };

                let updatedAccountWithOldSimpleAccountNumber = {
                    namebankaccount = updatedAccount.namebankaccount;
                    simpleaccountnumber = account.simpleaccountnumber; 
                    longaccountnumber = updatedAccount.longaccountnumber;
                    depositcurrency = updatedAccount.depositcurrency;
                    owner = caller;
                };
                updatedAccounts := Array.append(updatedAccounts, [updatedAccountWithOldSimpleAccountNumber]);
                accountFound := true;
            } else {
                updatedAccounts := Array.append(updatedAccounts, [account]);
            };
        };

        if (accountFound) {
            accounts := updatedAccounts;
            return #ok(#accountSuccessfullyUpdated);
        } else {
            return #err(#noAccountFound);
        }
    };

}
