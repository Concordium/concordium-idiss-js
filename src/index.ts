export {IdentityIssuer} from './idiss'
export {IdentityProviderInfo,AnonimityRevokersInfo,IdentityObjectRequest,IdentityObjectRequestV1,IdentityRecoveryRequest,Attributes,AttributeList,IdentityObject,IdentityObjectV1,AnonymityRevocationRecord, InitialAccountData, InitialAccountRequestData, GlobalContext} from './types'

export { getIpPrivateKeyForAWSKMS } from './aws-kms'

import {
    IdentityObjectV1,
    AnonymityRevocationRecord,
    IdentityObject,
    InitialAccountData,
  } from "./types";
  
  export { S3ObjectStorage } from "./aws-s3";
  export interface ObjectStorage {
    storeObject(
      obj: IdentityObject | AnonymityRevocationRecord | InitialAccountData
    ): Promise<string>;
    storeObjectV1(
      obj: IdentityObjectV1 | AnonymityRevocationRecord | InitialAccountData
    ): Promise<string>;
  }
  