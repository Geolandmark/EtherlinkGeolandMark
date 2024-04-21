// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

contract AssetRegistry {
    struct OwnerInformation {
        uint256 id;
        string fullName;
        string sex;
        string mobileNumber;
        string emailAddress;
        string country;
        bool initialized;
    }

    struct ParcelInformation {
        address owner;
        uint256 parcelId;
        string datePinned;
        string ipfsHash;
        bool isVerify;
        string assetUrl;
    }

    ParcelInformation[] public parcels;
    mapping(address => ParcelInformation[]) public userParcels;
    mapping(address => OwnerInformation) public walletInformation;

    uint256 public ownerIdCounter;
    uint256 public parcelDocumentsCounter;

    uint256 public editCost = 100000000000000 wei;

    event OwnerInformationSaved(
        address indexed ownerAddress,
        uint256 indexed ownerId,
        string title,
        string fullName
    );

    function saveWalletInformation(
        address _address,
        string memory _fullName,
        string memory _sex,
        string memory _emailAddress,
        string memory _mobileNumber,
        string memory _country
    ) public {
        require(
            !walletInformation[_address].initialized,
            "Owner profile already exists"
        );

        ownerIdCounter++;

        OwnerInformation memory owner = OwnerInformation({
            id: ownerIdCounter,
            fullName: _fullName,
            sex: _sex,
            mobileNumber: _mobileNumber,
            emailAddress: _emailAddress,
            country: _country,
            initialized: true
        });

        walletInformation[_address] = owner;

        emit OwnerInformationSaved(
            _address,
            ownerIdCounter,
            _fullName,
            _emailAddress
        );
    }

      function getOwnerInformation(
        address _address
    ) public view returns (OwnerInformation memory) {
        return walletInformation[_address];
    }

    function saveParcelInformation(
        address _owner,
        uint256 _parcelId,
        string memory _datePinned,
        string memory _ipfsHash,
        bool _isVerify,
        string memory _assetUrl
    ) public {

        parcelDocumentsCounter++;

        ParcelInformation memory parcel = ParcelInformation({
            owner: _owner,
            parcelId: _parcelId,
            datePinned: _datePinned,
            ipfsHash: _ipfsHash,
            isVerify: _isVerify,
            assetUrl: _assetUrl
        });

        parcels.push(parcel);
        userParcels[_owner].push(parcel);
    }

    function getOwnerParcels(
        address _owner
    ) public view returns (ParcelInformation[] memory) {
        return userParcels[_owner];
    }

        function getAllParcels() public view returns (string[] memory) {
        string[] memory ipfsHashes = new string[](parcels.length);

        for (uint256 i = 0; i < parcels.length; i++) {
            ipfsHashes[i] = parcels[i].ipfsHash;
        }

        return ipfsHashes;
    }


    function getSingleParcelIpfsHash(
        address _owner,
        uint256 _parcelId
    ) public view returns (string memory) {
        ParcelInformation[] storage ownerParcels = userParcels[_owner];

        for (uint256 i = 0; i < ownerParcels.length; i++) {
            if (ownerParcels[i].parcelId == _parcelId) {
                return ownerParcels[i].ipfsHash;
            }
        }

        revert("Parcel not found for the specified owner and parcel ID");
    }

    function getParcelById(
        uint256 _parcelId
    ) public view returns (ParcelInformation memory) {
        require(_parcelId < parcels.length, "Parcel ID does not exist");
        return parcels[_parcelId];
    }

    function getParcelByParcelId(
        address _owner,
        uint256 _parcelId
    ) public view returns (ParcelInformation memory) {
        ParcelInformation[] storage ownerParcels = userParcels[_owner];
        for (uint256 i = 0; i < ownerParcels.length; i++) {
            if (ownerParcels[i].parcelId == _parcelId) {
                return ownerParcels[i];
            }
        }
        revert("Parcel not found");
    }

    function editParcelInformation(
        uint256 _id,
        string memory _datePinned,
        string memory _ipfsHash,
        bool _isVerify,
        string memory _assetUrl
    ) public payable {
        require(_id < parcels.length, "Parcel ID does not exist");
        ParcelInformation storage parcel = parcels[_id];

        require(msg.value >= editCost + gasleft(), "Insufficient funds");

        payable(msg.sender).transfer(editCost);

        parcel.datePinned = _datePinned;
        parcel.ipfsHash = _ipfsHash;
        parcel.isVerify = _isVerify;
        parcel.assetUrl = _assetUrl;
    }

    function withdrawEther() public {
        address payable contractOwner = payable(msg.sender);
        contractOwner.transfer(address(this).balance);
    }

    receive() external payable {}

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
