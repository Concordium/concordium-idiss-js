import { S3ObjectStorage } from "../src";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { AnonymityRevocationRecord } from "../src/";

describe("S3ObjectStorage", () => {
  let sut: S3ObjectStorage;

  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    const resp: AWS.S3.PutObjectOutput = {};
    AWSMock.mock("S3", "putObject", Promise.resolve(resp));
    sut = new S3ObjectStorage("test");
  });

  describe("storeObject", () => {
    test("valid ARR", async () => {
      const obj: AnonymityRevocationRecord = {
        v: 0,
        value: {
          idCredPub: "000",
          arData: {
            "2": { encPrfKeyShare: "111", proofComEncEq: "222" }
          },
          maxAccounts: 25,
          revocationThreshold: 2,
        },
      };
      const hash = await sut.storeObject(obj);
      expect(hash).toEqual(
        "glacier/000/AnonymityRevocationRecord/data.json"
      );
    });
  });
});
