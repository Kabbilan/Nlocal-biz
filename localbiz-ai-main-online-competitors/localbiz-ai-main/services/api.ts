/**
 * LocalBiz AI — API service layer
 * -------------------------------------------------------------
 * All data access is isolated here so a real backend can be
 * wired in later. Every function returns a Promise and currently
 * resolves mock data after a small simulated network delay.
 *
 * To connect a real backend, replace the bodies of these
 * functions with `fetch()` calls to your API endpoints. The
 * exported types describe the expected response shapes.
 */

export const CURRENCY = '₹'

export function formatCurrency(value: number): string {
  return `${CURRENCY}${value.toLocaleString('en-IN')}`
}

/* ----------------------------- Types ----------------------------- */

export type Demand = 'HIGH' | 'MEDIUM' | 'LOW'

export interface DashboardStat {
  id: string
  label: string
  value: string
  change: number // percentage change vs previous period
  trend: 'up' | 'down'
  hint: string
}

export interface ProductSummary {
  id: string
  name: string
  category: string
  cost: number
  price: number
  recommendedPrice: number
  stock: number
  demand: Demand
  image: string
  analyzedAt: string
}

export interface OnlineCompetitor {
  platform: string
  seller: string
  price: number
  shipping: number
  delivery: string
  rating: number
  reviews: number
  note: string
}

export interface WeatherInsight {
  condition: string
  detail: string
  daysAway: number
  impact: string
}

export interface MarketingContent {
  instagramCaption: string
  whatsappMessage: string
  productDescription: string
  offerMessage: string
  posterHeadline: string
  posterSubhead: string
  posterTag: string
}

export interface AnalysisResult {
  productId: string
  identification: string
  category: string
  features: string[]
  confidence: number // 0 - 100
  onlineCompetitors: OnlineCompetitor[]
  marketRange: { min: number; max: number }
  weather: WeatherInsight
  demand: Demand
  cost: number
  currentPrice: number
  recommendedPrice: number
  stock: number
  offer: string
  bestTime: string
  targetCustomer: string
  strategy: string
  reasoning: string[]
  evidence: string[]
  marketing: MarketingContent
}

export interface Recommendation {
  id: string
  title: string
  summary: string
  priority: 'high' | 'medium' | 'low'
  impact: string
  effort: 'Low' | 'Medium' | 'High'
  steps: string[]
  category: string
}

export interface CampaignPhase {
  id: string
  timing: string
  daysBefore: number
  title: string
  channel: string
  goal: string
  content: string
  status: 'scheduled' | 'ready' | 'live'
}

export interface AnalyticsData {
  kpis: DashboardStat[]
  engagementOverTime: { day: string; views: number; enquiries: number }[]
  channelSplit: { channel: string; value: number }[]
  funnel: { stage: string; value: number }[]
  productPerformance: {
    name: string
    views: number
    enquiries: number
    conversions: number
  }[]
  campaignPerformance: { name: string; reach: number; engagement: number }[]
}

/* --------------------------- Mock data --------------------------- */

const delay = <T>(data: T, ms = 450): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

const dashboardStats: DashboardStat[] = [
  {
    id: 'analyzed',
    label: 'Products Analyzed',
    value: '18',
    change: 12.5,
    trend: 'up',
    hint: '3 new this week',
  },
  {
    id: 'high-demand',
    label: 'High Demand Products',
    value: '6',
    change: 20,
    trend: 'up',
    hint: 'Rain season driving demand',
  },
  {
    id: 'actions',
    label: 'Recommended Actions',
    value: '4',
    change: -8,
    trend: 'down',
    hint: '2 need attention today',
  },
  {
    id: 'campaigns',
    label: 'Active Campaigns',
    value: '2',
    change: 100,
    trend: 'up',
    hint: 'Monsoon Raincoat push live',
  },
]

const raincoat: ProductSummary = {
  id: 'raincoat',
  name: 'Premium Rain Coat',
  category: 'Rainwear & Monsoon Gear',
  cost: 500,
  price: 700,
  recommendedPrice: 649,
  stock: 25,
  demand: 'HIGH',
  image: '/products/raincoat.png',
  analyzedAt: '2 hours ago',
}

