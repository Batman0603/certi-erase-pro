import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Smartphone, HardDrive, Laptop, UsbIcon, RefreshCw, Wifi, Cable } from "lucide-react";
import { Device } from "../TrustWipeApp";

interface DeviceDetectionProps {
  onDeviceSelected: (device: Device) => void;
  onBack: () => void;
}

export const DeviceDetection = ({ onDeviceSelected, onBack }: DeviceDetectionProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  const mockDevices: Device[] = [
    {
      id: '1',
      name: 'Samsung Galaxy S23',
      type: 'smartphone',
      platform: 'android',
      capacity: '256 GB',
      serial: 'SM-S911U1-ABC123',
      status: 'connected',
      filesDetected: 45782
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      type: 'smartphone',
      platform: 'ios',
      capacity: '512 GB',
      serial: 'A3102-XYZ789',
      status: 'connected',
      filesDetected: 23456
    },
    {
      id: '3',
      name: 'SanDisk Ultra USB 3.0',
      type: 'usb-drive',
      capacity: '64 GB',
      serial: 'SDCZ48-064G-789',
      status: 'connected',
      filesDetected: 234
    },
    {
      id: '4',
      name: 'MacBook Pro 16"',
      type: 'laptop',
      platform: 'macos',
      capacity: '1 TB SSD',
      serial: 'MVVM2LL/A-456',
      status: 'connected',
      filesDetected: 156789
    },
    {
      id: '5',
      name: 'Samsung T7 Portable SSD',
      type: 'external-drive',
      capacity: '2 TB',
      serial: 'MU-PC2T0T-DEF456',
      status: 'connected',
      filesDetected: 89234
    }
  ];

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'smartphone': return Smartphone;
      case 'laptop': return Laptop;
      case 'usb-drive': return UsbIcon;
      case 'external-drive': return HardDrive;
      default: return HardDrive;
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'connected': return 'bg-success/10 text-success';
      case 'ready': return 'bg-primary/10 text-primary';
      case 'wiping': return 'bg-warning/10 text-warning';
      case 'completed': return 'bg-success/10 text-success';
      case 'error': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setDevices([]);
    
    // Simulate device discovery
    setTimeout(() => {
      setDevices(mockDevices);
      setIsScanning(false);
    }, 3000);
  };

  useEffect(() => {
    handleScan();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={onBack} variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Device Detection</h1>
                <p className="text-sm text-muted-foreground">Scanning for connected devices</p>
              </div>
            </div>
            
            <Button onClick={handleScan} disabled={isScanning}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Refresh Scan'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Connection Types */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Connection Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Cable className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">USB/Cable Connection</p>
                    <p className="text-sm text-muted-foreground">Direct physical connection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Network Connection</p>
                    <p className="text-sm text-muted-foreground">PXE boot for remote devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detected Devices */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Detected Devices ({devices.length})</h2>
            {isScanning && (
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></div>
                Scanning for devices...
              </div>
            )}
          </div>

          {isScanning && devices.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-12 w-12 mx-auto text-muted-foreground animate-spin mb-4" />
                <p className="text-lg font-medium mb-2">Scanning for Devices</p>
                <p className="text-muted-foreground">Please ensure devices are connected and drivers are installed</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                return (
                  <Card key={device.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onDeviceSelected(device)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{device.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {device.platform && (
                                <span className="capitalize">{device.platform} • </span>
                              )}
                              {device.capacity}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(device.status)} variant="secondary">
                          {device.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Serial:</span>
                          <span className="font-mono text-xs">{device.serial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Files Detected:</span>
                          <span className="font-medium">{device.filesDetected?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="capitalize">{device.type.replace('-', ' ')}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeviceSelected(device);
                        }}
                      >
                        Select Device
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};