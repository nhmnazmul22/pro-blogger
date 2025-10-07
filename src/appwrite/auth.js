//====> Import Config Variables <=====
import { Account, Client, ID } from "appwrite";
import config from "./../config/config";

//====> Define Appwrite Auth Service Class <=====
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //==> User Registration Method
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //==> call the login method when user successfully create account
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //==> User Login Method
  async login({ email, password }) {
    try {
      const loginData = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return loginData;
    } catch (error) {
      throw error;
    }
  }

  //===> Get Current User Data
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Error:: Get Current User:", error);
    }
    return null;
  }

  //===> Logout User
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Error:: Logout:", error);
    }
  }
}

//====> Define Appwrite Auth Service Class Object <=====
const authService = new AuthService();

//====> Export Appwrite Auth Service Class Object <=====
export default authService;