const recentProducts: ProductSummary[] = [
  raincoat,
  {
    id: 'umbrella',
    name: 'Windproof Umbrella',
    category: 'Rainwear & Monsoon Gear',
    cost: 180,
    price: 299,
    recommendedPrice: 279,
    stock: 40,
    demand: 'HIGH',
    image: '/products/umbrella.png',
    analyzedAt: 'Yesterday',
  },
  {
    id: 'gumboots',
    name: 'Rubber Gum Boots',
    category: 'Footwear',
    cost: 320,
    price: 499,
    recommendedPrice: 469,
    stock: 15,
    demand: 'MEDIUM',
    image: '/products/gumboots.png',
    analyzedAt: '2 days ago',
  },
  {
    id: 'tshirt',
    name: 'Cotton Round-Neck T-Shirt',
    category: 'Apparel',
    cost: 150,
    price: 349,
    recommendedPrice: 329,
    stock: 60,
    demand: 'LOW',
    image: '/products/tshirt.png',
    analyzedAt: '4 days ago',
  },
]

const raincoatAnalysis: AnalysisResult = {
  productId: 'raincoat',
  identification: 'Premium Waterproof Rain Coat (Adult, Unisex)',
  category: 'Rainwear & Monsoon Gear',
  features: [
    'Double-layer waterproof polyester',
    'Sealed seams, no leakage',
    'Adjustable hood with drawstring',
    'Reflective safety strip',
    'Front pockets with flap cover',
  ],
  confidence: 94,
  onlineCompetitors: [
    {
      platform: 'Amazon',
      seller: 'RainReady Official',
      price: 749,
      shipping: 0,
      delivery: 'Delivery in 2 days',
      rating: 4.4,
      reviews: 1280,
      note: 'Best-rated listing',
    },
    {
      platform: 'Flipkart',
      seller: 'Monsoon Essentials',
      price: 699,
      shipping: 40,
      delivery: 'Delivery in 3–4 days',
      rating: 4.1,
      reviews: 642,
      note: '₹739 delivered',
    },
    {
      platform: 'Myntra',
      seller: 'Urban Weather',
      price: 679,
      shipping: 0,
      delivery: 'Delivery in 4 days',
      rating: 4.2,
      reviews: 318,
      note: 'Lowest listed price',
    },
    {
      platform: 'Meesho',
      seller: 'Daily Deals Hub',
      price: 649,
      shipping: 60,
      delivery: 'Delivery in 5–6 days',
      rating: 3.8,
      reviews: 97,
      note: '₹709 delivered',
    },
  ],
  marketRange: { min: 649, max: 749 },
  weather: {
    condition: 'Rain expected',
    detail: 'Heavy showers forecast over the next 7 days in your area',
    daysAway: 2,
    impact: 'Demand for rainwear typically rises 30–45% during rain spells',
  },
  demand: 'HIGH',
  cost: 500,
  currentPrice: 700,
  recommendedPrice: 649,
  stock: 25,
  offer: '₹50 Weekend Discount',
  bestTime: 'This weekend (Fri–Sun), before the rain peaks',
  targetCustomer: 'Daily commuters, students, and delivery workers aged 18–45',
  strategy:
    'Price just under the ₹650 market floor to win price-sensitive shoppers, then run a limited weekend discount to create urgency right before the rain arrives.',
  reasoning: [
    'Your cost is ₹500, so ₹649 still keeps a healthy ₹149 margin per unit.',
    'The lowest online listing is ₹649 before shipping — pricing at ₹649 keeps you competitive without copying a delivery fee.',
    'Rain is forecast in 2 days, so demand will spike exactly when your offer is live.',
    'A ₹50 weekend discount adds urgency without hurting your margin much.',
  ],
  evidence: [
    '4 online listings priced between ₹649 and ₹749 before shipping',
    'Weather service: heavy rain likely for 7 consecutive days',
    'Last monsoon, rainwear sales rose 38% in the first rain week',
    'Only 25 units in stock — enough for a short, sharp campaign',
  ],
  marketing: {
    instagramCaption:
      '🌧️ Rain is coming — stay dry in style! Our Premium Rain Coat is now just ₹649 (this weekend only). Double-layer waterproof, comfy hood, and built to last. Tap to grab yours before stock runs out! #MonsoonReady #StayDry #LocalBiz',
    whatsappMessage:
      'Hi! 🌧️ Rain is expected this weekend. Our Premium Rain Coat is available at a special price of ₹649 (usually ₹700). Only a few left in stock! Reply "BOOK" to reserve yours. — Ravi\'s Store',
    productDescription:
      'Stay completely dry this monsoon with our Premium Rain Coat. Made from double-layer waterproof polyester with sealed seams and an adjustable hood, it keeps you protected in heavy rain while staying light and comfortable. A reflective safety strip keeps you visible on the road. Perfect for commuters, students, and delivery riders.',
    offerMessage: '⚡ Weekend Special: Flat ₹50 OFF the Premium Rain Coat. Now ₹649. Limited stock!',
    posterHeadline: 'Beat the Rain',
    posterSubhead: 'Premium Rain Coat — now ₹649',
    posterTag: 'This weekend only',
  },
}

