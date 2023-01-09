import { S3 } from "aws-sdk";
import {
  IdentityObjectV1,
  AnonymityRevocationRecord,
  IdentityObject,
  InitialAccountData,
} from "./types";
import { ObjectStorage } from ".";
import { isRight } from "fp-ts/lib/Either";

export class S3ObjectStorage implements ObjectStorage {
  bucket: string;

  constructor(bucket: string) {
    this.bucket = bucket;
  }

  async storeObject(
    obj: IdentityObject | AnonymityRevocationRecord | InitialAccountData
  ): Promise<string> {
    let id, objectType;

    //Is IdentityObject?
    const idObj = IdentityObject.decode(obj);
    if (isRight(idObj)) {
      id = idObj.right.value.preIdentityObject.pubInfoForIp.idCredPub;
      objectType = "IdentityObject";
    }

    //Is AnonymityRevocationRecord?
    const arrObj = AnonymityRevocationRecord.decode(obj);
    if (isRight(arrObj)) {
      id = arrObj.right.value.idCredPub;
      objectType = "AnonymityRevocationRecord";
    }

    const data = JSON.stringify(obj);
    const key = "glacier/" + id + "/" + objectType + "/data.json";

    const s3 = new S3();
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Body: data,
      Key: key,
    };
    // Upload the archive.
    await s3.putObject(params).promise();
    return key;
  }

  async storeObjectV1(
    obj: IdentityObjectV1 | AnonymityRevocationRecord | InitialAccountData
  ): Promise<string> {
    let id, objectType;

    //Is IdentityObject?
    const idObj = IdentityObjectV1.decode(obj);
    if (isRight(idObj)) {
      id = idObj.right.value.preIdentityObject.idCredPub;
      objectType = "IdentityObject";
    }

    //Is AnonymityRevocationRecord?
    const arrObj = AnonymityRevocationRecord.decode(obj);
    if (isRight(arrObj)) {
      id = arrObj.right.value.idCredPub;
      objectType = "AnonymityRevocationRecord";
    }

    const data = JSON.stringify(obj);
    const key = "glacier/" + id + "/" + objectType + "/data.json";

    const s3 = new S3();
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Body: data,
      Key: key,
    };
    // Upload the archive.
    await s3.putObject(params).promise();

    return key;
  }
}
