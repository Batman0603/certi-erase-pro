import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, User, Eye, EyeOff } from "lucide-react";
import { User as UserType } from "../TrustWipeApp";

interface AuthScreenProps {
  onAuthenticated: (user: UserType) => void;
}

export const AuthScreen = ({ onAuthenticated }: AuthScreenProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'login' | 'biometric' | 'setup'>('login');

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        setAuthStep('biometric');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBiometricAuth = () => {
    setIsLoading(true);
    
    // Simulate biometric verification
    setTimeout(() => {
      const user: UserType = {
        id: '1',
        name: credentials.username || 'Security Administrator',
        email: 'admin@trustwipe.com',
        role: 'admin',
        authenticated: true
      };
      onAuthenticated(user);
      setIsLoading(false);
    }, 2000);
  };

  const renderLoginStep = () => (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Trust Wipe</CardTitle>
        <CardDescription>Secure Data Sanitization Platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              placeholder="Enter username"
              className="pl-10"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="pl-10 pr-10"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button 
          onClick={handleLogin} 
          className="w-full" 
          disabled={!credentials.username || !credentials.password || isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Demo credentials: any username/password
        </div>
      </CardContent>
    </Card>
  );

  const renderBiometricStep = () => (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <Shield className="h-8 w-8 text-success" />
        </div>
        <CardTitle>Biometric Verification</CardTitle>
        <CardDescription>Place your finger on the scanner or use facial recognition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center animate-pulse">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleBiometricAuth} 
          variant="secure"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Complete Authentication'}
        </Button>
        
        <Button 
          onClick={() => setAuthStep('login')} 
          variant="ghost"
          className="w-full"
        >
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
      <div className="w-full max-w-md">
        {authStep === 'login' && renderLoginStep()}
        {authStep === 'biometric' && renderBiometricStep()}
      </div>
    </div>
  );
};