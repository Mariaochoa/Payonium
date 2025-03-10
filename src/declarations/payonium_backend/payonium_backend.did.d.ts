import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type GetProfileResult = { 'ok' : GetProfileResultOk } |
  { 'err' : GetProfileResultErr };
export type GetProfileResultErr = { 'userNotAuthenticated' : null } |
  { 'countryDataNotFound' : null } |
  { 'userDoesNotExist' : null } |
  { 'unregisteredUser_nameOrEmailIsInvalid' : null };
export type GetProfileResultOk = { 'userSuccessfullyDeleted' : null } |
  { 'profiles' : Array<Profile> } |
  { 'profile' : Profile } |
  { 'userSuccessfullyAdded' : null };
export interface Profile {
  'dni' : string,
  'owner' : Principal,
  'password' : string,
  'name' : string,
  'role' : Role,
  'email' : string,
  'countryresidence' : string,
  'countryorigindocument' : string,
  'phone' : string,
  'lastname' : string,
}
export type Role = { 'admin' : null } |
  { 'operator' : null } |
  { 'user' : null } |
  { 'assistant' : null } |
  { 'superadmin' : null };
export interface _SERVICE {
  'getProfiles' : ActorMethod<[], GetProfileResult>,
  'greet' : ActorMethod<[string], string>,
  'registerUser' : ActorMethod<[Profile], GetProfileResult>,
  'whoAmI' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
