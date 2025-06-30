export interface TwitterData {
    id: number;
    bio: string;
    pfp_url: string;
    name: string;
    username: string;
    created_at: string;
    followers_count: number;
    following_count: number;
    joinDate?: string;
    avatar?: string;
    followers?: number;
    following?: number;
  }
  
  export interface UserData {
    email: string;
    id: number;
    name: string;
    twitter_data: TwitterData[];
    twitter_handle: string;
    twitter_id: string;
    verified: boolean;
    balance: number;
    summary?: string;
    interests?: string[];
  }
  
  export interface TweetAnalysisType {
    analysis: string;
    posts?: any[];
    stored_data?: any;
  }
  
  export interface ContentOptions {
    twitterInspiration: boolean;
    userInterests: boolean;
    recentTrends: boolean;
    customInput: boolean;
  }
  
  export interface ProfileData {
    name: string;
    twitter_handle: string;
    bio?: string;
    followers?: number;
    following?: number;
    isVerified?: boolean;
    joinDate?: string;
    profileImage?: string;
    twitter_id?: string;
    avatar?: string;
  }

  
export interface Option {
    name: string;
    price: number;
    description: string;
  }
  
   interface SelectedOption {
    id: string;
    price: number;
  }
  
  export interface TweetOptionsProps {
    options: Option[];
    selectedOptions: {id: string, price: number}[];
    styleMimicLoading: boolean;
    styleMimicSuccess: boolean;
    handleClick: (id: string, price: number) => void;
    selectedTone?: string;
    showToneSelector: boolean;
    setShowToneSelector: (show: boolean) => void;
    onToneSelect: (tone: string | undefined) => void;
  }