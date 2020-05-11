import { S3 } from "aws-sdk";
import * as fs from "fs";
import * as Path from "path";
import { Image } from "../../domain/image";

export class Storage {
  private s3: S3;
  private bucketName: string;
  private awsKey: string;
  private awsSecret: string;
  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : "abonne-storage";
    this.awsKey = process.env.AWS_KEY ? process.env.AWS_KEY : "";
    this.awsSecret = process.env.AWS_SECRET ? process.env.AWS_SECRET : "";
    this.s3 = new S3({
      accessKeyId: this.awsKey,
      secretAccessKey: this.awsSecret
    });
  }

  public store(path: string): Promise<Image> {
    // call S3 to retrieve upload file to specified bucket
    const uploadParams: S3.PutObjectRequest = { Bucket: this.bucketName, Key: "", Body: "", ACL: "public-read-write" };

    // Configure the file stream and obtain the upload parameters
    const fileStream: fs.ReadStream = fs.createReadStream(path);
    fileStream.on("error", err => {
      console.log("File Error", err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = new Date().toISOString() + Path.basename(path) + ".png";

    // call S3 to retrieve upload file to specified bucket
    return new Promise<Image>((resolve, reject) => {
      this.s3.upload(uploadParams, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          console.log("Error", err);
          reject(err);
        }
        if (data) {
          const img = new Image(0, new Date(), new Date(), new Date(), data.Key, data.Location);
          resolve(img);
        }
      });
    });
  }
}
