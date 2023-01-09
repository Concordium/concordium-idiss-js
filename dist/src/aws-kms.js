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
exports.getIpPrivateKeyForAWSKMS = void 0;
const aws_sdk_1 = require("aws-sdk");
/**
 *
 * @param encryptedKey
 * @param keyIdArn The Amazon Resource Name (ARN) of the CMK that was used to decrypt the data.
 */
function getIpPrivateKeyForAWSKMS(encryptedKey, keyIdArn) {
    const kms = new aws_sdk_1.KMS();
    return () => __awaiter(this, void 0, void 0, function* () {
        //Ask AWS KMS to decrypt encrypted key
        const decryptParams = {
            CiphertextBlob: Buffer.from(encryptedKey, 'base64'),
            KeyId: keyIdArn
        };
        const resp = yield kms.decrypt(decryptParams).promise();
        return resp.Plaintext.toString();
    });
}
exports.getIpPrivateKeyForAWSKMS = getIpPrivateKeyForAWSKMS;
;
