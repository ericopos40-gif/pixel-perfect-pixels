import { PanelCard } from "@/components/shared/PanelCard";
import { StatCard } from "@/components/shared/StatCard";
import {
  Globe,
  Users,
  Eye,
  TrendingUp,
  FileText,
  Image,
  Calendar,
  Mail,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WebsiteAdminDashboard() {
  // Demo website analytics
  const stats = {
    visitors: 12450,
    pageViews: 45230,
    avgSessionTime: "3:45",
    bounceRate: "42%",
    totalPages: 24,
    blogPosts: 18,
    galleryImages: 156,
    upcomingEvents: 3,
    contactMessages: 12,
    newsletterSubscribers: 1250,
  };

  const recentActivity = [
    {
      action: "New blog post published",
      detail: "5 Tips for Healthy Teeth",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      action: "Contact form submission",
      detail: "New inquiry from potential patient",
      time: "4 hours ago",
      icon: Mail,
      color: "text-green-600",
    },
    {
      action: "Gallery updated",
      detail: "8 new images added to clinic gallery",
      time: "Yesterday",
      icon: Image,
      color: "text-purple-600",
    },
    {
      action: "Event created",
      detail: "Dental Health Awareness Week",
      time: "2 days ago",
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  const topPages = [
    { path: "/", views: 8240, title: "Home Page" },
    { path: "/services", views: 6150, title: "Services" },
    { path: "/about", views: 4820, title: "About Us" },
    { path: "/blog", views: 3950, title: "Blog" },
    { path: "/contact", views: 2890, title: "Contact" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Website Visitors"
          value={stats.visitors.toLocaleString()}
          subtitle="This month"
          icon={Users}
          trend="+15% vs last month"
        />
        <StatCard
          title="Page Views"
          value={stats.pageViews.toLocaleString()}
          subtitle="Total impressions"
          icon={Eye}
          trend="+22% vs last month"
        />
        <StatCard
          title="Avg Session Time"
          value={stats.avgSessionTime}
          subtitle="Minutes per visit"
          icon={Activity}
          trend="+8% vs last month"
        />
        <StatCard
          title="Bounce Rate"
          value={stats.bounceRate}
          subtitle="Single page visits"
          icon={TrendingUp}
          trend="-5% vs last month"
        />
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-2 gap-6">
        <PanelCard title="Content Summary" subtitle="Overview of website content">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Pages</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalPages}</div>
              <div className="text-sm text-gray-600">Active pages</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Blog Posts</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{stats.blogPosts}</div>
              <div className="text-sm text-gray-600">Published articles</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Gallery</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{stats.galleryImages}</div>
              <div className="text-sm text-gray-600">Total images</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="font-semibold">Events</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{stats.upcomingEvents}</div>
              <div className="text-sm text-gray-600">Upcoming events</div>
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Engagement Metrics" subtitle="Visitor interaction statistics">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-red-600" />
                <span className="font-semibold">Messages</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{stats.contactMessages}</div>
              <div className="text-sm text-gray-600">
                <Badge className="bg-red-100 text-red-800">New</Badge>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">Subscribers</span>
              </div>
              <div className="text-2xl font-bold text-indigo-600">{stats.newsletterSubscribers}</div>
              <div className="text-sm text-gray-600">Newsletter list</div>
            </div>

            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-teal-600" />
                <span className="font-semibold">Reach</span>
              </div>
              <div className="text-2xl font-bold text-teal-600">24.5K</div>
              <div className="text-sm text-gray-600">Unique visitors</div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-pink-600" />
                <span className="font-semibold">Growth</span>
              </div>
              <div className="text-2xl font-bold text-pink-600">+18%</div>
              <div className="text-sm text-gray-600">Month over month</div>
            </div>
          </div>
        </PanelCard>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <PanelCard title="Recent Activity" subtitle="Latest website updates">
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.detail}</div>
                  <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Top Pages */}
        <PanelCard title="Top Pages" subtitle="Most visited pages this month">
          <div className="space-y-2">
            {topPages.map((page, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm text-gray-500">{page.path}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{page.views.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">views</div>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      {/* Quick Actions */}
      <PanelCard title="Quick Actions" subtitle="Common website management tasks">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "New Blog Post", icon: FileText, color: "bg-blue-100 text-blue-600" },
            { label: "Add Event", icon: Calendar, color: "bg-green-100 text-green-600" },
            { label: "Upload Images", icon: Image, color: "bg-purple-100 text-purple-600" },
            { label: "View Messages", icon: Mail, color: "bg-red-100 text-red-600" },
          ].map((action, idx) => (
            <button
              key={idx}
              className="p-6 border-2 border-dashed rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <action.icon className={`w-8 h-8 mx-auto mb-2 ${action.color}`} />
              <div className="text-sm font-medium">{action.label}</div>
            </button>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}
