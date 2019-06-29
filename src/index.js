const rand = require('brorand')
const elliptic = require('elliptic/lib/elliptic/ec/index')
const utils = require('minimalistic-crypto-utils')
const bip39 = require('bip39')

const VERSION_MASK = 192
const CURVE_MASK = 48
const CURVE_MASKS = {
    secp256k1: 0,
    p384: 16,
    sect283k1: 32,
    p521: 48
}
const EC = {
    secp256k1: new elliptic('secp256k1'),
    p384: new elliptic('p384'),
    p521: new elliptic('p521')
}

export function generateKey(curve) {

    if(!CURVE_MASKS.hasOwnProperty(curve)) {
        throw new Error('Curve not supported')
    }

    /* First generate 192 bits of entropy with whatever library is useful */
    const entropy = rand(24) // 24 bytes == 192 bits

    /* Modify the first byte to indicate which curve we use. This removes 4 bits of entropy */
    entropy[0] = ( entropy[0] & ( ( VERSION_MASK | CURVE_MASK ) ^ 255 ) ) | CURVE_MASKS[curve]

    /* Generate the mnemonic from the entropy */
    const mnemonic = bip39.entropyToMnemonic(entropy)

    let private_key = null

    if(EC.hasOwnProperty(curve)) {
        const key = EC[curve].genKeyPair({
            entropy: utils.toHex(entropy),
            entropyEnc: 'hex'
        })
        private_key = utils.toHex(key.getPrivate().toArray())
    }

    return [mnemonic, private_key]
}

export function keyFromMnemonic(mnemonic) {

    /* Mnemonic must be 18 words */
    if(mnemonic.trim().split(/\s+/g).length != 18) {
        throw new Error('Invalid word length')
    }

    /* Convert mnemonic to entropy */
    const entropy = utils.toArray(bip39.mnemonicToEntropy(mnemonic), 'hex')

    /* Version must be zero */
    if(( entropy[0] & VERSION_MASK ) != 0) {
        throw new Error('Invalid mnemonic version')
    }

    /* Bitwise and to get the curve id */
    const curve_id = entropy[0] & CURVE_MASK
    let curve = null

    /* Loop to find the curve name */
    for(let curve_name in CURVE_MASKS) {
        if(CURVE_MASKS.hasOwnProperty(curve_name) && CURVE_MASKS[curve_name] == curve_id) {
            curve = curve_name
            break
        }
    }

    /* This should never be null, since there are two bits for curve id and four curves */
    if(curve == null) {
        throw new Error('Invalid curve')
    }

    let private_key = null

    if(EC.hasOwnProperty(curve)) {
        const key = EC[curve].genKeyPair({
            entropy: utils.toHex(entropy),
            entropyEnc: 'hex'
        })
        private_key = utils.toHex(key.getPrivate().toArray())
    }

    return [curve, private_key]

}
