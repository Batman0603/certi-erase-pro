import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, HardDrive, Files, Trash2, Download } from "lucide-react";
import { Device, User, WipeSession } from "../TrustWipeApp";

interface WipeOperationsProps {
  device: Device;
  user: User;
  onWipeStarted: (session: WipeSession) => void;
  onBack: () => void;
  onComplete: () => void;
}

type WipeStep = 'setup' | 'confirm' | 'backup' | 'wiping' | 'complete';

export const WipeOperations = ({ device, user, onWipeStarted, onBack, onComplete }: WipeOperationsProps) => {
  const [currentStep, setCurrentStep] = useState<WipeStep>('setup');
  const [wipeMode, setWipeMode] = useState<'selective' | 'complete'>('selective');
  const [backupRequested, setBackupRequested] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wipeProgress, setWipeProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const mockFiles = [
    'Documents/Personal/',
    'Photos/Camera/',
    'Downloads/',
    'Applications/Games/',
    'System/Cache/',
    'User Data/Browser/',
  ];

  const handleSetupComplete = () => {
    setCurrentStep('confirm');
  };

  const handleConfirmWipe = () => {
    if (confirmPassword === 'confirm') {
      if (backupRequested) {
        setCurrentStep('backup');
        simulateBackup();
      } else {
        startWipe();
      }
    }
  };

  const simulateBackup = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => startWipe(), 1000);
      }
      setWipeProgress(Math.min(progress, 100));
    }, 500);
  };

  const startWipe = () => {
    setCurrentStep('wiping');
    setWipeProgress(0);
    
    const session: WipeSession = {
      id: Date.now().toString(),
      deviceId: device.id,
      mode: wipeMode,
      backupRequested,
      status: 'in-progress',
      startedAt: new Date()
    };
    
    onWipeStarted(session);

    // Simulate wipe progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep('complete');
        }, 1000);
      }
      setWipeProgress(Math.min(progress, 100));
    }, 800);
  };

  const renderSetupStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wipe Configuration</CardTitle>
          <CardDescription>Choose your sanitization method for {device.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Wipe Mode</Label>
            <RadioGroup value={wipeMode} onValueChange={(value: 'selective' | 'complete') => setWipeMode(value)} className="mt-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="selective" id="selective" />
                <div className="flex-1">
                  <Label htmlFor="selective" className="font-medium cursor-pointer">Selective File/App Wipe</Label>
                  <p className="text-sm text-muted-foreground">Remove specific files, folders, or applications</p>
                </div>
                <Files className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value="complete" id="complete" />
                <div className="flex-1">
                  <Label htmlFor="complete" className="font-medium cursor-pointer">Complete Device Wipe</Label>
                  <p className="text-sm text-muted-foreground">Secure erase entire device (OS + all data)</p>
                </div>
                <HardDrive className="h-5 w-5 text-muted-foreground" />
              </div>
            </RadioGroup>
          </div>

          {wipeMode === 'selective' && (
            <div>
              <Label className="text-base font-medium">Select Items to Wipe</Label>
              <div className="mt-3 space-y-2 border rounded-lg p-4 max-h-48 overflow-y-auto">
                {mockFiles.map((file) => (
                  <div key={file} className="flex items-center space-x-3">
                    <Checkbox 
                      id={file}
                      checked={selectedFiles.includes(file)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFiles([...selectedFiles, file]);
                        } else {
                          setSelectedFiles(selectedFiles.filter(f => f !== file));
                        }
                      }}
                    />
                    <Label htmlFor={file} className="text-sm cursor-pointer">{file}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <Checkbox 
              id="backup"
              checked={backupRequested}
              onCheckedChange={(checked) => setBackupRequested(Boolean(checked))}
            />
            <div className="flex-1">
              <Label htmlFor="backup" className="font-medium cursor-pointer">Create Backup Before Wiping</Label>
              <p className="text-sm text-muted-foreground">Encrypted AES-256 backup stored on host machine</p>
            </div>
            <Download className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Devices
        </Button>
        <Button onClick={handleSetupComplete}>
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-6 w-6 text-warning" />
          <div>
            <CardTitle className="text-warning">Confirm Destructive Operation</CardTitle>
            <CardDescription>This action cannot be undone. Please confirm your intent.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-warning-light rounded-lg border border-warning/20">
          <h4 className="font-medium text-warning-foreground mb-2">Operation Summary</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Device:</strong> {device.name}</li>
            <li><strong>Mode:</strong> {wipeMode === 'complete' ? 'Complete Device Wipe' : 'Selective File Wipe'}</li>
            <li><strong>Backup:</strong> {backupRequested ? 'Yes (AES-256 encrypted)' : 'No'}</li>
            {wipeMode === 'selective' && (
              <li><strong>Selected Items:</strong> {selectedFiles.length} items</li>
            )}
          </ul>
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirmation Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Type 'confirm' to proceed"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">Demo: type "confirm" to proceed</p>
        </div>

        <div className="flex justify-between">
          <Button onClick={() => setCurrentStep('setup')} variant="outline">
            Back to Setup
          </Button>
          <Button 
            onClick={handleConfirmWipe}
            variant="critical"
            disabled={confirmPassword !== 'confirm'}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Confirm and Start Wipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderBackupStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Creating Encrypted Backup</span>
        </CardTitle>
        <CardDescription>Backing up selected data with AES-256 encryption</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Backup Progress</span>
            <span>{Math.round(wipeProgress)}%</span>
          </div>
          <Progress value={wipeProgress} className="h-2" />
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>• Encrypting files with AES-256</p>
          <p>• Storing backup on host machine</p>
          <p>• Verifying backup integrity</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderWipingStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Secure Wipe in Progress</span>
        </CardTitle>
        <CardDescription>Following NIST SP 800-88 standards for data sanitization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Wipe Progress</span>
            <span>{Math.round(wipeProgress)}%</span>
          </div>
          <Progress value={wipeProgress} className="h-2" />
        </div>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Overwriting data with cryptographic patterns</p>
          <p>• Multiple pass verification</p>
          <p>• Secure erase commands</p>
          <p>• Generating verification logs</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderCompleteStep = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-success" />
          <div>
            <CardTitle className="text-success">Wipe Operation Completed</CardTitle>
            <CardDescription>Data sanitization successful. Certificate generated.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-success-light rounded-lg border border-success/20">
          <h4 className="font-medium text-success-foreground mb-2">Operation Results</h4>
          <ul className="space-y-1 text-sm">
            <li>✓ Data successfully sanitized</li>
            <li>✓ Verification completed</li>
            <li>✓ Certificate generated and signed</li>
            <li>✓ Audit logs created</li>
            {backupRequested && <li>✓ Encrypted backup created</li>}
          </ul>
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            Wipe Another Device
          </Button>
          <Button onClick={onComplete} variant="secure">
            View Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
                <h1 className="text-2xl font-bold">Wipe Operations</h1>
                <p className="text-sm text-muted-foreground">Secure data sanitization for {device.name}</p>
              </div>
            </div>
            
            <div className="text-right text-sm">
              <p className="font-medium">Operator: {user.name}</p>
              <p className="text-muted-foreground">Session: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {currentStep === 'setup' && renderSetupStep()}
        {currentStep === 'confirm' && renderConfirmStep()}
        {currentStep === 'backup' && renderBackupStep()}
        {currentStep === 'wiping' && renderWipingStep()}
        {currentStep === 'complete' && renderCompleteStep()}
      </div>
    </div>
  );
};