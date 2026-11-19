/* ==========================================================================
   SITE CONTENT — this is the only file you need to edit to change the site.
   Everything on the three pages (home, all projects, single project) is
   generated from the two objects below.
   ========================================================================== */

window.SITE = {
  name: "Domas Prokofjovas",
  role: "Game Programmer",
  location: "",

  // Short description of yourself (home page). One string per paragraph.
  bio: [
    "I am a Game Programmer, experienced with C# and C++. Worked mainly with Unity and Unreal Engine. Enjoy implementing gameplay, but have dabbled with a bit of everything.",
  ],

  // Portrait shown next to the intro. "" hides it.
  photo: "assets/img/profile.jpg",

  // Short facts listed under the intro. Add, remove or rename rows freely.
  facts: [
    { label: "Engines", value: "Unity, Unreal Engine" },
    { label: "Languages", value: "C#, C++" },
    { label: "Focus", value: "Gameplay" },
    { label: "Education", value: "Game Programming, Futuregames" },
  ],

  // Optional status line under the facts. Set text to "" to hide it.
  status: { available: true, text: "" },

  // Intro text on the "All projects" page.
  projectsIntro:
    "The game projects I have been a part of and the many lessons I experienced during my Game Programming education at Futuregames.",

  // Footer / contact section.
  contactTitle: "Get in touch",
  contactText: "Thank you for looking through my portfolio, I hope we can work someday in the future!",

  // Contact links. Leave any of them as "" to hide that button everywhere.
  links: {
    linkedin: "https://www.linkedin.com/in/domas-prokofjovas/",
    github: "https://github.com/domas85",
    itch: "https://domas85.itch.io/",
    email: "domasp2002@gmail.com",
  },

  // CV / résumé PDF, opened from the "CV" button in the footer. "" hides the button.
  resume: "assets/Domas-Prokofjovas-CV.pdf",
};

/* --------------------------------------------------------------------------
   PROJECTS
   - id            unique, URL-safe. The project page is project.html?id=<id>
   - featured      true on the three projects to highlight on the home page
   - cover         image path (cards crop it to 16:9). Leave "" for a generated
                   placeholder tinted with `hue` (0-360).
   - coverPosition optional CSS object-position for the crop, e.g. "50% 20%"
   - video         optional YouTube video id, shown at the top of the project page
   - links         any of: itch, github, steam, trailer, website. Omit or "" to hide.
   - highlights    "My contributions": each has a title and a list of blocks, where
                   a block is a string (paragraph),
                   { images: [{ src, alt }], columns: 2 }  or
                   { code: "assets/code/…/File.cpp" }  (a real source file, shown on demand)
   - takeaways     bullet list at the end of the project page
   - gallery       optional extra screenshots: [{ src, alt }]
   The order here is the order used on the site.
   -------------------------------------------------------------------------- */

