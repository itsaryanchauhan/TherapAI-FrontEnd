import axios from "axios";

interface ContentOptions {
    twitterInspiration: boolean;
    userInterests: boolean;
    recentTrends: boolean;
    customInput: boolean;
  }

  export interface prominentUsers {
    twitter_handle: string;
    pfp: string;
    link: string;
    Interest: string;
  }
  

async function saveSummaryAndInterests({
  email,
  summary,
  interests,
}: {
  email: string;
  summary?: string;
  interests?: string[];
}) {
  // Only send fields that are defined
  const payload: any = { email };
  if (typeof summary === "string") payload.summary = summary;
  if (Array.isArray(interests)) payload.interests = interests;
  const response = await axios.put('https://riyal-ai-saas.onrender.com/users/', payload);
  return response.data.user;
}

// --- Helper to update user data (PUT) ---
async function updateUserData({ email, profileData, summary, interests }: { 
  email: string; 
  profileData: any;
  summary?: string;
  interests?: string[];
}) {
  const response = await axios.put('https://riyal-ai-saas.onrender.com/users/', {
    email,
    ...profileData,
    summary,
    interests
  });
  return response.data;
}

// --- Helper to create user (POST) ---
async function createUserData({ email, twitter_handle }: { email: string; twitter_handle: string }) {
  const response = await axios.post('https://riyal-ai-saas.onrender.com/users/', {
    email,
    twitter_handle
  });
  return response.data.user;
}


// --- Helper to copy user style (POST) ---
async function copyUserStyle({ id, signal }: { id: string, signal: AbortSignal }) {
  try {
    const response = await axios.post('https://riyal-ai-saas.onrender.com/users/copy', {
      id
    }, {
      signal
    });
    return response.data;
  } catch (error) {
    console.error('Error in copyUserStyle:', error);
    throw error;
  }
}

const INTEREST_OPTIONS = [
    "Tech", "Finance", "AI", "Startups", "Design", "Marketing", "Gaming", "Crypto", "Writing"
  ];
  
const options = [
  {
    name: "Style Mimic",
    price: 10,
    description: "Mimic the writing style of any Twitter user"
  },
  {
    name: "Personalized Tone",
    price: 5,
    description: "Customize the tone of your generated tweet"
  },
  {
    name: "Trending Topics",
    price: 5,
    description: "Generate tweets about current trending topics"
  },
  {
    name: "Custom Input",
    price: 5,
    description: "Add your own custom context for tweet generation"
  }
];
  
  
const fetchTrendingTopics = async (setTrendingTopics: (trends: any[]) => void) => {
  try {
    const response = await axios.get('https://riyal-ai-saas.onrender.com/trending');
    if (response.data.success) {
      setTrendingTopics(response.data.trends);
    }
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    setTrendingTopics([]);
  }
};
  
  


export { saveSummaryAndInterests, updateUserData, createUserData, copyUserStyle, INTEREST_OPTIONS, options, fetchTrendingTopics };