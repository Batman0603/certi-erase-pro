import { useState, useEffect } from "react";
import { AuthScreen } from "./auth/AuthScreen";
import { Dashboard } from "./dashboard/Dashboard";
import { DeviceDetection } from "./device/DeviceDetection";
import { WipeOperations } from "./wipe/WipeOperations";
import { CertificateView } from "./certificate/CertificateView";

export type AppScreen = 'auth' | 'dashboard' | 'device-detection' | 'wipe-operations' | 'certificate';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
  authenticated: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: 'smartphone' | 'external-drive' | 'laptop' | 'usb-drive';
  platform?: 'android' | 'ios' | 'windows' | 'macos' | 'linux';
  capacity: string;
  serial: string;
  status: 'connected' | 'ready' | 'wiping' | 'completed' | 'error';
  filesDetected?: number;
}

export interface WipeSession {
  id: string;
  deviceId: string;
  mode: 'selective' | 'complete';
  backupRequested: boolean;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  certificateGenerated?: boolean;
}

export const TrustWipeApp = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [wipeSession, setWipeSession] = useState<WipeSession | null>(null);

  // Simulate authentication check
  useEffect(() => {
    const savedAuth = localStorage.getItem('trustwipe-auth');
    if (savedAuth) {
      const userData = JSON.parse(savedAuth);
      setUser(userData);
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleAuthentication = (userData: User) => {
    setUser(userData);
    localStorage.setItem('trustwipe-auth', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedDevice(null);
    setWipeSession(null);
    localStorage.removeItem('trustwipe-auth');
    setCurrentScreen('auth');
  };

  const handleDeviceSelected = (device: Device) => {
    setSelectedDevice(device);
    setCurrentScreen('wipe-operations');
  };

  const handleWipeStarted = (session: WipeSession) => {
    setWipeSession(session);
  };

  const handleBackToDashboard = () => {
    setSelectedDevice(null);
    setWipeSession(null);
    setCurrentScreen('dashboard');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onAuthenticated={handleAuthentication} />;
      
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            onLogout={handleLogout}
            onStartWipe={() => setCurrentScreen('device-detection')}
            onViewCertificates={() => setCurrentScreen('certificate')}
          />
        );
      
      case 'device-detection':
        return (
          <DeviceDetection
            onDeviceSelected={handleDeviceSelected}
            onBack={handleBackToDashboard}
          />
        );
      
      case 'wipe-operations':
        return (
          <WipeOperations
            device={selectedDevice!}
            user={user!}
            onWipeStarted={handleWipeStarted}
            onBack={() => setCurrentScreen('device-detection')}
            onComplete={handleBackToDashboard}
          />
        );
      
      case 'certificate':
        return (
          <CertificateView
            wipeSession={wipeSession}
            onBack={handleBackToDashboard}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
    </div>
  );
};