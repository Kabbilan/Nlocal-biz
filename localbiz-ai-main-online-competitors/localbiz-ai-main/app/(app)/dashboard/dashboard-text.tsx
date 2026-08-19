'use client'

import { useLanguage } from '@/components/language-provider'

const translations = {
  en: {
    analyzeProduct: 'Analyze a product',
    rainExpected: 'Rain expected in 2 days',
    rainDescription:
      'Monsoon products like raincoats and umbrellas are in high demand. Now is a great time to run an offer.',
    planCampaign: 'Plan campaign',
    featuredInsight: 'Featured insight',
    aiPick: 'AI pick of the day',
    currentPrice: 'Current price',
    recommended: 'Recommended',
    marginUnit: 'Margin / unit',
    inStock: 'In stock',
    marketRange: 'Market range',
    cost: 'Cost',
    viewAnalysis: 'View full analysis',
    createMarketing: 'Create marketing',
    nextAction: 'Next best action',
    all: 'All',
    highPriority: 'High priority',
    reviewRecommendations: 'Review all recommendations',
    recentProducts: 'Recently analyzed products',
    analyzeNew: 'Analyze new',
    product: 'Product',
    price: 'Price',
    stock: 'Stock',
    demand: 'Demand',
    analyzed: 'Analyzed',
  },

  ta: {
    analyzeProduct: 'ஒரு பொருளை ஆய்வு செய்',
    rainExpected: '2 நாட்களில் மழை எதிர்பார்க்கப்படுகிறது',
    rainDescription:
      'ரெயின்கோட் மற்றும் குடை போன்ற மழைக்கால பொருட்களுக்கு அதிக தேவை உள்ளது. இப்போது சலுகை வழங்க சிறந்த நேரம்.',
    planCampaign: 'பிரச்சாரம் திட்டமிடு',
    featuredInsight: 'சிறப்பு தகவல்',
    aiPick: 'இன்றைய AI தேர்வு',
    currentPrice: 'தற்போதைய விலை',
    recommended: 'பரிந்துரைக்கப்பட்ட விலை',
    marginUnit: 'ஒரு பொருளுக்கான லாபம்',
    inStock: 'கையிருப்பில்',
    marketRange: 'சந்தை விலை வரம்பு',
    cost: 'செலவு',
    viewAnalysis: 'முழு ஆய்வைப் பார்க்க',
    createMarketing: 'மார்க்கெட்டிங் உருவாக்கு',
    nextAction: 'அடுத்த சிறந்த செயல்',
    all: 'அனைத்தும்',
    highPriority: 'அதிக முன்னுரிமை',
    reviewRecommendations: 'அனைத்து பரிந்துரைகளையும் பார்க்க',
    recentProducts: 'சமீபத்தில் ஆய்வு செய்யப்பட்ட பொருட்கள்',
    analyzeNew: 'புதியதை ஆய்வு செய்',
    product: 'பொருள்',
    price: 'விலை',
    stock: 'கையிருப்பு',
    demand: 'தேவை',
    analyzed: 'ஆய்வு செய்யப்பட்ட நேரம்',
  },
} as const

export function useDashboardText() {
  const { language } = useLanguage()

  return translations[language]
}
