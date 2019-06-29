const { generateKey, keyFromMnemonic } = require('../dist/lib.node')

const CURVES = ['secp256k1', 'p384', 'sect283k1', 'p521']

for(const curve_name of CURVES) {
    let newlyGeneratedKey = generateKey(curve_name)
    let restoredKey = keyFromMnemonic(newlyGeneratedKey[0])
    console.log('Test curve:', curve_name)
    console.log(newlyGeneratedKey)
    console.log(restoredKey)
    if(newlyGeneratedKey[1] == restoredKey[1]) {
        console.log('Passed')
    } else {
        console.log('Failed')
    }
    console.log('\n')
}
