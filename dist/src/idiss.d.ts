import { IdentityProviderInfo, IdentityObjectRequest, IdentityObjectRequestV1, IdentityRecoveryRequest, AttributeList, IdentityObject, IdentityObjectV1, AnonymityRevocationRecord, AnonimityRevokersInfo, InitialAccountData, GlobalContext } from './types';
export declare class IdentityIssuer {
    global: GlobalContext;
    ipInfo: IdentityProviderInfo;
    arsInfo: AnonimityRevokersInfo;
    getIpPrivateKey: () => Promise<string>;
    getIpCdiPrivateKey: () => Promise<string>;
    /**
     *
     * @param ipInfo IdentityProviderInfo object
     */
    constructor(global: GlobalContext, ipInfo: IdentityProviderInfo, arsInfo: AnonimityRevokersInfo, getIpPrivateKey: () => Promise<string>, getIpCdiPrivateKey: () => Promise<string>);
    /**
     * Validates if the IdentityObjectRequest has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequest object
     */
    validateIdentityObjectRequestType(identityObjectRequest: any): IdentityObjectRequest;
    /**
     * Validates if the IdentityObjectRequestV1 has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequestV1 object
     */
    validateIdentityObjectRequestV1Type(identityObjectRequest: any): IdentityObjectRequestV1;
    /**
     * Validates if the IdentityRecoveryRequest has all the fields correctly
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     */
    validateIdentityRecoveryRequestType(identityRecoveryRequest: any): IdentityRecoveryRequest;
    /**
     * Validates if the IdentityObjectRequest is valid using the WASM library
     *
     * @param identityObjectRequest IdentityObjectRequest object
     * @returns if the request is valid the address of the account that will be created by the initial account creation
     * transaction. If the request is invalid then an exception is thrown.
     */
    validateIdentityObjectRequest(identityObjectRequest: IdentityObjectRequest): string;
    /**
     * Validates if the IdentityObjectRequestV1 is valid using the library
     *
     * @param identityObjectRequest IdentityObjectRequestV1 object
     * @returns if the request is valid return nothing. Otherwise throw an Error.
     */
    validateIdentityObjectRequestV1(identityObjectRequest: IdentityObjectRequestV1): void;
    /**
     * Validates if the IdentityRecoveryRequest is valid using the library
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     * @returns if the request is valid return nothing. Otherwise throw an Error.
     */
    validateIdentityRecoveryRequest(identityRecoveryRequest: IdentityRecoveryRequest, timestamp: number): void;
    /**
     * Validates if the AttributeList has all the fields correctly
     *
     * @param attributeList AttributeList object
     */
    validateAttributeListType(attributeList: any): AttributeList;
    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
    createIdentityObject(identityObjectRequest: IdentityObjectRequest, attributeList: AttributeList, expiry: number): Promise<[IdentityObject, AnonymityRevocationRecord, InitialAccountData]>;
    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
    createIdentityObjectV1(identityObjectRequest: IdentityObjectRequestV1, attributeList: AttributeList): Promise<[IdentityObjectV1, AnonymityRevocationRecord]>;
    /**
     * Get Library Version
     *
     */
    version(): string;
}
