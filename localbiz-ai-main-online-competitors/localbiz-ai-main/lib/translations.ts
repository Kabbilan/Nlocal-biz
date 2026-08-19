export const translations = {
  en: {
    dashboard: 'Dashboard',
    analyzeProduct: 'Analyze Product',
    competitorIntel: 'Competitor Intel',
    aiRecommendation: 'AI Recommendation',
    marketingStudio: 'Marketing Studio',
    campaignPlanner: 'Campaign Planner',
    analytics: 'Analytics',

    goodMorning: 'Good morning',
    shopToday: "Here's what's happening with your shop today.",

    analyzeAProduct: 'Analyze a product',
    planCampaign: 'Plan campaign',

    featuredInsight: 'Featured insight',
    aiPickOfTheDay: 'AI pick of the day',
    nextBestAction: 'Next best action',

    viewFullAnalysis: 'View full analysis',
    createMarketing: 'Create marketing',
    reviewRecommendations: 'Review all recommendations',

    recentlyAnalyzed: 'Recently analyzed products',
    analyzeNew: 'Analyze new',

    currentPrice: 'Current price',
    recommended: 'Recommended',
    marginUnit: 'Margin / unit',
    inStock: 'In stock',
    marketRange: 'Market range',
    cost: 'Cost',

    highPriority: 'High priority',
  },

  ta: {
    dashboard: 'டாஷ்போர்டு',
    analyzeProduct: 'பொருளை பகுப்பாய்வு செய்',
    competitorIntel: 'போட்டியாளர் தகவல்',
    aiRecommendation: 'AI பரிந்துரை',
    marketingStudio: 'மார்க்கெட்டிங் ஸ்டுடியோ',
    campaignPlanner: 'பிரச்சார திட்டமிடல்',
    analytics: 'பகுப்பாய்வு',

    goodMorning: 'காலை வணக்கம்',
    shopToday: 'இன்று உங்கள் கடையில் நடப்பவை இதோ.',

    analyzeAProduct: 'ஒரு பொருளை பகுப்பாய்வு செய்',
    planCampaign: 'பிரச்சாரத்தை திட்டமிடு',

    featuredInsight: 'முக்கிய தகவல்',
    aiPickOfTheDay: 'இன்றைய AI தேர்வு',
    nextBestAction: 'அடுத்த சிறந்த நடவடிக்கை',

    viewFullAnalysis: 'முழு பகுப்பாய்வைப் பார்க்க',
    createMarketing: 'மார்க்கெட்டிங் உருவாக்கு',
    reviewRecommendations: 'அனைத்து பரிந்துரைகளையும் பார்க்க',

    recentlyAnalyzed: 'சமீபத்தில் பகுப்பாய்வு செய்யப்பட்ட பொருட்கள்',
    analyzeNew: 'புதியதை பகுப்பாய்வு செய்',

    currentPrice: 'தற்போதைய விலை',
    recommended: 'பரிந்துரைக்கப்பட்ட விலை',
    marginUnit: 'ஒரு பொருளுக்கான லாபம்',
    inStock: 'கையிருப்பில்',
    marketRange: 'சந்தை விலை வரம்பு',
    cost: 'செலவு',

    highPriority: 'அதிக முன்னுரிமை',
  },
} as const

export type Language = keyof typeof translations
