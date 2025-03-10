import Text "mo:base/Text";
import Debug "mo:base/Debug";

module{
    //funcion para validar el nombre, que tenga mas de 3 letras
    //y no tengan caracteres especiales
    public func validateName(name: Text): Bool {
        var tieneTresLetras: Bool = false;
        var soloLetras: Bool = true;
        var contadorLetras: Int = 0;

        let iter = Text.toIter(name);
        for (char in iter) {
            if ((char >= 'A' and char <= 'Z') or (char >= 'a' and char <= 'z')) {
                contadorLetras += 1;
            } else {
                soloLetras := false;
            };
        };

        if (contadorLetras >= 3) {
            tieneTresLetras := true;
        };

        if (tieneTresLetras and soloLetras) {
            return true;
        } else {
            Debug.print("The name: " # name # " is invalid");
            return false;
        };
    };

    //funcion para validar el email, que tenga el @ y el .
    public func validateEmail(email: Text): Bool {
        var hasAtSymbol = false;
        var hasDotAfterAt = false;
        var atIndex = -1;
        var dotIndex = -1;

        let length = Text.size(email);
        var i = 0;

        for (char in Text.toIter(email)) {
            if (char == '@') {
                if (hasAtSymbol) {
                    
                    return false;
                } else {
                    hasAtSymbol := true;
                    atIndex := i; 
                };
            };

            if (char == '.' and hasAtSymbol and i > atIndex) {
                hasDotAfterAt := true;
                dotIndex := i;
            };

            i += 1;
        };

        if (hasAtSymbol and hasDotAfterAt and atIndex > 0 and dotIndex > atIndex + 1 and (length > 0) and dotIndex < length - 1) {
            return true;
        } else {
            Debug.print("The email: " # email # " is invalid");
            return false;
        };
    };

    //funcion para validar pais
    public func validateCountry(country: Text): Bool {
        return country.size() > 0
    }
    
}



