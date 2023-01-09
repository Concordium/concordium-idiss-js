import { Either, isRight } from 'fp-ts/lib/Either'
import { PathReporter } from "io-ts/lib/PathReporter";

import { IdentityProviderInfo, IdentityObjectRequest, IdentityObjectRequestV1, IdentityRecoveryRequest, AttributeList, IdentityObject, IdentityObjectV1, AnonymityRevocationRecord, AnonimityRevokersInfo, InitialAccountData, GlobalContext } from './types';

import { validator } from './addons/libidiss'

// The maximum number of seconds an identity recovery request can deviate from
// current time to be considered valid.
const max_timestamp_deviation = 60;

export class IdentityIssuer {
    global: GlobalContext;
    ipInfo: IdentityProviderInfo;
    arsInfo: AnonimityRevokersInfo;
    getIpPrivateKey: ()=>Promise<string>;
    getIpCdiPrivateKey: ()=>Promise<string>;

    /**
     *
     * @param ipInfo IdentityProviderInfo object
     */
    constructor(global: GlobalContext, ipInfo: IdentityProviderInfo, arsInfo: AnonimityRevokersInfo, getIpPrivateKey: ()=>Promise<string>, getIpCdiPrivateKey: ()=>Promise<string>){
        const _global = GlobalContext.decode(global);
        if (isRight(_global)) {
            this.global = global;
        }
        const _ipInfo = IdentityProviderInfo.decode(ipInfo);
        if (isRight(_ipInfo)) {
            this.ipInfo = ipInfo;
        } else {
            throw new Error(PathReporter.report(_ipInfo).join("\n"));
        }
        const _arsInfo = AnonimityRevokersInfo.decode(arsInfo);
        if (isRight(_arsInfo)) {
            this.arsInfo = arsInfo;
        } else {
            throw new Error(PathReporter.report(_arsInfo).join("\n"));
        }

        this.getIpPrivateKey = getIpPrivateKey;
        this.getIpCdiPrivateKey = getIpCdiPrivateKey;
    }

    /**
     * Validates if the IdentityObjectRequest has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequest object
     */
    validateIdentityObjectRequestType(identityObjectRequest: any):IdentityObjectRequest{
        //Decode
        const _identityObjectRequest = IdentityObjectRequest.decode(identityObjectRequest);
        if (isRight(_identityObjectRequest)) {
            return identityObjectRequest;
        } else {
            throw new Error(PathReporter.report(_identityObjectRequest).join("\n"));
        }
    }

    /**
     * Validates if the IdentityObjectRequestV1 has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequestV1 object
     */
     validateIdentityObjectRequestV1Type(identityObjectRequest: any):IdentityObjectRequestV1{
        //Decode
        const _identityObjectRequest = IdentityObjectRequestV1.decode(identityObjectRequest);
        if (isRight(_identityObjectRequest)) {
            return identityObjectRequest;
        } else {
            throw new Error(PathReporter.report(_identityObjectRequest).join("\n"));
        }
    }

    /**
     * Validates if the IdentityRecoveryRequest has all the fields correctly
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     */
     validateIdentityRecoveryRequestType(identityRecoveryRequest: any):IdentityRecoveryRequest{
        //Decode
        const _identityRecoveryRequest = IdentityRecoveryRequest.decode(identityRecoveryRequest);
        if (isRight(_identityRecoveryRequest)) {
            return identityRecoveryRequest;
        } else {
            throw new Error(PathReporter.report(_identityRecoveryRequest).join("\n"));
        }
    }

    /**
     * Validates if the IdentityObjectRequest is valid using the WASM library
     *
     * @param identityObjectRequest IdentityObjectRequest object
     * @returns if the request is valid the address of the account that will be created by the initial account creation
     * transaction. If the request is invalid then an exception is thrown.
     */
     validateIdentityObjectRequest(identityObjectRequest: IdentityObjectRequest): string {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        const ars_info = JSON.stringify(this.arsInfo);
        identityObjectRequest = this.validateIdentityObjectRequestType(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);
        const response = validator.validate_request(global, ip_info, ars_info, request);
        if ("accountAddress" in response) {
            return response.accountAddress
        } else {
            //throw the Error
            throw response;
        }
    }

    /**
     * Validates if the IdentityObjectRequestV1 is valid using the library
     *
     * @param identityObjectRequest IdentityObjectRequestV1 object
     * @returns if the request is valid return nothing. Otherwise throw an Error.
     */
    validateIdentityObjectRequestV1(identityObjectRequest: IdentityObjectRequestV1) {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        const ars_info = JSON.stringify(this.arsInfo);
        identityObjectRequest = this.validateIdentityObjectRequestV1Type(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);
        const response = validator.validate_request_v1(global, ip_info, ars_info, request);
        if (response == undefined) {
            return;
        } else {
            throw response;
        }
    }

