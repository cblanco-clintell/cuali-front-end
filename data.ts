export const studyDetails = {
  studyName: "iPhone Testing",
  studyBrief:
    "This study is conducted by Clintell Technology to analyze with the company Topes de Gama their opinions on the new iPhone 15.",
  generalConclusion:
    "The overall study found that the new iPhone 15 excels in camera quality and battery life but presents some challenges in usability for non-technical users.",
  objectives: [
    {
      id: 1,
      title: "Evaluate video recording quality",
      generalConclusion:
        "The video recording quality was found to be superior in well-lit environments but struggled in low-light scenarios.",
      insights: [
        "Stabilization during movement was highly praised.",
        "Users felt the autofocus feature was too slow in darker environments.",
        "4K video quality was appreciated, but the file size was a concern."
      ],
      actions: [
        "Promote the camera's stabilization features for content creators.",
        "Improve autofocus in low-light conditions in future updates.",
        "Offer tips on managing large file sizes for 4K recordings."
      ],
      groupSpecific: [
        {
          groupName: "Group 1: Tech enthusiasts",
          conclusion:
            "This group praised the 60 FPS recording but found issues with stabilization in fast-moving sports recordings.",
          insights: [
            "Tech enthusiasts love high frame rates for fast actions.",
            "They expect stabilization to work even under extreme conditions.",
            "Low-light performance was a concern when using advanced modes."
          ],
          actions: [
            "Highlight 60 FPS recording in promotional materials for this group.",
            "Promote external stabilizers to improve sports recording.",
            "Address low-light performance in future updates."
          ],
        },
        {
          groupName: "Group 2: Casual users",
          conclusion:
            "This group found video quality in outdoor environments to be excellent but struggled with the complexity of the recording software.",
          insights: [
            "Casual users value simplicity over advanced features.",
            "They were pleased with the quality but found settings difficult to navigate.",
            "Outdoor footage was highly appreciated, especially with good lighting."
          ],
          actions: [
            "Simplify the recording interface or offer a 'basic mode'.",
            "Create tutorial content to help users make the most of the video features.",
            "Focus marketing on outdoor video performance for this group."
          ],
        },
        {
          groupName: "Group 3: Professional videographers",
          conclusion:
            "Professional videographers praised the detail in 4K recording but noted overheating issues during long recording sessions.",
          insights: [
            "Professionals prioritize video detail and high resolution.",
            "They found the device overheated during extended 4K recording sessions.",
            "The bitrate and storage requirements were limiting for long projects."
          ],
          actions: [
            "Emphasize 4K recording capabilities for short projects.",
            "Address overheating in long recording sessions with future firmware updates.",
            "Recommend external storage solutions to handle large file sizes."
          ],
        },
      ]
    },
    {
      id: 2,
      title: "Compare battery duration vs. previous models",
      generalConclusion:
        "The battery lasted 20% longer in heavy-use scenarios, which was appreciated by users.",
      insights: [
        "Battery improvements were noticeable for users upgrading from older models.",
        "Users noticed a significant decrease in battery drain during video recording.",
        "Most users felt the device could still be more energy-efficient during gaming."
      ],
      actions: [
        "Promote battery life improvements in marketing, especially for heavy users.",
        "Optimize the device further for gaming to reduce battery drain.",
        "Encourage users to leverage low-power modes during extended usage."
      ],
      groupSpecific: [
        {
          groupName: "Group 1: Tech enthusiasts",
          conclusion:
            "Battery performance was a key upgrade for this group compared to the iPhone 14.",
          insights: [
            "This group appreciated the power efficiency improvements.",
            "Battery life during gaming was a concern, especially for power-hungry apps.",
            "They noticed that the phone managed background apps better than previous models."
          ],
          actions: [
            "Highlight battery life during intense tasks like gaming for this group.",
            "Explore further optimizations for gaming sessions in the next update.",
            "Continue focusing on efficient background app management."
          ],
        },
        {
          groupName: "Group 2: Casual users",
          conclusion:
            "This group appreciated the longer battery but didn’t notice a drastic change compared to their iPhone 13.",
          insights: [
            "Casual users were pleased but expected even more significant battery gains.",
            "They didn’t use power-hungry apps, so battery improvements weren’t as apparent.",
            "Battery duration during normal day-to-day use was satisfactory."
          ],
          actions: [
            "Promote the battery life to this group with real-life use case comparisons.",
            "Develop content showing battery improvement vs. older models.",
            "Focus on ease-of-use improvements for casual users in marketing."
          ],
        },
        {
          groupName: "Group 3: Professional videographers",
          conclusion:
            "Professional videographers found the battery lasted longer during video shoots but had concerns over fast-charging speeds.",
          insights: [
            "Battery life during high-quality 4K video shoots was better than previous models.",
            "However, they needed faster charging to accommodate long days of shooting.",
            "Battery drained faster when using external accessories like microphones."
          ],
          actions: [
            "Promote longer battery life during professional video work.",
            "Investigate faster charging options to support long shooting days.",
            "Encourage users to carry portable chargers for long sessions."
          ],
        },
      ]
    },
    {
      id: 3,
      title: "Assess camera performance in low-light conditions",
      generalConclusion:
        "Users were impressed with the night mode, but many felt that image quality suffered from noise in extremely dark environments.",
      insights: [
        "Night mode received high praise for moderately low-light scenarios.",
        "In very dark environments, users experienced grainy images.",
        "The automatic switching between modes sometimes led to inconsistent results."
      ],
      actions: [
        "Improve noise reduction in extreme low-light conditions.",
        "Promote the strengths of night mode in moderately low-light scenarios.",
        "Provide more manual control for users to fine-tune settings in low-light."
      ],
      groupSpecific: [
        {
          groupName: "Group 1: Tech enthusiasts",
          conclusion:
            "Tech enthusiasts appreciated the night mode but wanted more manual control over the settings.",
          insights: [
            "They found the mode-switching automatic, but preferred manual options.",
            "Low-light performance was better than expected but not perfect.",
            "Tech users found the UI for manual controls could be improved."
          ],
          actions: [
            "Offer a pro-mode for night photography enthusiasts.",
            "Highlight the improved low-light performance, but manage expectations for extreme darkness.",
            "Refine the manual control interface to make it more accessible."
          ],
        },
        {
          groupName: "Group 2: Casual users",
          conclusion:
            "Casual users appreciated the ease of night mode but found results inconsistent in very dark situations.",
          insights: [
            "They were pleased with night mode for social and family events.",
            "However, they found it difficult to take good photos in pitch-black environments.",
            "Casual users preferred fully automated modes with little interference."
          ],
          actions: [
            "Simplify the night mode UI for a more streamlined experience.",
            "Promote the ease of use in night mode for capturing social moments.",
            "Provide tips for getting the best results in darker environments."
          ],
        },
        {
          groupName: "Group 3: Professional photographers",
          conclusion:
            "Professional photographers appreciated the improvements but still found low-light performance inferior to DSLRs in very dark conditions.",
          insights: [
            "Night mode was considered a major improvement but had limitations.",
            "Professionals felt the noise in images was still too high.",
            "They appreciated the option to manually adjust ISO and shutter speed."
          ],
          actions: [
            "Position night mode as a supplementary feature for professionals.",
            "Continue improving low-light capabilities to narrow the gap with DSLRs.",
            "Promote the manual control options for advanced users."
          ],
        },
      ]
    },
    {
      id: 4,
      title: "Evaluate device performance during gaming",
      generalConclusion:
        "The iPhone 15 performed well with most mobile games, though heavy gaming caused some overheating and reduced battery life.",
      insights: [
        "Gamers appreciated the smooth frame rates in high-performance games.",
        "Overheating was a common issue during extended gaming sessions.",
        "Most users felt the battery drained too quickly during heavy gaming."
      ],
      actions: [
        "Optimize the cooling system to reduce overheating during gaming.",
        "Promote the smooth performance in high-demand mobile games.",
        "Further optimize power consumption for heavy gaming use cases."
      ],
      groupSpecific: [
        {
          groupName: "Group 1: Tech enthusiasts",
          conclusion:
            "Tech enthusiasts enjoyed the gaming performance but were concerned about the overheating issue.",
          insights: [
            "They praised the smooth gameplay but wanted better heat management.",
            "The overheating caused noticeable discomfort during long gaming sessions.",
            "They expected the device to maintain optimal performance without thermal throttling."
          ],
          actions: [
            "Improve the cooling system for tech enthusiasts.",
            "Promote the device's ability to handle resource-heavy games with minimal lag.",
            "Address the overheating issue through firmware updates."
          ],
        },
        {
          groupName: "Group 2: Casual users",
          conclusion:
            "Casual users found the gaming performance to be satisfactory but noticed some overheating and battery drain.",
          insights: [
            "They enjoyed playing casual games without any major issues.",
            "Overheating and battery drain were noticeable during longer gaming sessions.",
            "Casual users expected better heat dissipation and longer battery life."
          ],
          actions: [
            "Optimize the cooling system to reduce overheating for casual users.",
            "Promote the device's ability to handle casual games smoothly.",
            "Investigate ways to improve battery life during gaming sessions."
          ],
        },
        {
          groupName: "Group 3: Professional gamers",
          conclusion:
            "Professional gamers appreciated the performance but had concerns about overheating and battery drain during intense gaming sessions.",
          insights: [
            "They praised the device's performance in high-demand games.",
            "Overheating and battery drain were significant issues during extended gaming sessions.",
            "Professional gamers expected better heat dissipation and longer battery life."
          ],
          actions: [
            "Develop a gaming-focused cooling system for professional gamers.",
            "Promote the device's ability to handle resource-intensive games without performance degradation.",
            "Investigate ways to improve battery life during intense gaming sessions."
          ],
        },
      ]
    },
  ],
};

