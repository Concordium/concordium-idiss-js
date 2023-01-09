import * as t from 'io-ts';
/**
 * Identity Provider Information
 *
 * Information about the identity issuer.
 */
export declare const IdentityProviderInfo: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        ipIdentity: t.NumberC;
        ipDescription: t.TypeC<{
            name: t.StringC;
            url: t.StringC;
            description: t.StringC;
        }>;
        ipVerifyKey: t.StringC;
        ipCdiVerifyKey: t.StringC;
    }>;
}>;
export type IdentityProviderInfo = t.TypeOf<typeof IdentityProviderInfo>;
export declare const AnonimityRevokersInfo: t.TypeC<{
    v: t.NumberC;
    value: t.RecordC<t.StringC, t.TypeC<{
        arIdentity: t.NumberC;
        arDescription: t.TypeC<{
            name: t.StringC;
            url: t.StringC;
            description: t.StringC;
        }>;
        arPublicKey: t.StringC;
    }>>;
}>;
export type AnonimityRevokersInfo = t.TypeOf<typeof AnonimityRevokersInfo>;
/**
 * Version 0 Identity Object Request
 *
 * Request data for the Version 0 Identity Object
 */
export declare const IdentityObjectRequest: t.TypeC<{
    idObjectRequest: t.TypeC<{
        value: t.TypeC<{
            pubInfoForIp: t.TypeC<{
                idCredPub: t.StringC;
                regId: t.StringC;
                publicKeys: t.TypeC<{
                    threshold: t.NumberC;
                    keys: t.RecordC<t.StringC, t.TypeC<{
                        schemeId: t.StringC;
                        verifyKey: t.StringC;
                    }>>;
                }>;
            }>;
            proofsOfKnowledge: t.StringC;
            prfKeySharingCoeffCommitments: t.ArrayC<t.StringC>;
            prfKeyCommitmentWithIP: t.StringC;
            idCredSecCommitment: t.StringC;
            choiceArData: t.TypeC<{
                threshold: t.NumberC;
                arIdentities: t.ArrayC<t.NumberC>;
            }>;
            ipArData: t.RecordC<t.StringC, t.TypeC<{
                proofComEncEq: t.StringC;
                encPrfKeyShare: t.StringC;
            }>>;
        }>;
        v: t.NumberC;
    }>;
}>;
export type IdentityObjectRequest = t.TypeOf<typeof IdentityObjectRequest>;
/**
 * Version 1 Identity Object Request
 *
 * Request data for the Version 1 Identity Object
 */
export declare const IdentityObjectRequestV1: t.TypeC<{
    idObjectRequest: t.TypeC<{
        value: t.TypeC<{
            idCredPub: t.StringC;
            proofsOfKnowledge: t.StringC;
            prfKeySharingCoeffCommitments: t.ArrayC<t.StringC>;
            prfKeyCommitmentWithIP: t.StringC;
            idCredSecCommitment: t.StringC;
            choiceArData: t.TypeC<{
                threshold: t.NumberC;
                arIdentities: t.ArrayC<t.NumberC>;
            }>;
            ipArData: t.RecordC<t.StringC, t.TypeC<{
                proofComEncEq: t.StringC;
                encPrfKeyShare: t.StringC;
            }>>;
        }>;
        v: t.NumberC;
    }>;
}>;
export type IdentityObjectRequestV1 = t.TypeOf<typeof IdentityObjectRequestV1>;
/**
 * Identity Recovery Request
 *
 * Request data for the Version 1 Identity Object
 */
