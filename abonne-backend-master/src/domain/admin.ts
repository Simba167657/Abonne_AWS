export class Admin {
  protected _id: number | undefined;
  protected _username: string;
  protected _password: string | undefined;
  protected _role: string;
  protected _enabled: boolean;
  protected _name: string;
  protected _mobileNumber: string;

  constructor(
    username: string,
    role: string,
    enabled: boolean,
    name: string,
    mobileNumber: string,
    id?: number,
    password?: string
  ) {
    this._username = username;
    this._role = role;
    this._enabled = enabled;
    this._id = id;
    this._password = password;
    this._name = name;
    this._mobileNumber = mobileNumber;
  }

  // setters
  set username(username: string) {
    this._username = username;
  }
  set password(password: string | undefined) {
    this._password = password;
  }
  set role(role: string) {
    this._role = role;
  }
  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }
  set name(name: string) {
    this._name = name;
  }
  set mobileNumber(name: string) {
    this._name = name;
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
  get enabled() {
    return this._enabled;
  }
  get name() {
    return this._name;
  }
  get mobileNumber() {
    return this._mobileNumber;
  }

  public toJSON(): object {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
      enabled: this.enabled,
      name: this.name,
      mobileNumber: this.mobileNumber
    };
  }
}
