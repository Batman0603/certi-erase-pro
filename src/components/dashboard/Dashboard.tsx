import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, HardDrive, FileCheck, Award, LogOut, Plus, Activity, AlertTriangle } from "lucide-react";
import { User } from "../TrustWipeApp";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onStartWipe: () => void;
  onViewCertificates: () => void;
}

export const Dashboard = ({ user, onLogout, onStartWipe, onViewCertificates }: DashboardProps) => {
  const { toast } = useToast();
  
  const stats = [
    { label: "Devices Wiped", value: "247", icon: HardDrive, color: "text-success" },
    { label: "Certificates Generated", value: "247", icon: Award, color: "text-primary" },
    { label: "Active Sessions", value: "0", icon: Activity, color: "text-muted-foreground" },
    { label: "Failed Operations", value: "3", icon: AlertTriangle, color: "text-warning" },
  ];

  const handleSystemStatus = () => {
    toast({
      title: "System Status Check",
      description: "🟢 System is running optimally. All components are operational.",
    });
  };

  const recentActivities = [
    { device: "Samsung Galaxy S23", action: "Complete Device Wipe", status: "completed", time: "2 hours ago" },
    { device: "MacBook Pro 16\"", action: "Selective File Wipe", status: "completed", time: "5 hours ago" },
    { device: "SanDisk USB 64GB", action: "Complete Device Wipe", status: "completed", time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Trust Wipe</h1>
                <p className="text-sm text-muted-foreground">Secure Data Sanitization Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onStartWipe}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Start New Wipe</h3>
                    <p className="text-sm text-muted-foreground">Detect and wipe devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewCertificates}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <Award className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Certificates</h3>
                    <p className="text-sm text-muted-foreground">Browse wipe certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleSystemStatus}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <FileCheck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">System Status</h3>
                    <p className="text-sm text-muted-foreground">Check system health</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardHeader>
              <CardTitle>Latest Wipe Operations</CardTitle>
              <CardDescription>Recent device sanitization activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                        <HardDrive className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.device}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        {activity.status}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};