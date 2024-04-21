export const  generateTokenWithAddress = (walletAddress)  => {
    if (typeof walletAddress !== 'string') {
        throw new Error('Input must be a string representing a wallet address');
    }

    const firstTwo = walletAddress.substring(0, 2);
    const lastSix = walletAddress.substring(walletAddress.length - 6);

    const concatenatedParts = firstTwo + lastSix;

    return concatenatedParts;
}


