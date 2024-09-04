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
      }
    ]
  };