const recommendations: Recommendation[] = [
  {
    id: 'rec-raincoat-price',
    title: 'Drop Rain Coat price to ₹649 before the weekend',
    summary:
      'Rain is forecast in 2 days and online listings range from ₹649 to ₹749 before shipping. A small price adjustment keeps you competitive as demand peaks.',
    priority: 'high',
    impact: 'Est. +12 units sold this week',
    effort: 'Low',
    category: 'Pricing',
    steps: [
      'Change Rain Coat price from ₹700 to ₹649',
      'Add a ₹50 weekend discount tag',
      'Send the WhatsApp message to your regular customers',
    ],
  },
  {
    id: 'rec-umbrella-bundle',
    title: 'Bundle Umbrella + Rain Coat as a Monsoon Combo',
    summary:
      'Customers buying rain coats often need an umbrella too. A combo increases your average order value with items already in stock.',
    priority: 'medium',
    impact: 'Est. +₹1,800 revenue',
    effort: 'Medium',
    category: 'Merchandising',
    steps: [
      'Create a "Monsoon Combo" at ₹899 (save ₹99)',
      'Place both items together near the entrance',
      'Post the combo on Instagram and WhatsApp',
    ],
  },
  {
    id: 'rec-restock',
    title: 'Restock Gum Boots — only 15 left',
    summary:
      'Gum Boots demand is climbing with the rain forecast, but stock is low. Reorder now to avoid missing sales this week.',
    priority: 'medium',
    impact: 'Avoid ~₹4,500 lost sales',
    effort: 'Low',
    category: 'Inventory',
    steps: ['Reorder at least 25 units', 'Confirm supplier delivery before the weekend'],
  },
  {
    id: 'rec-tshirt',
    title: 'Pause T-Shirt promotion — low demand',
    summary:
      'Cotton T-Shirts are seeing low demand during the rain season. Shift attention and shelf space to monsoon products.',
    priority: 'low',
    impact: 'Free up marketing focus',
    effort: 'Low',
    category: 'Focus',
    steps: ['Move T-Shirts off the front display', 'Revisit after the monsoon season'],
  },
]

const campaignPhases: CampaignPhase[] = [
  {
    id: 'phase-teaser',
    timing: '7 days before rain',
    daysBefore: 7,
    title: 'Teaser',
    channel: 'Instagram Story',
    goal: 'Build curiosity',
    content: '"Something is coming to keep you dry this monsoon... 🌧️ Stay tuned!"',
    status: 'live',
  },
  {
    id: 'phase-awareness',
    timing: '5 days before rain',
    daysBefore: 5,
    title: 'Product Awareness',
    channel: 'Instagram Post',
    goal: 'Show the product',
    content: 'Feature the Premium Rain Coat with photos and key benefits.',
    status: 'ready',
  },
  {
    id: 'phase-offer',
    timing: '3 days before rain',
    daysBefore: 3,
    title: 'Offer Announcement',
    channel: 'Instagram + WhatsApp',
    goal: 'Announce the discount',
    content: 'Reveal the ₹50 weekend discount. Create urgency with limited stock.',
    status: 'scheduled',
  },
  {
    id: 'phase-reminder',
    timing: '1 day before rain',
    daysBefore: 1,
    title: 'WhatsApp Reminder',
    channel: 'WhatsApp Broadcast',
    goal: 'Nudge regulars',
    content: 'Send a personal reminder to loyal customers to reserve their raincoat.',
    status: 'scheduled',
  },
  {
    id: 'phase-flash',
    timing: 'Rainy Day',
    daysBefore: 0,
    title: 'Flash Offer',
    channel: 'WhatsApp + In-store',
    goal: 'Convert on peak demand',
    content: '"It\'s raining! Flat ₹50 OFF today only. Grab your raincoat now."',
    status: 'scheduled',
  },
]

