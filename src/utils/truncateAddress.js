export function truncateWalletAddress(address) {
    if (typeof address !== 'string' || address.length <= 12) {
      return address; 
    }
  
    const firstThree = address.substring(0, 3); 
    const lastThree = address.substring(address.length - 3); 
  

    const truncatedAddress = `${firstThree}...........${lastThree}`;
  
    return truncatedAddress;
  }
  
  