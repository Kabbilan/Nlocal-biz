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
    <div className="dashboard-glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="dashboard-orb dashboard-orb-one" />
      <div className="dashboard-orb dashboard-orb-two" />
      <div className="relative z-10">
        <DashboardContent
          stats={stats}
          products={products}
          featured={featured}
          recommendations={recommendations}
        />
      </div>
    </div>
  )
}
