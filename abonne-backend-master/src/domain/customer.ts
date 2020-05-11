export class Customer {
  protected _id: number;
  protected _name: string;
  protected _whatsAppNumber: string;

  constructor(name: string, whatsAppNumber: string, id?: number) {
    this._id = id || 0;
    this._name = name;
    this._whatsAppNumber = whatsAppNumber;
  }

  // setters
  set name(name: string) {
    this._name = name;
  }
  set whatsAppNumber(whatsAppNumber: string) {
    this._whatsAppNumber = whatsAppNumber;
  }

  // getters
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get whatsAppNumber() {
    return this._whatsAppNumber;
  }

  public toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      whatsAppNumber: this.whatsAppNumber
    };
  }
}