export const categories = [
  {
    name: "Camera Performance",
    sentiment: "positive",
    value: 7.2,
    keywords: [
      { name: "4K", sentiment: "positive", value: 8.0 },
      { name: "HDR", sentiment: "positive", value: 7.5 },
      { name: "Nightography", sentiment: "neutral", value: 6.0 },
      { name: "Low Light", sentiment: "negative", value: 4.5 },
      { name: "Stabilization", sentiment: "positive", value: 8.2 },
      { name: "Autofocus", sentiment: "neutral", value: 6.7 },
      { name: "Exposure", sentiment: "positive", value: 7.3 },
      { name: "Shutter Speed", sentiment: "neutral", value: 6.2 },
      { name: "Grainy", sentiment: "negative", value: 3.8 },
      { name: "Wide Angle", sentiment: "positive", value: 8.1 },
      { name: "Portrait Mode", sentiment: "neutral", value: 6.9 },
      { name: "Zoom", sentiment: "negative", value: 4.3 },
      { name: "Color Balance", sentiment: "positive", value: 7.9 },
      { name: "Dynamic Range", sentiment: "neutral", value: 6.4 },
      { name: "Sharpness", sentiment: "positive", value: 7.6 },
    ],
  },
  {
    name: "Battery Life",
    sentiment: "neutral",
    value: 6.8,
    keywords: [
      { name: "Fast Charging", sentiment: "positive", value: 2.2 },
      { name: "Overheating", sentiment: "negative", value: 4.2 },
      { name: "Battery Duration", sentiment: "neutral", value: 3.5 },
      { name: "Standby Time", sentiment: "positive", value: 7.8 },
      { name: "Power Saving Mode", sentiment: "positive", value: 7.3 },
      { name: "Wireless Charging", sentiment: "neutral", value: 6.0 },
      { name: "Charge Cycles", sentiment: "negative", value: 4.9 },
      { name: "Heat Dissipation", sentiment: "negative", value: 3.8 },
      { name: "Discharge Rate", sentiment: "neutral", value: 5.9 },
      { name: "Battery Health", sentiment: "positive", value: 7.6 },
      { name: "Charging Port", sentiment: "neutral", value: 6.4 },
      { name: "Charger Compatibility", sentiment: "positive", value: 7.1 },
      { name: "Battery Swelling", sentiment: "negative", value: 3.4 },
      { name: "Fast Drain", sentiment: "negative", value: 4.5 },
      { name: "Battery Indicator", sentiment: "neutral", value: 6.2 },
    ],
  },
  {
    name: "Display Quality",
    sentiment: "negative",
    value: 5.5,
    keywords: [
      { name: "Brightness", sentiment: "positive", value: 7.0 },
      { name: "Resolution", sentiment: "neutral", value: 6.0 },
      { name: "Color Accuracy", sentiment: "negative", value: 4.8 },
      { name: "Refresh Rate", sentiment: "positive", value: 8.0 },
      { name: "Screen Flicker", sentiment: "negative", value: 4.1 },
      { name: "Viewing Angles", sentiment: "neutral", value: 5.9 },
      { name: "Pixel Density", sentiment: "positive", value: 7.9 },
      { name: "Screen Durability", sentiment: "neutral", value: 6.3 },
      { name: "Touch Responsiveness", sentiment: "positive", value: 7.7 },
      { name: "Edge Bleeding", sentiment: "negative", value: 3.5 },
      { name: "Blue Light Filter", sentiment: "positive", value: 7.1 },
      { name: "Anti-Glare", sentiment: "neutral", value: 6.5 },
      { name: "Contrast Ratio", sentiment: "positive", value: 7.4 },
      { name: "Backlight Uniformity", sentiment: "negative", value: 4.3 },
      { name: "OLED Burn-In", sentiment: "negative", value: 3.9 },
    ],
  },
];

export const conversationExcerpts = [
  {
    id: 1,
    group: "Review Google Pixel 8",
    text: "The 4K performance in daylight is excellent...",
    keywords: ["4K"],
  },
  {
    id: 2,
    group: "Review iPhone 14",
    text: "Nightography has improved significantly...",
    keywords: ["Nightography"],
  },
  {
    id: 3,
    group: "Battery Life Review",
    text: "Fast charging works well, but overheating happens sometimes...",
    keywords: ["Fast Charging", "Overheating"],
  }
];