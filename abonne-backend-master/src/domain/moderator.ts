export class Moderator {
  protected _id: number;
  protected _username: string;
  protected _password: string;
  protected _role: string;
  protected _active: boolean;

  constructor(username: string, password: string, role: string, active: boolean, id?: number) {
    this._id = id || 0;
    this._username = username;
    this._password = password;
    this._role = role;
    this._active = active;
  }

  // setters
  set username(username: string) {
    this._username = username;
  }
  set password(password: string) {
    this._password = password;
  }
  set role(role: string) {
    this._role = role;
  }
  set active(active: boolean) {
    this._active = active;
  }

  // getters
  get id() {
    return this._id;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  get role() {
    return this._role;
  }
  get active() {
    return this._active;
  }

  public toJSON(): object {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
      active: this.active
    };
  }
}