    /**
     * Validates if the IdentityRecoveryRequest is valid using the library
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     * @returns if the request is valid return nothing. Otherwise throw an Error.
     */
     validateIdentityRecoveryRequest(identityRecoveryRequest: IdentityRecoveryRequest, timestamp: number) {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        identityRecoveryRequest = this.validateIdentityRecoveryRequestType(identityRecoveryRequest);
        const givenTimestamp = identityRecoveryRequest.idRecoveryRequest.value.timestamp;
        if (givenTimestamp + max_timestamp_deviation >= timestamp && givenTimestamp <= timestamp + max_timestamp_deviation) {
            const request = JSON.stringify(identityRecoveryRequest);
            const response = validator.validate_recovery_request(global, ip_info, request);
            if (response == undefined) {
                return;
            } else {
                throw response;
            }
        } else {
            throw new Error("Identity recovery request is not current enough.")
        }
    }

    /**
     * Validates if the AttributeList has all the fields correctly
     *
     * @param attributeList AttributeList object
     */
    validateAttributeListType(attributeList: any):AttributeList{
        //Decode
        const _attributeList = AttributeList.decode(attributeList);
        if (isRight(_attributeList)) {
            return attributeList;
        } else {
            throw new Error(PathReporter.report(_attributeList).join("\n"));
        }
    }

    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
    async createIdentityObject(identityObjectRequest: IdentityObjectRequest, attributeList: AttributeList, expiry: number): Promise<[IdentityObject, AnonymityRevocationRecord, InitialAccountData]>{
        //Convert JSON object to string
        const ip_info = JSON.stringify(this.ipInfo);

        //Check if identityObjectRequest has all the valid fields
        identityObjectRequest = this.validateIdentityObjectRequestType(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);

        //Check if attributeList has all the valid fields
        attributeList = this.validateAttributeListType(attributeList);
        const alist = JSON.stringify(attributeList);

        //Get private key
        let ip_private_key :string = await this.getIpPrivateKey();
        let ip_cdi_private_key :string = await this.getIpCdiPrivateKey();

        //Create Identity Object
        const identity_object_response =  validator.create_identity_object(ip_info,request,alist, expiry, ip_private_key, ip_cdi_private_key);

        //Remove private key from memory
        ip_private_key=null;
        if (identity_object_response instanceof Error) {
            throw identity_object_response
        } else {
            //Decode
            const identityObject = JSON.parse(identity_object_response.idObject) as IdentityObject

            const _identityObject = IdentityObject.decode(identityObject);
            if (isRight(_identityObject)) {
                const arRecord = JSON.parse(identity_object_response.arRecord) as AnonymityRevocationRecord
                const _arRecord = AnonymityRevocationRecord.decode(arRecord);
                if (isRight(_arRecord)) {
                    const initialAccountData = JSON.parse(identity_object_response.initialAccount) as InitialAccountData
                    const _initialAccountData = InitialAccountData.decode(initialAccountData)
                    if (isRight(_initialAccountData)) {
                        return [identityObject, arRecord, initialAccountData];
                    } else {
                        throw new Error(PathReporter.report(_initialAccountData).join("\n"))
                    }
                } else {
                    throw new Error(PathReporter.report(_arRecord).join("\n"));
                }
            } else {
                throw new Error(PathReporter.report(_identityObject).join("\n"));
            }
        }
    }

    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
     async createIdentityObjectV1(identityObjectRequest: IdentityObjectRequestV1, attributeList: AttributeList): Promise<[IdentityObjectV1, AnonymityRevocationRecord]>{
        //Convert JSON object to string
        const ip_info = JSON.stringify(this.ipInfo);

        //Check if identityObjectRequest has all the valid fields
        identityObjectRequest = this.validateIdentityObjectRequestV1Type(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);

        //Check if attributeList has all the valid fields
        attributeList = this.validateAttributeListType(attributeList);
        const alist = JSON.stringify(attributeList);

        //Get private key
        let ip_private_key :string = await this.getIpPrivateKey();

        //Create Identity Object
        const identity_object_response =  validator.create_identity_object_v1(ip_info,request,alist, ip_private_key);

        //Remove private key from memory
        ip_private_key=null;
        if (identity_object_response instanceof Error) {
            throw identity_object_response
        } else {
            //Decode
            const identityObject = JSON.parse(identity_object_response.idObject) as IdentityObjectV1

            const _identityObject = IdentityObjectV1.decode(identityObject);
            if (isRight(_identityObject)) {
                const arRecord = JSON.parse(identity_object_response.arRecord) as AnonymityRevocationRecord
                const _arRecord = AnonymityRevocationRecord.decode(arRecord);
                if (isRight(_arRecord)) {
                        return [identityObject, arRecord];
                } else {
                    throw new Error(PathReporter.report(_arRecord).join("\n"));
                }
            } else {
                throw new Error(PathReporter.report(_identityObject).join("\n"));
            }
        }
    }

    /**
     * Get Library Version
     *
     */
     version(): string{
       return validator.version();
    }
}