window.PROJECTS = [
  {
    id: "project-liminal",
    title: "Project Liminal",
    tagline:
      "In a multiplayer co-op experience you stumble yourself in a Liminal art gallery. Traverse multiple rooms, communicate with each other and solve deceptive anomalies. But be careful, you are not alone...",
    featured: true,
    tags: ["Unreal Engine", "Multiplayer", "Gameplay"],
    context: "Futuregames, Game Project 4",
    engine: "Unreal Engine",
    role: "Game Programmer",
    team: "8 people",
    duration: "4 weeks",
    cover: "assets/img/project-liminal/cover.jpg",
    coverPosition: "50% 10%",
    hue: 30,
    video: "n-CLQhPSjEc",
    links: {
      itch: "https://futuregames.itch.io/projectliminal",
    },
    overview: [
      "As the last Game Project in Futuregames we only had 4 weeks to develop a playable multiplayer game. And to achieve it with a small team we had to cover multiple areas. The big perk of this project is that everyone in the team was all on site, so we had no issues communicating.",
      "The theme was \"Replayability\" and the main premise for our game is that when you enter a room, paintings randomly spawn, but you might see a slightly different version of the painting compared to your partners, so you have to communicate to determine if it is an anomaly or not.",
    ],
    highlights: [
      {
        title: "Painting Spawn Manager",
        blocks: [
          { images: [{ src: "assets/img/project-liminal/painting.png", alt: "Paintings spawned in a gallery room" }] },
          "One of my responsibilities was randomizing paintings. It would randomly select a random painting difficulty based on the current room's tally/difficulty and later, in the initialization of the anomaly syncing, it would select randomly from the painting pool based on that difficulty. It also has a setting on what percentage of the spawn points to use in the room.",
          {
            images: [
              { src: "assets/img/project-liminal/spawn-manager.png", alt: "Spawn manager blueprint" },
              { src: "assets/img/project-liminal/random-difficulty.png", alt: "Random difficulty selection blueprint" },
            ],
          },
        ],
      },
      {
        title: "Players Ready Door",
        blocks: [
          "One issue we had was that it was hard controlling multiple players. They needed to go into the same room at the same time and without anyone getting stuck. And the solution we went with was that the door wouldn't open unless all the players were in the airlock.",
          { images: [{ src: "assets/img/project-liminal/door.png", alt: "The airlock door that waits for all players" }] },
        ],
      },
      {
        title: "Voice Chat",
        blocks: [
          "I worked on implementing proximity voice chat. I mainly used the Unreal Engine's VOIP system, with some echo effects.",
          { images: [{ src: "assets/img/project-liminal/voip.png", alt: "Proximity voice chat setup" }] },
        ],
      },
    ],
    takeaways: [
      "I had more experience with Unreal Engine, but I had some issues with it. Like constant crashes and lack of documentation.",
      "Happy with what we accomplished in the 4 weeks we had.",
      "Smooth communication in a small team and iterative development.",
      "Syncing is hard to do in a multiplayer game.",
    ],
  },

  {
    id: "cold-signal",
    title: "Cold Signal",
    tagline:
      "Harsh survival game with some narrative background. Your objective is to repair the radio to escape the desolate landscape of the north while fighting the cold and avoiding wild animals.",
    featured: true,
    tags: ["Unreal Engine", "Gameplay", "AI"],
    context: "Futuregames, Game Project 3",
    engine: "Unreal Engine 5",
    language: "C++, Blueprints",
    role: "Game Programmer",
    team: "17 people",
    duration: "7 weeks",
    cover: "assets/img/cold-signal/cover.png",
    hue: 205,
    video: "bkTiBmrdvO0",
    links: {
      itch: "https://futuregames.itch.io/cold-signal",
    },
    overview: [
      "With a team of 15 people we had 7 weeks, the longest development time of the 4 Game Projects at Futuregames. With a theme of \"Environment\" we set out to make a game with a cold and harsh survival feel.",
      "Cold Signal was made in Unreal Engine 5. As a team we followed scrum methodology using Jira to track progress and Perforce as version control. Other than the usual bug fixing I mainly worked with the inventory system, Bear AI and implementing interactions for the player.",
    ],
    highlights: [
      {
        title: "Inventory System",
        blocks: [
          { images: [{ src: "assets/img/cold-signal/inventory.gif", alt: "Switching between inventory items in game" }] },
          "One of my responsibilities was making the inventory system. It was needed so the player has the ability and tools to survive the harsh cold environment. There are multiple item pickups placed throughout the map. The player can switch between and use 4 different items including a compass, bandages, heating packs and flares.",
          { code: "assets/code/cold-signal/InventoryComponent.h" },
          { code: "assets/code/cold-signal/InventoryComponent.cpp" },
          "This shows the inventory component script where I have implemented some needed simple functions that can be used in blueprints. For example, the use items function where it just broadcasts to the equipped item that has been used. The add and reduce the item count function. And I also have saved inventory that is just a copy of the inventory that gets saved when you enter a checkpoint or the radio tower. So if the player dies, we can use this saved inventory to restore it back to its previous state.",
          {
            images: [
              { src: "assets/img/cold-signal/equip-key-inputs.png", alt: "Equip key inputs blueprint" },
              { src: "assets/img/cold-signal/equip-to-hand.png", alt: "Equip To Hand function" },
            ],
          },
          "And the implementation in blueprints is done where when the player clicks keys 1 through 4, first it calls the \"Before Item Switch\" function where it just checks if an animation montage is playing and also does a hotbar flash. Then it continues to the \"Set Equiped Item Index\" where it just calls back to the \"Equip Items To Hand\" function where it handles the different states the item can be at, if it should switch the item to the new one or should it just unequip it and so on. It sends an event message to the equipped item through an interface where it calls its own implementation of the item. Right below is a snippet of blueprint code of how the heatpack handles each case and also the \"On Item Use\" event call.",
          { images: [{ src: "assets/img/cold-signal/item-interface-functions.png", alt: "Item Interface Functions" }] },
        ],
      },
      {
        title: "Bear AI",
        blocks: [
          "The second task I needed to do was an AI Bear. Where it can roam, chase and attack. It is a highly dangerous animal that if you encounter it, there is only a small chance for you to get away. The AI uses the Unreal Engine's Behavior Tree, where it switches between states affected by the player's interaction with it. For example, if the player comes into view or gets too close to the bear, its behavior will change.",
          { images: [{ src: "assets/img/cold-signal/bear.gif", alt: "The bear chasing the player" }] },
          {
            images: [
              { src: "assets/img/cold-signal/bear-behaviour-tree.png", alt: "Bear behaviour tree" },
              { src: "assets/img/cold-signal/bear-blueprint.png", alt: "Bear blueprint" },
            ],
          },
        ],
      },
      {
        title: "Interaction System",
        blocks: [
          { images: [{ src: "assets/img/cold-signal/interaction.gif", alt: "Interacting with objects in game" }] },
          "Another responsibility I had was to implement the interaction system where you can press F to interact with certain objects. Additionally when a player hovers over an interactable it will show what that interaction may do with a UI element.",
          {
            images: [
              { src: "assets/img/cold-signal/interaction.png", alt: "Interaction blueprint" },
              { src: "assets/img/cold-signal/interaction-text.png", alt: "Interaction text blueprint" },
            ],
          },
        ],
      },
    ],
    takeaways: [
      "Since it was the first group project in Unreal I learned a lot about the many quirks and ways it is different compared to Unity.",
      "I learned what it is like to work on a single project for a longer period of time and how to take responsibility/ownership for my tasks making sure they are done in time.",
    ],
  },

  {
    id: "shattered-veil",
    title: "Shattered Veil",
    tagline:
      "A Celtic mythology inspired Action-Adventure game. Fight groups of enemies, solve puzzles and use your special sight to uncover mysteries. But be careful or you will meet the evil leader's gaze.",
    featured: true,
    tags: ["Unity", "AI", "Gameplay"],
    context: "Futuregames, Game Project 2",
    engine: "Unity",
    language: "C#",
    role: "Game Programmer",
    team: "20 people",
    duration: "4 weeks",
    cover: "assets/img/shattered-veil/cover.png",
    hue: 150,
    video: "tkWqMi0H1CI",
    links: {
      itch: "https://futuregames.itch.io/shattered-veil",
    },
    overview: [
      "This was the last project in Unity with a large team of 20 people. And as expected, there were quite a number of communication issues that came up throughout the project's development. From multiple ideas being interpreted in their own ways, to somehow the game becoming an Action FPS.",
      "The game was supposed to be a narrative-driven exploration game with a touch of combat. And the world is based on Celtic mythology. We also had the restriction of having some mobile compatibility, which we struggled a lot with because our game barely launched on mobile.",
    ],
    highlights: [
      {
        title: "Enemy AI",
        blocks: [
          { images: [{ src: "assets/img/shattered-veil/enemy-ai.png", alt: "Enemies in Shattered Veil" }] },
          "One of my responsibilities was implementing different enemies that the player will encounter as the game progresses. At the end of production, I had made two types of basic enemies, one melee and the other being ranged. Lastly, we had a boss enemy. While developing the AI, I found that making interesting behaviors is not as simple as I thought in the beginning.",
          { code: "assets/code/shattered-veil/EnemyMeleeBehaviourTree.cs" },
          { code: "assets/code/shattered-veil/CanSeePlayer.cs" },
          { code: "assets/code/shattered-veil/ChasePlayer.cs" },
        ],
      },
      {
        title: "Color Puzzle",
        blocks: [
          "Another feature I implemented is the color puzzle. It is where you need to put the specific colored key into the same lock. With some locks requiring multiple keys. And if you solved the puzzle, the three types of doors would open.",
          { images: [{ src: "assets/img/shattered-veil/puzzle.png", alt: "The color puzzle with keys and locks" }] },
          { code: "assets/code/shattered-veil/RitualStoneDoor.cs" },
          { code: "assets/code/shattered-veil/RitualStoneLock.cs" },
        ],
      },
    ],
    takeaways: [
      "Some miscommunication issues during the project.",
      "Making compelling AI is difficult.",
      "Optimizing for mobile is difficult while trying to keep similar visuals.",
      "Might have overscoped a bit too much. It would have been better to use the extra time to polish.",
    ],
  },

  {
    id: "slimebot-adventure",
    title: "Slimebot Adventure",
    tagline:
      "A cosy puzzle adventure game where you need to find a way back to your home planet. Use your slime powered water gun to solve puzzles to get your fellow slimes back safely.",
    featured: false,
    tags: ["Unity", "Gameplay"],
    context: "Futuregames, Game Project 1",
    engine: "Unity",
    language: "C#",
    role: "Game Programmer",
    team: "16 people",
    duration: "3 weeks",
    cover: "assets/img/slimebot-adventure/cover.webp",
    coverPosition: "50% 35%",
    hue: 95,
    video: "Nm42uC1Jbx4",
    links: {
      itch: "https://futuregames.itch.io/slimebot-adventure",
    },
    overview: [
      "As the first group project, I was expecting chaos and a crash and burn that I was told about. But, contrary to my belief, it went fine. We still had some issues, like not being able to get all the levels in the game. And also implementing/fixing bugs minutes before the deadline.",
      "Overall, we made an isometric third person puzzle solving game. Where you vacuum in slimes into your slime gun and use the liquid to solve multiple puzzles.",
    ],
    highlights: [
      {
        title: "Player Controller",
        blocks: [
          { images: [{ src: "assets/img/slimebot-adventure/player-controller.png", alt: "The player character in Slimebot Adventure" }] },
          "For most of the three weeks, I worked on the player. Implementing isometric movement, the camera movement and also coding the animation transitions. I would look through the many resources on the web for some inspiration. And then implement something similar based on what the designers wanted. Mostly I was fixing bugs that came up and worked a bit on the visual effects. And when I was done with a feature, I would ask for feedback from designers.",
          { code: "assets/code/slimebot-adventure/PlayerController.cs" },
          { code: "assets/code/slimebot-adventure/MovementAnimationController.cs" },
        ],
      },
    ],
    takeaways: [
      "Chaotic deadlines.",
      "We should have utilized QA more, so that the simple bugs could have been discovered early, so we could have prevented the chaos during deadlines.",
      "A better experience than what I was expecting.",
      "Learned how important it is to convey your problems and opinions to the team in a cohesive way.",
    ],
  },
];
