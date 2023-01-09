"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalContext = exports.InitialAccountData = exports.InitialAccountRequestData = exports.AnonymityRevocationRecord = exports.IdentityObjectV1 = exports.IdentityObject = exports.AttributeList = exports.Attributes = exports.IdentityRecoveryRequest = exports.IdentityObjectRequestV1 = exports.IdentityObjectRequest = exports.AnonimityRevokersInfo = exports.IdentityProviderInfo = void 0;
const t = require("io-ts");
const io_ts_extra_1 = require("io-ts-extra");
/**
 * Identity Provider Information
 *
 * Information about the identity issuer.
 */
exports.IdentityProviderInfo = t.type({
    v: t.number,
    value: t.type({
        ipIdentity: t.number,
        ipDescription: t.type({
            name: t.string,
            url: t.string,
            description: t.string,
        }),
        ipVerifyKey: t.string,
        ipCdiVerifyKey: t.string
    })
});
/**
 * Anonimity Revokers Information
 *
 * Information about the Anonimity Revokers supported on the network
 *
 */
const AnonimityRevokerInfo = t.type({
    arIdentity: t.number,
    arDescription: t.type({
        name: t.string,
        url: t.string,
        description: t.string,
    }),
    arPublicKey: t.string,
});
exports.AnonimityRevokersInfo = t.type({
    v: t.number,
    value: t.record(t.string, AnonimityRevokerInfo)
});
const IpArDataObj = t.type({
    proofComEncEq: t.string,
    encPrfKeyShare: t.string,
});
const IdRequest = t.type({
    pubInfoForIp: t.type({
        idCredPub: t.string,
        regId: t.string,
        publicKeys: t.type({
            threshold: t.number,
            keys: t.record(t.string, t.type({
                schemeId: t.string,
                verifyKey: t.string
            }))
        })
    }),
    proofsOfKnowledge: t.string,
    prfKeySharingCoeffCommitments: t.array(t.string),
    prfKeyCommitmentWithIP: t.string,
    idCredSecCommitment: t.string,
    choiceArData: t.type({
        threshold: t.number,
        arIdentities: t.array(t.number),
    }),
    ipArData: t.record(t.string, IpArDataObj)
});
const IdRequestV1 = t.type({
    idCredPub: t.string,
    proofsOfKnowledge: t.string,
    prfKeySharingCoeffCommitments: t.array(t.string),
    prfKeyCommitmentWithIP: t.string,
    idCredSecCommitment: t.string,
    choiceArData: t.type({
        threshold: t.number,
        arIdentities: t.array(t.number),
    }),
    ipArData: t.record(t.string, IpArDataObj)
});
const IdRecoveryRequest = t.type({
    idCredPub: t.string,
    proof: t.string,
    timestamp: t.number,
});
/**
 * Version 0 Identity Object Request
 *
 * Request data for the Version 0 Identity Object
 */
exports.IdentityObjectRequest = t.type({
    idObjectRequest: t.type({
        value: IdRequest,
        v: t.number,
    })
});
/**
 * Version 1 Identity Object Request
 *
 * Request data for the Version 1 Identity Object
 */
exports.IdentityObjectRequestV1 = t.type({
    idObjectRequest: t.type({
        value: IdRequestV1,
        v: t.number,
    })
});
/**
 * Identity Recovery Request
 *
 * Request data for the Version 1 Identity Object
 */
exports.IdentityRecoveryRequest = t.type({
    idRecoveryRequest: t.type({
        value: IdRecoveryRequest,
        v: t.number,
    })
});
exports.Attributes = (0, io_ts_extra_1.sparseType)({
    countryOfResidence: (0, io_ts_extra_1.optional)(t.string),
    dob: (0, io_ts_extra_1.optional)(t.string),
    firstName: (0, io_ts_extra_1.optional)(t.string),
    lastName: (0, io_ts_extra_1.optional)(t.string),
    idDocExpiresAt: (0, io_ts_extra_1.optional)(t.string),
    idDocIssuedAt: (0, io_ts_extra_1.optional)(t.string),
    idDocIssuer: (0, io_ts_extra_1.optional)(t.string),
    idDocNo: (0, io_ts_extra_1.optional)(t.string),
    idDocType: (0, io_ts_extra_1.optional)(t.string),
    nationalIdNo: (0, io_ts_extra_1.optional)(t.string),
    nationality: (0, io_ts_extra_1.optional)(t.string),
    sex: (0, io_ts_extra_1.optional)(t.string),
    taxIdNo: (0, io_ts_extra_1.optional)(t.string), //"DE987654321"
});
exports.AttributeList = t.type({
    chosenAttributes: exports.Attributes,
    createdAt: t.string,
    maxAccounts: t.number,
    validTo: t.string, //"202104"
});
/**
 * Version 0 Identity Object
 *
 */
exports.IdentityObject = t.type({
    v: t.number,
    value: t.type({
        preIdentityObject: IdRequest,
        attributeList: exports.AttributeList,
        signature: t.string
    })
});
/**
 * Version 1 Identity Object
 *
 */
exports.IdentityObjectV1 = t.type({
    v: t.number,
    value: t.type({
        preIdentityObject: IdRequestV1,
        attributeList: exports.AttributeList,
        signature: t.string
    })
});
/**
 * Anonymity Revocation Record
 */
exports.AnonymityRevocationRecord = t.type({
    v: t.number,
    value: t.type({
        idCredPub: t.string,
        arData: t.record(t.string, IpArDataObj),
        maxAccounts: t.number,
        revocationThreshold: t.number,
    })
});
/**
 * Initial account creation
 */
exports.InitialAccountRequestData = t.type({
    v: t.number,
    value: t.type({
        credential: t.type({
            type: t.string,
            contents: t.type({
                sig: t.string,
                regId: t.string,
                ipIdentity: t.number,
                credentialPublicKeys: t.type({
                    threshold: t.number,
                    keys: t.record(t.string, t.type({
                        schemeId: t.string,
                        verifyKey: t.string
                    }))
                }),
                policy: t.type({
                    validTo: t.string,
                    createdAt: t.string,
                    revealedAttributes: t.type({})
                })
            })
        }),
        messageExpiry: t.number
    })
});
/**
 * Data returned by the call to create_identity_object.
 */
exports.InitialAccountData = t.type({
    request: exports.InitialAccountRequestData,
    accountAddress: t.string
});
/**
 * Global context with cryptographic parameters.
 */
exports.GlobalContext = t.type({
    v: t.number,
    value: t.type({
        onChainCommitmentKey: t.string,
        bulletproofGenerators: t.string,
        genesisString: t.string
    })
});
