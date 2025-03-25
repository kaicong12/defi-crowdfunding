import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrowdFunding Contract", function () {
    async function deployCrowdFundingFixture() {
        const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
        const [owner, addr1, addr2] = await ethers.getSigners();
        const crowdFunding = await CrowdFunding.deploy();
        // await crowdFunding.deployed();

        return { crowdFunding, owner, addr1, addr2 };
    }

    describe("Campaign Management", function () {
        it("Should create a new campaign", async function () {
            const { crowdFunding, owner } = await loadFixture(deployCrowdFundingFixture);

            await crowdFunding.createCampaigns(
                "Campaign 1",
                "https://example.com/image1.png",
                owner.address,
                "Description 1",
                Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
                ethers.parseEther("10")
            );

            const campaigns = await crowdFunding.getCampaigns();
            expect(campaigns.length).to.equal(2); // Includes the test campaign from the constructor
            expect(campaigns[0].name).to.equal("Test Campaign");
            expect(campaigns[1].name).to.equal("Campaign 1");
        });

        it("Should allow the owner to update a campaign", async function () {
            const { crowdFunding } = await loadFixture(deployCrowdFundingFixture);

            await crowdFunding.updateCampaigns(0, 1000, "Updated Campaign Name"); // FieldTypes.Name = 0

            const campaign = await crowdFunding.getCampaignDetails(1000);
            expect(campaign.name).to.equal("Updated Campaign Name");
        });

        it("Should not allow non-owners to update a campaign", async function () {
            const { crowdFunding, addr1 } = await loadFixture(deployCrowdFundingFixture);

            await expect(
                crowdFunding.connect(addr1).updateCampaigns(0, 1000, "Hacked Campaign Name")
            ).to.be.revertedWith("Only campaign owner can update/delete his campaign");
        });

        it("Should allow the owner to delete a campaign", async function () {
            const { crowdFunding } = await loadFixture(deployCrowdFundingFixture);

            await crowdFunding.deleteCampaigns(1000);

            const campaigns = await crowdFunding.getCampaigns();
            expect(campaigns.length).to.equal(0); // Only the test campaign existed initially
        });

        it("Should not allow non-owners to delete a campaign", async function () {
            const { crowdFunding, addr1 } = await loadFixture(deployCrowdFundingFixture);

            await expect(
                crowdFunding.connect(addr1).deleteCampaigns(1000)
            ).to.be.revertedWith("Only campaign owner can update/delete his campaign");
        });
    });

    describe("Donations", function () {
        it("Should allow donations to a campaign", async function () {
            const { crowdFunding, addr1 } = await loadFixture(deployCrowdFundingFixture);

            await crowdFunding.connect(addr1).donateToCampaign(1000, { value: ethers.parseEther("1") });

            const campaign = await crowdFunding.getCampaignDetails(1000);
            expect(campaign.donatedAmount).to.equal(ethers.parseEther("1"));
            expect(campaign.donors.length).to.equal(1);
            expect(campaign.donors[0]).to.equal(addr1.address);
        });

        it("Should retrieve donors for a campaign", async function () {
            const { crowdFunding, addr1, addr2 } = await loadFixture(deployCrowdFundingFixture);

            await crowdFunding.connect(addr1).donateToCampaign(1000, { value: ethers.parseEther("1") });
            await crowdFunding.connect(addr2).donateToCampaign(1000, { value: ethers.parseEther("2") });

            const donors = await crowdFunding.getDonors(1000);
            expect(donors.length).to.equal(2);
            expect(donors).to.include(addr1.address);
            expect(donors).to.include(addr2.address);
        });
    });

    describe("Error Handling", function () {
        it("Should revert if trying to access a non-existent campaign", async function () {
            const { crowdFunding } = await loadFixture(deployCrowdFundingFixture);

            await expect(crowdFunding.getCampaignDetails(9999)).to.be.revertedWith("Campaign not found");
        });
    });
});
