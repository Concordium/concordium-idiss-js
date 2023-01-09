import { KMS } from 'aws-sdk';

/**
 * 
 * @param encryptedKey 
 * @param keyIdArn The Amazon Resource Name (ARN) of the CMK that was used to decrypt the data.
 */

export function getIpPrivateKeyForAWSKMS(encryptedKey: string, keyIdArn: string){
    const kms = new KMS();

    return async ():Promise<string>=>{
        //Ask AWS KMS to decrypt encrypted key
        const decryptParams: AWS.KMS.DecryptRequest = {
            CiphertextBlob: Buffer.from(encryptedKey, 'base64'),
            KeyId: keyIdArn
        }
        const resp: AWS.KMS.DecryptResponse = await kms.decrypt(decryptParams).promise()
        return resp.Plaintext.toString();
    }

};