import { getIpPrivateKeyForAWSKMS } from "../src";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";


describe("getIpPrivateKeyForAWSKMS", ()=>{

    let sut: ()=>Promise<string>;

    beforeAll(()=>{
        const encriptedKey="someKey"
        const keyId="keyId"
        AWSMock.setSDKInstance(AWS);
        const resp: AWS.KMS.DecryptResponse = {
            Plaintext:"macoy123"
        }
        AWSMock.mock('KMS', 'decrypt', Promise.resolve(resp));
        sut= getIpPrivateKeyForAWSKMS(encriptedKey,keyId);
    })

    describe("getIpPrivateKeyForAWSKMS", () => {
        test('valid', async () => {
            
            const decryptedKey=await sut();
            expect(decryptedKey).toEqual("macoy123")
        })
    })

})