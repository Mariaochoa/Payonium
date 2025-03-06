import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor {



  public shared query ({caller}) func greet(name : Text) : async Text {
   // if(Principal.isAnonymous(caller)) return "No tiene permiso para usar este funcion";
    return "Hello Payonium user: " # name # "!";
  };

  public shared query (msg) func whoAmI(): async Principal{
    return msg.caller;
  };
  

};


