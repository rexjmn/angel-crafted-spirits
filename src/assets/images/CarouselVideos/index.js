import cheers from './cheers.mp4';
import cocktails from './cocktails.mp4';
import serving from './serving.mp4';
import Whisky from './Whisky.mp4';
import cinammonfire from './cinammonfire.mp4';

export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Classic Whisky, Modern Twist",
        "Bold Whisky, Crafted Perfection",
        "Whisky Elevated, Cocktails Refined",
      ],
      video: Whisky,
      videoDuration: 5,
    },
    {
      id: 2,
      textLists: ["Ignite Your Senses, Sip the Flame", 
        "Flame-Kissed Cocktails, Crafted to Perfection"],
      video: cinammonfire,
      videoDuration: 11,
    },
    {
      id: 3,
      textLists: [
        "Mastering Mixology, Elevating Every Glass",
        "Crafting Elegance, One Cocktail at a Time",
      ],
      video: serving,
      videoDuration: 7,
    },
    {
      id: 4,
      textLists: ["A Sip of Elegance, an Experience Unfolds", "First Sip, Lasting Impression"],
      video: cocktails,
      videoDuration: 7,
    },
    {
        id: 5,
        textLists: ["Taste the Craft, Savor the Moment", "Sip, Laugh, Repeat"],
        video: cheers,
        videoDuration: 9,
      },
  ];