export declare const IdentityRecoveryRequest: t.TypeC<{
    idRecoveryRequest: t.TypeC<{
        value: t.TypeC<{
            idCredPub: t.StringC;
            proof: t.StringC;
            timestamp: t.NumberC;
        }>;
        v: t.NumberC;
    }>;
}>;
export type IdentityRecoveryRequest = t.TypeOf<typeof IdentityRecoveryRequest>;
export declare const Attributes: t.Type<{
    countryOfResidence?: string;
    dob?: string;
    firstName?: string;
    lastName?: string;
    idDocExpiresAt?: string;
    idDocIssuedAt?: string;
    idDocIssuer?: string;
    idDocNo?: string;
    idDocType?: string;
    nationalIdNo?: string;
    nationality?: string;
    sex?: string;
    taxIdNo?: string;
} & {}, {
    countryOfResidence?: string;
    dob?: string;
    firstName?: string;
    lastName?: string;
    idDocExpiresAt?: string;
    idDocIssuedAt?: string;
    idDocIssuer?: string;
    idDocNo?: string;
    idDocType?: string;
    nationalIdNo?: string;
    nationality?: string;
    sex?: string;
    taxIdNo?: string;
} & {}, unknown> & {
    props: {
        countryOfResidence: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        dob: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        firstName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        lastName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        idDocExpiresAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        idDocIssuedAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        idDocIssuer: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        idDocNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        idDocType: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        nationalIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        nationality: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        sex: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        taxIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
    };
};
export type Attributes = t.TypeOf<typeof Attributes>;
export declare const AttributeList: t.TypeC<{
    chosenAttributes: t.Type<{
        countryOfResidence?: string;
        dob?: string;
        firstName?: string;
        lastName?: string;
        idDocExpiresAt?: string;
        idDocIssuedAt?: string;
        idDocIssuer?: string;
        idDocNo?: string;
        idDocType?: string;
        nationalIdNo?: string;
        nationality?: string;
        sex?: string;
        taxIdNo?: string;
    } & {}, {
        countryOfResidence?: string;
        dob?: string;
        firstName?: string;
        lastName?: string;
        idDocExpiresAt?: string;
        idDocIssuedAt?: string;
        idDocIssuer?: string;
        idDocNo?: string;
        idDocType?: string;
        nationalIdNo?: string;
        nationality?: string;
        sex?: string;
        taxIdNo?: string;
    } & {}, unknown> & {
        props: {
            countryOfResidence: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            dob: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            firstName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            lastName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            idDocExpiresAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            idDocIssuedAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            idDocIssuer: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            idDocNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            idDocType: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            nationalIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            nationality: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            sex: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
            taxIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
        };
    };
    createdAt: t.StringC;
    maxAccounts: t.NumberC;
    validTo: t.StringC;
}>;
export type AttributeList = t.TypeOf<typeof AttributeList>;
/**
 * Version 0 Identity Object
 *
 */
export declare const IdentityObject: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        preIdentityObject: t.TypeC<{
            pubInfoForIp: t.TypeC<{
                idCredPub: t.StringC;
                regId: t.StringC;
                publicKeys: t.TypeC<{
                    threshold: t.NumberC;
                    keys: t.RecordC<t.StringC, t.TypeC<{
                        schemeId: t.StringC;
                        verifyKey: t.StringC;
                    }>>;
                }>;
            }>;
            proofsOfKnowledge: t.StringC;
            prfKeySharingCoeffCommitments: t.ArrayC<t.StringC>;
            prfKeyCommitmentWithIP: t.StringC;
            idCredSecCommitment: t.StringC;
            choiceArData: t.TypeC<{
                threshold: t.NumberC;
                arIdentities: t.ArrayC<t.NumberC>;
            }>;
            ipArData: t.RecordC<t.StringC, t.TypeC<{
                proofComEncEq: t.StringC;
                encPrfKeyShare: t.StringC;
            }>>;
        }>;
        attributeList: t.TypeC<{
            chosenAttributes: t.Type<{
                countryOfResidence?: string;
                dob?: string;
                firstName?: string;
                lastName?: string;
                idDocExpiresAt?: string;
                idDocIssuedAt?: string;
                idDocIssuer?: string;
                idDocNo?: string;
                idDocType?: string;
                nationalIdNo?: string;
                nationality?: string;
                sex?: string;
                taxIdNo?: string;
            } & {}, {
                countryOfResidence?: string;
                dob?: string;
                firstName?: string;
                lastName?: string;
                idDocExpiresAt?: string;
                idDocIssuedAt?: string;
                idDocIssuer?: string;
                idDocNo?: string;
                idDocType?: string;
                nationalIdNo?: string;
                nationality?: string;
                sex?: string;
                taxIdNo?: string;
            } & {}, unknown> & {
                props: {
                    countryOfResidence: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    dob: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    firstName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    lastName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocExpiresAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocIssuedAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocIssuer: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocType: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    nationalIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    nationality: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    sex: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    taxIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                };
            };
            createdAt: t.StringC;
            maxAccounts: t.NumberC;
            validTo: t.StringC;
        }>;
        signature: t.StringC;
    }>;
}>;
export type IdentityObject = t.TypeOf<typeof IdentityObject>;
/**
 * Version 1 Identity Object
 *
 */
