/**
 *
 * @param encryptedKey
 * @param keyIdArn The Amazon Resource Name (ARN) of the CMK that was used to decrypt the data.
 */
export declare function getIpPrivateKeyForAWSKMS(encryptedKey: string, keyIdArn: string): () => Promise<string>;
