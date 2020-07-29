const { config } = require("../config/index");
const AWS = require("aws-sdk");
const fs = require("fs");
const { genFileName, MIME } = require("./utilities");

const AWS_ACCESS_KEY_ID = config.awsAccessKeyId;
const AWS_SECRET_ACCESS_KEY = config.awsSecretAccessKey;
const AWS_DEFAULT_REGION = config.awsDefaultRegion;
const AWS_BUCKET = config.awsBucket;

class AwsLib {
  constructor() {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_DEFAULT_REGION
    });
    this.s3 = new AWS.S3();
    this.sns = new AWS.SNS({ DefaultSMSType: "Transactional" });
  }

  uploadFile(file, folder, ext, name, size) {
    const filename = genFileName(name, ext, size);
    const params = {
      Bucket: AWS_BUCKET,
      Key: `${folder}/${filename}.${ext}`,
      Body: fs.createReadStream(file),
      ACL: "public-read"
    };
    return this.s3
      .upload(params, function(err, result) {
        if (err) {
          return err.stack;
        }
        return result;
      })
      .promise();
  }

  uploadBase64(base64, folder, name, ext) {
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const filename = genFileName(name, ext, "base64");
    const contenttype = MIME(ext);
    const params = {
      Bucket: AWS_BUCKET,
      Key: `${folder}/${filename}.${ext}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: contenttype
    };
    return this.s3
      .upload(params, function(err, result) {
        if (err) {
          return err.stack;
        }
        return result;
      })
      .promise();
  }

  deleteFile(key) {
    const params = {
      Bucket: AWS_BUCKET,
      Key: key
    };
    return this.s3
      .deleteObject(params, function(err, result) {
        if (err) {
          return err.stack;
        }
        return result;
      })
      .promise();
  }

  sendSMS(cellPhone, subject, message, country) {
    country = country || "+57";
    const l = cellPhone.length;
    if (l === 10) {
      cellPhone = `${country}${cellPhone}`;
    }
    const params = {
      MessageStructure: "string",
      PhoneNumber: cellPhone,
      Subject: subject,
      Message: message,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional"
        }
      }
    };
    return this.sns
      .publish(params, function(err, result) {
        if (err) {
          return err.stack;
        }
        return result;
      })
      .promise();
  }
}

module.exports = AwsLib;
