"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ObjectStorage = void 0;
const aws_sdk_1 = require("aws-sdk");
const types_1 = require("./types");
const Either_1 = require("fp-ts/lib/Either");
class S3ObjectStorage {
    constructor(bucket) {
        this.bucket = bucket;
    }
    storeObject(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let id, objectType;
            //Is IdentityObject?
            const idObj = types_1.IdentityObject.decode(obj);
            if ((0, Either_1.isRight)(idObj)) {
                id = idObj.right.value.preIdentityObject.pubInfoForIp.idCredPub;
                objectType = "IdentityObject";
            }
            //Is AnonymityRevocationRecord?
            const arrObj = types_1.AnonymityRevocationRecord.decode(obj);
            if ((0, Either_1.isRight)(arrObj)) {
                id = arrObj.right.value.idCredPub;
                objectType = "AnonymityRevocationRecord";
            }
            const data = JSON.stringify(obj);
            const key = "glacier/" + id + "/" + objectType + "/data.json";
            const s3 = new aws_sdk_1.S3();
            const params = {
                Bucket: this.bucket,
                Body: data,
                Key: key,
            };
            // Upload the archive.
            yield s3.putObject(params).promise();
            return key;
        });
    }
    storeObjectV1(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let id, objectType;
            //Is IdentityObject?
            const idObj = types_1.IdentityObjectV1.decode(obj);
            if ((0, Either_1.isRight)(idObj)) {
                id = idObj.right.value.preIdentityObject.idCredPub;
                objectType = "IdentityObject";
            }
            //Is AnonymityRevocationRecord?
            const arrObj = types_1.AnonymityRevocationRecord.decode(obj);
            if ((0, Either_1.isRight)(arrObj)) {
                id = arrObj.right.value.idCredPub;
                objectType = "AnonymityRevocationRecord";
            }
            const data = JSON.stringify(obj);
            const key = "glacier/" + id + "/" + objectType + "/data.json";
            const s3 = new aws_sdk_1.S3();
            const params = {
                Bucket: this.bucket,
                Body: data,
                Key: key,
            };
            // Upload the archive.
            yield s3.putObject(params).promise();
            return key;
        });
    }
}
exports.S3ObjectStorage = S3ObjectStorage;
