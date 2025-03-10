export const idlFactory = ({ IDL }) => {
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'operator' : IDL.Null,
    'user' : IDL.Null,
    'assistant' : IDL.Null,
    'superadmin' : IDL.Null,
  });
  const Profile = IDL.Record({
    'dni' : IDL.Text,
    'owner' : IDL.Principal,
    'password' : IDL.Text,
    'name' : IDL.Text,
    'role' : Role,
    'email' : IDL.Text,
    'countryresidence' : IDL.Text,
    'countryorigindocument' : IDL.Text,
    'phone' : IDL.Text,
    'lastname' : IDL.Text,
  });
  const GetProfileResultOk = IDL.Variant({
    'userSuccessfullyDeleted' : IDL.Null,
    'profiles' : IDL.Vec(Profile),
    'profile' : Profile,
    'userSuccessfullyAdded' : IDL.Null,
  });
  const GetProfileResultErr = IDL.Variant({
    'userNotAuthenticated' : IDL.Null,
    'countryDataNotFound' : IDL.Null,
    'userDoesNotExist' : IDL.Null,
    'unregisteredUser_nameOrEmailIsInvalid' : IDL.Null,
  });
  const GetProfileResult = IDL.Variant({
    'ok' : GetProfileResultOk,
    'err' : GetProfileResultErr,
  });
  return IDL.Service({
    'getProfiles' : IDL.Func([], [GetProfileResult], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'registerUser' : IDL.Func([Profile], [GetProfileResult], []),
    'whoAmI' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
