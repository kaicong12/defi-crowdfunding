// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CrowdFundingModule = buildModule("CrowdFundingModule", (m) => {
  const crowdFunding = m.contract("CrowdFunding", []);

  return { crowdFunding };
});

export default CrowdFundingModule;
