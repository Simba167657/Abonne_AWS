export class Price {
  protected _id: number | undefined;
  protected _price: string;
  protected _duration: string;
  protected _fromCity: string;
  protected _toCity: string;

  constructor(price: string, duration: string, fromCity: string, toCity: string, id?: number) {
    this._price = price;
    this._duration = duration;
    this._fromCity = fromCity;
    this._toCity = toCity;
    this._id = id;
  }

  // setters
  set price(price: string) {
    this._price = price;
  }
  set duration(duration: string) {
    this._duration = duration;
  }
  set fromCity(fromCity: string) {
    this._fromCity = fromCity;
  }
  set toCity(toCity: string) {
    this._toCity = toCity;
  }

  // getters
  get id() {
    return this._id;
  }
  get price() {
    return this._price;
  }
  get duration() {
    return this._duration;
  }
  get fromCity() {
    return this._fromCity;
  }
  get toCity() {
    return this._toCity;
  }

  public toJSON(): object {
    return {
      id: this.id,
      price: this.price,
      duration: this.duration,
      fromCity: this.fromCity,
      toCity: this.toCity
    };
  }
}
