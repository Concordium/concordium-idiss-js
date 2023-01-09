export interface Validator {
    validate_request: (global: string, ipInfo: string, arInfos: string, request: string) => {
        accountAddress: string;
    } | Error;
    create_identity_object: (ipInfo: string, request: string, alist: string, expiry: number, private_key: string, private_cdi_key: string) => {
        idObject: string;
        arRecord: string;
        initialAccount: string;
    } | Error;
    validate_request_v1: (global: string, ipInfo: string, arInfos: string, request: string) => undefined | Error;
    create_identity_object_v1: (ipInfo: string, request: string, alist: string, private_key: string) => {
        idObject: string;
        arRecord: string;
    } | Error;
    validate_recovery_request: (global: string, ipInfo: string, request: string) => undefined | Error;
    version: () => string;
}
export declare var validator: Validator;
