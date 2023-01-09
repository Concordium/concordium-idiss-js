import { IdentityObjectV1, AnonymityRevocationRecord, IdentityObject, InitialAccountData } from "./types";
import { ObjectStorage } from ".";
export declare class S3ObjectStorage implements ObjectStorage {
    bucket: string;
    constructor(bucket: string);
    storeObject(obj: IdentityObject | AnonymityRevocationRecord | InitialAccountData): Promise<string>;
    storeObjectV1(obj: IdentityObjectV1 | AnonymityRevocationRecord | InitialAccountData): Promise<string>;
}
