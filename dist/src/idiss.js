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
exports.IdentityIssuer = void 0;
const Either_1 = require("fp-ts/lib/Either");
const PathReporter_1 = require("io-ts/lib/PathReporter");
const types_1 = require("./types");
const libidiss_1 = require("./addons/libidiss");
// The maximum number of seconds an identity recovery request can deviate from
// current time to be considered valid.
const max_timestamp_deviation = 60;
class IdentityIssuer {
    /**
     *
     * @param ipInfo IdentityProviderInfo object
     */
    constructor(global, ipInfo, arsInfo, getIpPrivateKey, getIpCdiPrivateKey) {
        const _global = types_1.GlobalContext.decode(global);
        if ((0, Either_1.isRight)(_global)) {
            this.global = global;
        }
        const _ipInfo = types_1.IdentityProviderInfo.decode(ipInfo);
        if ((0, Either_1.isRight)(_ipInfo)) {
            this.ipInfo = ipInfo;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_ipInfo).join("\n"));
        }
        const _arsInfo = types_1.AnonimityRevokersInfo.decode(arsInfo);
        if ((0, Either_1.isRight)(_arsInfo)) {
            this.arsInfo = arsInfo;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_arsInfo).join("\n"));
        }
        this.getIpPrivateKey = getIpPrivateKey;
        this.getIpCdiPrivateKey = getIpCdiPrivateKey;
    }
    /**
     * Validates if the IdentityObjectRequest has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequest object
     */
    validateIdentityObjectRequestType(identityObjectRequest) {
        //Decode
        const _identityObjectRequest = types_1.IdentityObjectRequest.decode(identityObjectRequest);
        if ((0, Either_1.isRight)(_identityObjectRequest)) {
            return identityObjectRequest;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_identityObjectRequest).join("\n"));
        }
    }
    /**
     * Validates if the IdentityObjectRequestV1 has all the fields correctly
     *
     * @param identityObjectRequest IdentityObjectRequestV1 object
     */
    validateIdentityObjectRequestV1Type(identityObjectRequest) {
        //Decode
        const _identityObjectRequest = types_1.IdentityObjectRequestV1.decode(identityObjectRequest);
        if ((0, Either_1.isRight)(_identityObjectRequest)) {
            return identityObjectRequest;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_identityObjectRequest).join("\n"));
        }
    }
    /**
     * Validates if the IdentityRecoveryRequest has all the fields correctly
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     */
    validateIdentityRecoveryRequestType(identityRecoveryRequest) {
        //Decode
        const _identityRecoveryRequest = types_1.IdentityRecoveryRequest.decode(identityRecoveryRequest);
        if ((0, Either_1.isRight)(_identityRecoveryRequest)) {
            return identityRecoveryRequest;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_identityRecoveryRequest).join("\n"));
        }
    }
    /**
     * Validates if the IdentityObjectRequest is valid using the WASM library
     *
     * @param identityObjectRequest IdentityObjectRequest object
     * @returns if the request is valid the address of the account that will be created by the initial account creation
     * transaction. If the request is invalid then an exception is thrown.
     */
    validateIdentityObjectRequest(identityObjectRequest) {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        const ars_info = JSON.stringify(this.arsInfo);
        identityObjectRequest = this.validateIdentityObjectRequestType(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);
        const response = libidiss_1.validator.validate_request(global, ip_info, ars_info, request);
        if ("accountAddress" in response) {
            return response.accountAddress;
        }
        else {
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
    validateIdentityObjectRequestV1(identityObjectRequest) {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        const ars_info = JSON.stringify(this.arsInfo);
        identityObjectRequest = this.validateIdentityObjectRequestV1Type(identityObjectRequest);
        const request = JSON.stringify(identityObjectRequest);
        const response = libidiss_1.validator.validate_request_v1(global, ip_info, ars_info, request);
        if (response == undefined) {
            return;
        }
        else {
            throw response;
        }
    }
    /**
     * Validates if the IdentityRecoveryRequest is valid using the library
     *
     * @param identityRecoveryRequest IdentityRecoveryRequest object
     * @returns if the request is valid return nothing. Otherwise throw an Error.
     */
    validateIdentityRecoveryRequest(identityRecoveryRequest, timestamp) {
        //Convert JSON object to string
        const global = JSON.stringify(this.global);
        const ip_info = JSON.stringify(this.ipInfo);
        identityRecoveryRequest = this.validateIdentityRecoveryRequestType(identityRecoveryRequest);
        const givenTimestamp = identityRecoveryRequest.idRecoveryRequest.value.timestamp;
        if (givenTimestamp + max_timestamp_deviation >= timestamp && givenTimestamp <= timestamp + max_timestamp_deviation) {
            const request = JSON.stringify(identityRecoveryRequest);
            const response = libidiss_1.validator.validate_recovery_request(global, ip_info, request);
            if (response == undefined) {
                return;
            }
            else {
                throw response;
            }
        }
        else {
            throw new Error("Identity recovery request is not current enough.");
        }
    }
    /**
     * Validates if the AttributeList has all the fields correctly
     *
     * @param attributeList AttributeList object
     */
    validateAttributeListType(attributeList) {
        //Decode
        const _attributeList = types_1.AttributeList.decode(attributeList);
        if ((0, Either_1.isRight)(_attributeList)) {
            return attributeList;
        }
        else {
            throw new Error(PathReporter_1.PathReporter.report(_attributeList).join("\n"));
        }
    }
    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
    createIdentityObject(identityObjectRequest, attributeList, expiry) {
        return __awaiter(this, void 0, void 0, function* () {
            //Convert JSON object to string
            const ip_info = JSON.stringify(this.ipInfo);
            //Check if identityObjectRequest has all the valid fields
            identityObjectRequest = this.validateIdentityObjectRequestType(identityObjectRequest);
            const request = JSON.stringify(identityObjectRequest);
            //Check if attributeList has all the valid fields
            attributeList = this.validateAttributeListType(attributeList);
            const alist = JSON.stringify(attributeList);
            //Get private key
            let ip_private_key = yield this.getIpPrivateKey();
            let ip_cdi_private_key = yield this.getIpCdiPrivateKey();
            //Create Identity Object
            const identity_object_response = libidiss_1.validator.create_identity_object(ip_info, request, alist, expiry, ip_private_key, ip_cdi_private_key);
            //Remove private key from memory
            ip_private_key = null;
            if (identity_object_response instanceof Error) {
                throw identity_object_response;
            }
            else {
                //Decode
                const identityObject = JSON.parse(identity_object_response.idObject);
                const _identityObject = types_1.IdentityObject.decode(identityObject);
                if ((0, Either_1.isRight)(_identityObject)) {
                    const arRecord = JSON.parse(identity_object_response.arRecord);
                    const _arRecord = types_1.AnonymityRevocationRecord.decode(arRecord);
                    if ((0, Either_1.isRight)(_arRecord)) {
                        const initialAccountData = JSON.parse(identity_object_response.initialAccount);
                        const _initialAccountData = types_1.InitialAccountData.decode(initialAccountData);
                        if ((0, Either_1.isRight)(_initialAccountData)) {
                            return [identityObject, arRecord, initialAccountData];
                        }
                        else {
                            throw new Error(PathReporter_1.PathReporter.report(_initialAccountData).join("\n"));
                        }
                    }
                    else {
                        throw new Error(PathReporter_1.PathReporter.report(_arRecord).join("\n"));
                    }
                }
                else {
                    throw new Error(PathReporter_1.PathReporter.report(_identityObject).join("\n"));
                }
            }
        });
    }
    /**
     * Creates and Identity Object
     *
     * @param identityObjectRequest
     * @param attributeList
     */
    createIdentityObjectV1(identityObjectRequest, attributeList) {
        return __awaiter(this, void 0, void 0, function* () {
            //Convert JSON object to string
            const ip_info = JSON.stringify(this.ipInfo);
            //Check if identityObjectRequest has all the valid fields
            identityObjectRequest = this.validateIdentityObjectRequestV1Type(identityObjectRequest);
            const request = JSON.stringify(identityObjectRequest);
            //Check if attributeList has all the valid fields
            attributeList = this.validateAttributeListType(attributeList);
            const alist = JSON.stringify(attributeList);
            //Get private key
            let ip_private_key = yield this.getIpPrivateKey();
            //Create Identity Object
            const identity_object_response = libidiss_1.validator.create_identity_object_v1(ip_info, request, alist, ip_private_key);
            //Remove private key from memory
            ip_private_key = null;
            if (identity_object_response instanceof Error) {
                throw identity_object_response;
            }
            else {
                //Decode
                const identityObject = JSON.parse(identity_object_response.idObject);
                const _identityObject = types_1.IdentityObjectV1.decode(identityObject);
                if ((0, Either_1.isRight)(_identityObject)) {
                    const arRecord = JSON.parse(identity_object_response.arRecord);
                    const _arRecord = types_1.AnonymityRevocationRecord.decode(arRecord);
                    if ((0, Either_1.isRight)(_arRecord)) {
                        return [identityObject, arRecord];
                    }
                    else {
                        throw new Error(PathReporter_1.PathReporter.report(_arRecord).join("\n"));
                    }
                }
                else {
                    throw new Error(PathReporter_1.PathReporter.report(_identityObject).join("\n"));
                }
            }
        });
    }
    /**
     * Get Library Version
     *
     */
    version() {
        return libidiss_1.validator.version();
    }
}
exports.IdentityIssuer = IdentityIssuer;
