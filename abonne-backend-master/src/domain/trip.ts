import { Driver } from "./driver";
import { Moderator } from "./moderator";

export class Trip {
  protected _id: number | undefined;
  protected _customerName: string;
  protected _whatsAppNumber: string;
  protected _startAt: Date;
  protected _fromAddress: string;
  protected _toAddress: string;
  protected _waitingHours: number;
  protected _oneWay: boolean;
  protected _status: string | undefined;
  protected _driver: Driver | undefined;
  protected _moderator: Moderator | undefined;
  protected _duration: number | undefined;

  constructor(
    customerName: string,
    whatsAppNumber: string,
    startAt: Date,
    fromAddress: string,
    toAddress: string,
    waitingHours: number,
    oneWay: boolean,
    id?: number,
    status?: string,
    driver?: Driver,
    moderator?: Moderator,
    duration?: number
  ) {
    this._customerName = customerName;
    this._whatsAppNumber = whatsAppNumber;
    this._startAt = startAt;
    this._fromAddress = fromAddress;
    this._toAddress = toAddress;
    this._waitingHours = waitingHours;
    this._oneWay = oneWay;
    this._id = id;
    this._status = status;
    this._driver = driver;
    this._moderator = moderator;
    this._duration = duration;
  }

  // setters
  set customerName(customerName: string) {
    this._customerName = customerName;
  }
  set whatsAppNumber(whatsAppNumber: string) {
    this._whatsAppNumber = whatsAppNumber;
  }
  set startAt(startAt: Date) {
    this._startAt = startAt;
  }
  set fromAddress(fromAddress: string) {
    this._fromAddress = fromAddress;
  }
  set toAddress(toAddress: string) {
    this._toAddress = toAddress;
  }
  set waitingHours(waitingHours: number) {
    this._waitingHours = waitingHours;
  }
  set oneWay(oneWay: boolean) {
    this._oneWay = oneWay;
  }
  set status(status: string | undefined) {
    this._status = status;
  }
  set driver(driver: Driver | undefined) {
    this._driver = driver;
  }
  set moderator(moderator: Moderator | undefined) {
    this._moderator = moderator;
  }
  set duration(duration: number | undefined) {
    this._duration = duration;
  }

  // getters
  get id() {
    return this._id;
  }
  get customerName() {
    return this._customerName;
  }
  get whatsAppNumber() {
    return this._whatsAppNumber;
  }
  get startAt() {
    return this._startAt;
  }
  get fromAddress() {
    return this._fromAddress;
  }
  get toAddress() {
    return this._toAddress;
  }
  get waitingHours() {
    return this._waitingHours;
  }
  get oneWay() {
    return this._oneWay;
  }
  get status() {
    return this._status;
  }
  get driver() {
    return this._driver;
  }
  get moderator() {
    return this._moderator;
  }
  get duration() {
    return this._duration;
  }

  public toJSON(): object {
    return {
      id: this.id,
      customerName: this.customerName,
      whatsAppNumber: this.whatsAppNumber,
      startAt: this.startAt,
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      waitingHours: this.waitingHours,
      oneWay: this.oneWay,
      status: this.status,
      driver: this.driver,
      moderator: this.moderator,
      duration: this.duration
    };
  }
}
