import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Smartphone, HardDrive, Laptop, UsbIcon, RefreshCw, Wifi, Cable, AlertTriangle, FolderOpen, Settings, Home, FileText } from "lucide-react";
import { Device } from "../TrustWipeApp";

interface DeviceDetectionProps {
  onDeviceSelected: (device: Device) => void;
  onBack: () => void;
}

export const DeviceDetection = ({ onDeviceSelected, onBack }: DeviceDetectionProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [hasUsbConnection, setHasUsbConnection] = useState(false);

  // Simulate USB connection detection
  const checkUsbConnection = () => {
    // In a real application, this would check for actual USB devices
    const hasUsb = Math.random() > 0.3; // 70% chance of USB connection for demo
    setHasUsbConnection(hasUsb);
    return hasUsb;
  };

  const mockDevices: Device[] = [
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
      id: '5',
      name: 'Samsung T7 Portable SSD',
      type: 'external-drive',
      capacity: '2 TB',
      serial: 'MU-PC2T0T-DEF456',
      status: 'connected',
      filesDetected: 89234
    },
    {
      id: '6',
      name: 'Kingston DataTraveler',
      type: 'usb-drive',
      capacity: '32 GB',
      serial: 'DT50-32GB-567',
      status: 'connected',
      filesDetected: 456
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
    
    // Check USB connection first
    const usbConnected = checkUsbConnection();
    
    // Simulate device discovery
    setTimeout(() => {
      if (usbConnected) {
        setDevices(mockDevices);
      }
      setIsScanning(false);
    }, 2000);
  };

  useEffect(() => {
    handleScan();
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r flex flex-col">
        {/* App Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Trust Wipe</h1>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <Button onClick={onBack} variant="ghost" className="w-full justify-start" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="secondary" className="w-full justify-start" size="sm">
              <UsbIcon className="h-4 w-4 mr-2" />
              Device Manager
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Certificates
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </nav>

        {/* Status Panel */}
        <div className="p-3 border-t bg-muted/30">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className={hasUsbConnection ? "text-green-600" : "text-orange-600"}>
                {hasUsbConnection ? "USB Connected" : "No USB"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Devices:</span>
              <span>{devices.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-card border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button onClick={handleScan} disabled={isScanning} size="sm" variant="outline">
                <RefreshCw className={`h-4 w-4 mr-1 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning...' : 'Scan'}
              </Button>
              <div className="h-4 w-px bg-border mx-2" />
              <span className="text-sm text-muted-foreground">Device Manager</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {hasUsbConnection ? `${devices.length} device(s) detected` : 'No USB devices connected'}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-muted/30">
          {!hasUsbConnection ? (
            // No USB Connection State
            <div className="h-full flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No USB Devices Connected</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect a USB device to begin scanning for data that can be securely deleted.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Connect USB drives, external hard drives, or smartphones</p>
                    <p>• Ensure device drivers are installed</p>
                    <p>• Click scan to detect connected devices</p>
                  </div>
                  <Button onClick={handleScan} className="mt-4" disabled={isScanning}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                    Check for Devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : isScanning ? (
            // Scanning State
            <div className="h-full flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <RefreshCw className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scanning for Devices</h3>
                  <p className="text-muted-foreground">
                    Detecting connected USB devices and analyzing storage...
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : devices.length === 0 ? (
            // No Devices Found State
            <div className="h-full flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <FolderOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Data to Delete</h3>
                  <p className="text-muted-foreground mb-4">
                    Connected devices are either empty or do not contain deletable data.
                  </p>
                  <Button onClick={handleScan} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Scan Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Devices Found State
            <div className="h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-1">Connected USB Devices</h2>
                <p className="text-sm text-muted-foreground">
                  {devices.length} device(s) detected with data available for secure deletion
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {devices.map((device) => {
                  const Icon = getDeviceIcon(device.type);
                  return (
                    <Card 
                      key={device.id} 
                      className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary/20" 
                      onClick={() => onDeviceSelected(device)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{device.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {device.capacity} • {device.type.replace('-', ' ')}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={getStatusColor(device.status)} variant="secondary">
                            Ready
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Serial Number:</span>
                            <span className="font-mono text-xs">{device.serial}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Files to Delete:</span>
                            <span className="font-medium text-destructive">
                              {device.filesDetected?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeviceSelected(device);
                          }}
                        >
                          Begin Secure Wipe
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};