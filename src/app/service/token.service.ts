import { Injectable } from '@angular/core';
const NAME_KEY = 'Name_Key';
const TOKEN_KEY = 'Token_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];
  constructor() { }
  public setNameKey(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY,name);
  }
  public getNameKey(): string {
    return window.sessionStorage.getItem(NAME_KEY)
  }
  public setTokenKey(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getTokenKey(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setRoleKey(roles: string[]){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles))
  }
  public getRoleKey(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role =>{
        this.roles.push(role.authority)
      })
      return this.roles;
    }
  }
}
