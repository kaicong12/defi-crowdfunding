const mockCampaigns = [
    {
      id: 1,
      name: "Save the Amazon Rainforest",
      image: "https://tse2.mm.bing.net/th/id/OIP.EMKPyLhA3WLGVdJmZ9lYbAHaEK?w=285&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      description: "Help us protect the Amazon Rainforest and its biodiversity.",
      deadline: 1718208000, // Unix timestamp for some future date
      donatedAmount: 1.5, // In ETH
      amount: 10, // Goal in ETH
      donors: ["0xabcdefabcdefabcdefabcdefabcdefabcdef", "0x9876543210abcdef9876543210abcdef98765432"],
    },
    {
      id: 2,
      name: "Education for Underprivileged Kids",
      image: "https://tse1.mm.bing.net/th/id/OIP.o6VCCmtuYJ1frMUGt4BvKwHaE8?w=239&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
      owner: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
      description: "Providing education for children in rural areas.",
      deadline: 1720992000, // Unix timestamp
      donatedAmount: 2.3, // In ETH
      amount: 5, // Goal in ETH
      donors: ["0x1234567890abcdef1234567890abcdef12345678"],
    },
    {
      id: 3,
      name: "Medical Aid for Refugees",
      image: "https://tse4.mm.bing.net/th/id/OIP.ptLsHWQTQBi4dwcvjRDiSwHaEI?w=292&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
      owner: "0x9876543210abcdef9876543210abcdef98765432",
      description: "Fund medical aid for displaced families in crisis zones.",
      deadline: 1723680000,
      donatedAmount: 0.8,
      amount: 3,
      donors: ["0xabcdefabcdefabcdefabcdefabcdefabcdef"],
    },
    {
      id: 4,
      name: "Clean Water Initiative",
      image: "https://tse2.mm.bing.net/th/id/OIP.aGL2rxhOJ_3yFSHyDm1GQgHaHa?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
      owner: "0x1111222233334444555566667777888899990000",
      description: "Help build clean water wells in remote communities.",
      deadline: 1726377600,
      donatedAmount: 4.2,
      amount: 6,
      donors: ["0xabcdefabcdefabcdefabcdefabcdefabcdef", "0x9876543210abcdef9876543210abcdef98765432"],
    },
  ];
  
  export default mockCampaigns;
  