//====> Import Config Variables <=====
import { Client, Databases, ID, Query } from "appwrite";
import config from "./../config/config";

//====> Define Database Service <=====
export class DatabaseService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.bucket);
  }

  //===> Create Post
  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      const data = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userId,
        }
      );
      return data;
    } catch (error) {
      console.log("Appwrite Error:: createPost::", error);
    }
  }

  //===> Update Post
  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Error:: updatePost::", error);
    }
  }

  //===> Delete Post
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("Appwrite Error:: deletePost::", error);
      return false;
    }
  }

  //===> Get Single Post
  async getPost(slug) {
    try {
      const data = await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return data;
    } catch (error) {
      console.log("Appwrite Error:: getPost::", error);
      return false;
    }
  }

  //===> Get Active Posts
  async getPosts(Quires = [Query.equal("status", "active")]) {
    try {
      const data = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        Quires
      );
      return data;
    } catch (error) {
      console.log("Appwrite Error:: getPosts::", error);
      return false;
    }
  }

  //========> File Services <========
  //===> File Upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Error:: uploadFile::", error);
      return false;
    }
  }

  //===> Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error:: deleteFile::", error);
      return false;
    }
  }

  //===> Get File For Preview
  getPreviewFile(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

//===> Define Database Object
const dataBase = new DatabaseService();

export default dataBase;
