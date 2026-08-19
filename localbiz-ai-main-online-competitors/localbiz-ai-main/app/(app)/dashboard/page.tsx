import { api } from '@/services/api'
import DashboardContent from './dashboard-content'

export default async function DashboardPage() {
  const [stats, products, featured, recommendations] = await Promise.all([
    api.getDashboardStats(),
    api.getRecentProducts(),
    api.getFeaturedProduct(),
    api.getRecommendations(),
  ])

  return (
    <DashboardContent
      stats={stats}
      products={products}
      featured={featured}
      recommendations={recommendations}
    />
  )
}
