import * as t from 'io-ts'
import { sparseType, optional } from 'io-ts-extra'

/**
 * Identity Provider Information
 * 
 * Information about the identity issuer.
 */
export const IdentityProviderInfo = t.type({
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
export type IdentityProviderInfo = t.TypeOf<typeof IdentityProviderInfo> 

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
})

export const AnonimityRevokersInfo = t.type({
    v: t.number,
    value: t.record(t.string, AnonimityRevokerInfo)
})
export type AnonimityRevokersInfo = t.TypeOf<typeof AnonimityRevokersInfo> 

const IpArDataObj= t.type({
    proofComEncEq: t.string,
    encPrfKeyShare: t.string,
})

const IdRequest= t.type({
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
})


const IdRequestV1= t.type({
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
})

const IdRecoveryRequest= t.type({
    idCredPub: t.string,
    proof: t.string,
    timestamp: t.number,
})

/**
 * Version 0 Identity Object Request
 * 
 * Request data for the Version 0 Identity Object
 */
 export const IdentityObjectRequest = t.type({
    idObjectRequest: t.type({
        value: IdRequest,
        v: t.number,
    })
});
export type IdentityObjectRequest = t.TypeOf<typeof IdentityObjectRequest>


/**
 * Version 1 Identity Object Request
 *
 * Request data for the Version 1 Identity Object
 */
 export const IdentityObjectRequestV1 = t.type({
    idObjectRequest: t.type({
        value: IdRequestV1,
        v: t.number,
    })
});
export type IdentityObjectRequestV1 = t.TypeOf<typeof IdentityObjectRequestV1>


/**
 * Identity Recovery Request
 *
 * Request data for the Version 1 Identity Object
 */
 export const IdentityRecoveryRequest = t.type({
    idRecoveryRequest: t.type({
        value: IdRecoveryRequest,
        v: t.number,
    })
});
export type IdentityRecoveryRequest = t.TypeOf<typeof IdentityRecoveryRequest>

export const Attributes =  sparseType({
    countryOfResidence: optional(t.string), //"DE"
    dob: optional(t.string), //"19800229"
    firstName: optional(t.string) ,//"John"
    lastName: optional(t.string), //"Doe"
    idDocExpiresAt: optional(t.string), //"20291231"
    idDocIssuedAt: optional(t.string), //"20200401"
    idDocIssuer: optional(t.string), //"DK",
    idDocNo: optional(t.string), //"1234567890",
    idDocType: optional(t.string), //"1",
    nationalIdNo: optional(t.string), //"DK123456789",
    nationality: optional(t.string), //"DK",
    sex: optional(t.string), //"1",
    taxIdNo: optional(t.string), //"DE987654321"
  })

export type Attributes = t.TypeOf<typeof Attributes>

export const AttributeList = t.type({
    chosenAttributes: Attributes,
    createdAt:  t.string, //"202004",
    maxAccounts: t.number, //238,
    validTo:  t.string, //"202104"
});
export type AttributeList = t.TypeOf<typeof AttributeList>


/**
 * Version 0 Identity Object
 * 
 */
 export const IdentityObject = t.type({
    v: t.number,
    value: t.type({
        preIdentityObject: IdRequest,
        attributeList: AttributeList,
        signature: t.string
    })
});
export type IdentityObject = t.TypeOf<typeof IdentityObject>

/**
 * Version 1 Identity Object
 * 
 */
 export const IdentityObjectV1 = t.type({
    v: t.number,
    value: t.type({
        preIdentityObject: IdRequestV1,
        attributeList: AttributeList,
        signature: t.string
    })
});
export type IdentityObjectV1 = t.TypeOf<typeof IdentityObjectV1>


/**
 * Anonymity Revocation Record
 */
    export const AnonymityRevocationRecord = t.type({
        v: t.number,
        value: t.type({
            idCredPub: t.string,
            arData: t.record(t.string, IpArDataObj),
            maxAccounts: t.number,
            revocationThreshold: t.number,
        })
});
export type AnonymityRevocationRecord = t.TypeOf<typeof AnonymityRevocationRecord>

/** 
 * Initial account creation
 */
export const InitialAccountRequestData = t.type({
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
})

export type InitialAccountRequestData = t.TypeOf<typeof InitialAccountRequestData>

/**
 * Data returned by the call to create_identity_object.
 */
export const InitialAccountData = t.type({
    request: InitialAccountRequestData,
    accountAddress: t.string
})

export type InitialAccountData = t.TypeOf<typeof InitialAccountData>


/** 
 * Global context with cryptographic parameters.
 */
export const GlobalContext = t.type({
    v: t.number,
    value: t.type({
        onChainCommitmentKey: t.string,
        bulletproofGenerators: t.string,
        genesisString: t.string
    })
})

export type GlobalContext = t.TypeOf<typeof GlobalContext>
