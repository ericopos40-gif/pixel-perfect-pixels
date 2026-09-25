import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  views: number;
  featured: boolean;
}

export function News() {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts: BlogPost[] = [
    {
      id: "POST-001",
      title: "5 Tips for Maintaining Healthy Teeth",
      slug: "5-tips-healthy-teeth",
      author: "Dr. James Mwangi",
      category: "Dental Care",
      status: "published",
      publishDate: "2025-09-15",
      views: 1240,
      featured: true,
    },
    {
      id: "POST-002",
      title: "Understanding Root Canal Treatment",
      slug: "understanding-root-canal",
      author: "Dr. Sarah Kimani",
      category: "Treatments",
      status: "published",
      publishDate: "2025-09-10",
      views: 890,
      featured: false,
    },
    {
      id: "POST-003",
      title: "The Importance of Regular Dental Checkups",
      slug: "importance-regular-checkups",
      author: "Dr. James Mwangi",
      category: "Prevention",
      status: "published",
      publishDate: "2025-09-05",
      views: 1580,
      featured: true,
    },
    {
      id: "POST-004",
      title: "Teeth Whitening: What You Need to Know",
      slug: "teeth-whitening-guide",
      author: "Dr. Sarah Kimani",
      category: "Cosmetic",
      status: "draft",
      publishDate: "",
      views: 0,
      featured: false,
    },
    {
      id: "POST-005",
      title: "Children's Dental Health Month",
      slug: "childrens-dental-health",
      author: "Dr. James Mwangi",
      category: "Pediatric",
      status: "scheduled",
      publishDate: "2025-10-01",
      views: 0,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PanelCard
      title="News & Blog"
      subtitle="Manage blog posts and articles"
      action={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts by title, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{blogPosts.length}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {blogPosts.filter((p) => p.status === "published").length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-600">
              {blogPosts.filter((p) => p.status === "draft").length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {blogPosts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Author</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Views</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-gray-500">/{post.slug}</div>
                    </div>
                    {post.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 mt-1">Featured</Badge>
                    )}
                  </td>
                  <td className="p-3 text-sm">{post.author}</td>
                  <td className="p-3">
                    <Badge variant="outline">{post.category}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                  </td>
                  <td className="p-3 text-sm">
                    {post.publishDate || <span className="text-gray-400">Not set</span>}
                  </td>
                  <td className="p-3 text-sm font-medium">{post.views.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No posts found matching your search
          </div>
        )}
      </div>
    </PanelCard>
  );
}
