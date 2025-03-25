// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract CrowdFunding {
    struct Campaign {
        uint id;
        string name;
        string image;
        address owner;
        string description;
        uint deadline;
        uint donatedAmount;
        uint amount;
        address[] donors;
    }

    enum FieldTypes { 
        Name, 
        Description, 
        Image, 
        Deadline,
        Amount
    }

    uint currentCampaignId = 1;
    mapping(uint => Campaign) public campaigns;
    uint[] campaignIds;

    constructor() {
        Campaign memory testCampaign = Campaign({
            id: 1000,
            name: "Test Campaign",
            image: "https://via.placeholder.com/150",
            owner: msg.sender,
            description: "This is a test campaign",
            deadline: block.timestamp + 30 days,
            donatedAmount: 0,
            amount: 100,
            donors: new address[](0)
        });
        campaigns[1000] = testCampaign;
        campaignIds.push(1000);
    }

    event CampaignCreated(uint indexed campaignId, address campaignOwner, uint deadline, string imageUrl);
    event CampaignUpdated(uint indexed campaignId, address campaignOwner, uint deadline, string imageUrl);

    function getCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory results = new Campaign[](campaignIds.length);
        for (uint i = 0; i < campaignIds.length; i++) {
            uint campaignId = campaignIds[i];
            Campaign memory currentCampaign = campaigns[campaignId];
            require(currentCampaign.id != 0, "Campaign Not Found");

            results[i] = (currentCampaign);
        }

        return results;
    }

    function getDonors(uint _campaignId) external view returns(address[] memory) {
        Campaign memory campaign = campaigns[_campaignId];
        require(campaign.id != 0, "Campaign Not Found");
        return campaign.donors;
    }

    function createCampaigns(
        string memory _campaignName, 
        string memory _imageUrl, 
        address _ownerAddress,
        string memory _description,
        uint _deadline,
        uint _amount
    ) external {
        Campaign storage newCampaign = campaigns[currentCampaignId];
        newCampaign.id = currentCampaignId;
        newCampaign.name = _campaignName;
        newCampaign.image = _imageUrl;
        newCampaign.owner = _ownerAddress;
        newCampaign.description = _description;
        newCampaign.deadline = _deadline;
        newCampaign.amount = _amount;

        campaigns[currentCampaignId] = newCampaign;
        campaignIds.push(currentCampaignId);
        emit CampaignCreated(currentCampaignId, _ownerAddress, _deadline, _imageUrl);
        
        currentCampaignId++;
    }

    modifier isCampaignExist(uint _campaignId) {
        require(campaigns[_campaignId].id != 0, "Campaign not found");
        _;
    }

    modifier isCampaignOwner(uint _campaignId) {
        require(campaigns[_campaignId].owner == msg.sender, "Only campaign owner can update/delete his campaign");
        _;
    }

    function updateCampaigns(
        FieldTypes _field,
        uint _campaignId, 
        string memory _value
    ) external isCampaignExist(_campaignId) isCampaignOwner(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        if (_field == FieldTypes.Name) {
            campaign.name = _value;
        } else if (_field == FieldTypes.Description) {
            campaign.description = _value;
        } else if (_field == FieldTypes.Image) {
            campaign.image = _value;
        } else {
            revert("Invalid field specified");
        }
        
        emit CampaignUpdated(_campaignId, campaign.owner, campaign.deadline, campaign.image);
    }

    function deleteCampaigns(
        uint _campaignId
    ) external isCampaignExist(_campaignId) isCampaignOwner(_campaignId) {
        // remove from mapping
        delete campaigns[_campaignId];

        for (uint i = 0; i < campaignIds.length; i++) {
            if (campaignIds[i] == _campaignId) {
                // move last item to the index to be removed and pop the last element
                campaignIds[i] = campaignIds[campaignIds.length - 1];
                campaignIds.pop();
                break;
            }
        }
    }

    function donateToCampaign(
        uint _campaignId
    ) external payable isCampaignExist(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.value > 0, "Donated amount has to be more than 0");
        campaign.donatedAmount += msg.value;
        campaign.donors.push(msg.sender);
    }

    function getCampaignDetails(
        uint _campaignId
    ) external isCampaignExist(_campaignId) view returns (Campaign memory) {
        return campaigns[_campaignId];
    }
}