const analytics: AnalyticsData = {
  kpis: [
    { id: 'views', label: 'Campaign Views', value: '4,820', change: 18, trend: 'up', hint: 'Last 7 days' },
    { id: 'engagement', label: 'Engagement', value: '9.4%', change: 2.1, trend: 'up', hint: 'Likes, saves, replies' },
    { id: 'whatsapp', label: 'WhatsApp Enquiries', value: '132', change: 27, trend: 'up', hint: '48 replied "BOOK"' },
    { id: 'conversions', label: 'Conversions', value: '38', change: 11, trend: 'up', hint: '₹24,662 revenue' },
  ],
  engagementOverTime: [
    { day: 'Mon', views: 320, enquiries: 8 },
    { day: 'Tue', views: 410, enquiries: 12 },
    { day: 'Wed', views: 520, enquiries: 16 },
    { day: 'Thu', views: 680, enquiries: 21 },
    { day: 'Fri', views: 910, enquiries: 28 },
    { day: 'Sat', views: 1180, enquiries: 31 },
    { day: 'Sun', views: 800, enquiries: 16 },
  ],
  channelSplit: [
    { channel: 'Instagram', value: 52 },
    { channel: 'WhatsApp', value: 34 },
    { channel: 'In-store', value: 14 },
  ],
  funnel: [
    { stage: 'Views', value: 4820 },
    { stage: 'Engaged', value: 452 },
    { stage: 'Enquiries', value: 132 },
    { stage: 'Conversions', value: 38 },
  ],
  productPerformance: [
    { name: 'Rain Coat', views: 1820, enquiries: 64, conversions: 21 },
    { name: 'Umbrella', views: 1240, enquiries: 38, conversions: 11 },
    { name: 'Gum Boots', views: 940, enquiries: 22, conversions: 5 },
    { name: 'T-Shirt', views: 820, enquiries: 8, conversions: 1 },
  ],
  campaignPerformance: [
    { name: 'Teaser', reach: 1200, engagement: 340 },
    { name: 'Awareness', reach: 1650, engagement: 520 },
    { name: 'Offer', reach: 2100, engagement: 780 },
    { name: 'Reminder', reach: 890, engagement: 410 },
    { name: 'Flash', reach: 1400, engagement: 690 },
  ],
}

/* --------------------------- API surface --------------------------- */

export const api = {
  getDashboardStats: () => delay(dashboardStats),
  getRecentProducts: () => delay(recentProducts),
  getFeaturedProduct: () => delay(raincoat),
  /**
   * Analyze a product. In a real backend this would upload the image
   * and product details and return an AI-generated analysis.
   */
  analyzeProduct: (_input?: Partial<AnalyzeInput>) => delay(raincoatAnalysis, 1600),
  getAnalysisResult: (_productId?: string) => delay(raincoatAnalysis),
  getCompetitorPrices: (_productId?: string) => delay(raincoatAnalysis.onlineCompetitors),
  getRecommendations: () => delay(recommendations),
  getMarketingContent: (_productId?: string) => delay(raincoatAnalysis.marketing),
  getCampaignPlan: () => delay(campaignPhases),
  getAnalytics: () => delay(analytics),
}

export interface AnalyzeInput {
  name: string
  cost: number
  price: number
  stock: number
  location: string
  imageDataUrl?: string
}
