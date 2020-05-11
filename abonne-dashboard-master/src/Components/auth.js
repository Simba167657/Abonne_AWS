import decode from "jwt-decode";

class Auth {
  constructor() {
    this.authenticated = false;
    this.user = "User";
    this.role = "EMPLOYEE";
    this.id = null;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated(owner) {
    // check token validation
    try {
      const token = localStorage.getItem("token");
      const decoded = decode(token);
      this.authenticated = new Date(decoded.exp * 1000) > new Date().getTime() ? true : false;
      this.user = decoded.name;
      this.role = decoded.role;
      this.id = decoded.id;
      if (owner && this.role !== "OWNER") {
        this.authenticated = false;
      }
    } catch (error) {
      this.authenticated = false;
    }
    return this.authenticated;
  }
}

export default new Auth();