export declare const IdentityObjectV1: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        preIdentityObject: t.TypeC<{
            idCredPub: t.StringC;
            proofsOfKnowledge: t.StringC;
            prfKeySharingCoeffCommitments: t.ArrayC<t.StringC>;
            prfKeyCommitmentWithIP: t.StringC;
            idCredSecCommitment: t.StringC;
            choiceArData: t.TypeC<{
                threshold: t.NumberC;
                arIdentities: t.ArrayC<t.NumberC>;
            }>;
            ipArData: t.RecordC<t.StringC, t.TypeC<{
                proofComEncEq: t.StringC;
                encPrfKeyShare: t.StringC;
            }>>;
        }>;
        attributeList: t.TypeC<{
            chosenAttributes: t.Type<{
                countryOfResidence?: string;
                dob?: string;
                firstName?: string;
                lastName?: string;
                idDocExpiresAt?: string;
                idDocIssuedAt?: string;
                idDocIssuer?: string;
                idDocNo?: string;
                idDocType?: string;
                nationalIdNo?: string;
                nationality?: string;
                sex?: string;
                taxIdNo?: string;
            } & {}, {
                countryOfResidence?: string;
                dob?: string;
                firstName?: string;
                lastName?: string;
                idDocExpiresAt?: string;
                idDocIssuedAt?: string;
                idDocIssuer?: string;
                idDocNo?: string;
                idDocType?: string;
                nationalIdNo?: string;
                nationality?: string;
                sex?: string;
                taxIdNo?: string;
            } & {}, unknown> & {
                props: {
                    countryOfResidence: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    dob: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    firstName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    lastName: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocExpiresAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocIssuedAt: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocIssuer: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    idDocType: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    nationalIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    nationality: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    sex: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                    taxIdNo: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]> & import("io-ts-extra").Optional;
                };
            };
            createdAt: t.StringC;
            maxAccounts: t.NumberC;
            validTo: t.StringC;
        }>;
        signature: t.StringC;
    }>;
}>;
export type IdentityObjectV1 = t.TypeOf<typeof IdentityObjectV1>;
/**
 * Anonymity Revocation Record
 */
export declare const AnonymityRevocationRecord: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        idCredPub: t.StringC;
        arData: t.RecordC<t.StringC, t.TypeC<{
            proofComEncEq: t.StringC;
            encPrfKeyShare: t.StringC;
        }>>;
        maxAccounts: t.NumberC;
        revocationThreshold: t.NumberC;
    }>;
}>;
export type AnonymityRevocationRecord = t.TypeOf<typeof AnonymityRevocationRecord>;
/**
 * Initial account creation
 */
export declare const InitialAccountRequestData: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        credential: t.TypeC<{
            type: t.StringC;
            contents: t.TypeC<{
                sig: t.StringC;
                regId: t.StringC;
                ipIdentity: t.NumberC;
                credentialPublicKeys: t.TypeC<{
                    threshold: t.NumberC;
                    keys: t.RecordC<t.StringC, t.TypeC<{
                        schemeId: t.StringC;
                        verifyKey: t.StringC;
                    }>>;
                }>;
                policy: t.TypeC<{
                    validTo: t.StringC;
                    createdAt: t.StringC;
                    revealedAttributes: t.TypeC<{}>;
                }>;
            }>;
        }>;
        messageExpiry: t.NumberC;
    }>;
}>;
export type InitialAccountRequestData = t.TypeOf<typeof InitialAccountRequestData>;
/**
 * Data returned by the call to create_identity_object.
 */
export declare const InitialAccountData: t.TypeC<{
    request: t.TypeC<{
        v: t.NumberC;
        value: t.TypeC<{
            credential: t.TypeC<{
                type: t.StringC;
                contents: t.TypeC<{
                    sig: t.StringC;
                    regId: t.StringC;
                    ipIdentity: t.NumberC;
                    credentialPublicKeys: t.TypeC<{
                        threshold: t.NumberC;
                        keys: t.RecordC<t.StringC, t.TypeC<{
                            schemeId: t.StringC;
                            verifyKey: t.StringC;
                        }>>;
                    }>;
                    policy: t.TypeC<{
                        validTo: t.StringC;
                        createdAt: t.StringC;
                        revealedAttributes: t.TypeC<{}>;
                    }>;
                }>;
            }>;
            messageExpiry: t.NumberC;
        }>;
    }>;
    accountAddress: t.StringC;
}>;
export type InitialAccountData = t.TypeOf<typeof InitialAccountData>;
/**
 * Global context with cryptographic parameters.
 */
export declare const GlobalContext: t.TypeC<{
    v: t.NumberC;
    value: t.TypeC<{
        onChainCommitmentKey: t.StringC;
        bulletproofGenerators: t.StringC;
        genesisString: t.StringC;
    }>;
}>;
export type GlobalContext = t.TypeOf<typeof GlobalContext>;
