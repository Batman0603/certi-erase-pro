import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText, Shield, Calendar, User, HardDrive, CheckCircle, Verified } from "lucide-react";
import { WipeSession } from "../TrustWipeApp";
import { useToast } from "@/hooks/use-toast";

interface CertificateViewProps {
  wipeSession: WipeSession | null;
  onBack: () => void;
}

export const CertificateView = ({ wipeSession, onBack }: CertificateViewProps) => {
  const { toast } = useToast();

  const downloadPDF = (certId: string) => {
    // Simulate PDF download
    const element = document.createElement('a');
    const content = `Trust Wipe Certificate ${certId} - Generated on ${new Date().toISOString()}`;
    const file = new Blob([content], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `TrustWipe_Certificate_${certId}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Certificate Downloaded",
      description: `PDF certificate ${certId} has been downloaded successfully.`,
    });
  };

  const downloadJSON = (certId: string, cert: any) => {
    // Simulate JSON download
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `TrustWipe_Certificate_${certId}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Certificate Downloaded",
      description: `JSON certificate ${certId} has been downloaded successfully.`,
    });
  };

  const viewFullCertificate = (certId: string) => {
    toast({
      title: "Certificate Viewer",
      description: `Opening full certificate view for ${certId}...`,
    });
  };

  const mockCertificates = [
    {
      id: 'CERT-2024-001',
      deviceName: 'Samsung Galaxy S23',
      deviceSerial: 'SM-S911U1-ABC123',
      wipeMode: 'Complete Device Wipe',
      operator: 'Security Administrator',
      timestamp: '2024-01-15T14:30:00Z',
      verified: true,
      standard: 'NIST SP 800-88',
      signatureAlgorithm: 'RSA-4096',
      backupCreated: false
    },
    {
      id: 'CERT-2024-002',
      deviceName: 'MacBook Pro 16"',
      deviceSerial: 'MVVM2LL/A-456',
      wipeMode: 'Selective File Wipe',
      operator: 'Security Administrator',
      timestamp: '2024-01-15T09:15:00Z',
      verified: true,
      standard: 'NIST SP 800-88',
      signatureAlgorithm: 'ECDSA-P384',
      backupCreated: true
    },
    {
      id: 'CERT-2024-003',
      deviceName: 'SanDisk Ultra USB 3.0',
      deviceSerial: 'SDCZ48-064G-789',
      wipeMode: 'Complete Device Wipe',
      operator: 'Security Administrator',
      timestamp: '2024-01-14T16:45:00Z',
      verified: true,
      standard: 'NIST SP 800-88',
      signatureAlgorithm: 'RSA-4096',
      backupCreated: false
    }
  ];

  const renderCertificatePreview = (cert: typeof mockCertificates[0]) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Trust Wipe Certificate</span>
                <Verified className="h-5 w-5 text-success" />
              </CardTitle>
              <CardDescription>Certificate ID: {cert.id}</CardDescription>
            </div>
          </div>
          <Badge className="bg-success/10 text-success" variant="secondary">
            Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Device Information */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <HardDrive className="h-4 w-4 mr-2" />
            Device Information
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Device Name:</span>
              <p className="font-medium">{cert.deviceName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Serial Number:</span>
              <p className="font-mono text-xs">{cert.deviceSerial}</p>
            </div>
          </div>
        </div>

        {/* Operation Details */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Operation Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Wipe Mode:</span>
              <p className="font-medium">{cert.wipeMode}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Standard:</span>
              <p className="font-medium">{cert.standard}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Backup Created:</span>
              <p className="font-medium">{cert.backupCreated ? 'Yes (AES-256)' : 'No'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Signature:</span>
              <p className="font-medium">{cert.signatureAlgorithm}</p>
            </div>
          </div>
        </div>

        {/* Operator & Timestamp */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Certification Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Operator:</span>
              <p className="font-medium">{cert.operator}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Date & Time:</span>
              <p className="font-medium">{new Date(cert.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Digital Signature
          </h4>
          <p className="text-xs font-mono text-muted-foreground break-all">
            SHA256: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456<br/>
            Signature: 3045022100abcdef1234567890abcdef1234567890abcdef1234567890ab...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={() => viewFullCertificate(cert.id)}>
            <Eye className="h-4 w-4 mr-2" />
            View Full Certificate
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => downloadPDF(cert.id)}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => downloadJSON(cert.id, cert)}>
            <FileText className="h-4 w-4 mr-2" />
            Download JSON
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
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Wipe Certificates</h1>
                <p className="text-sm text-muted-foreground">Tamper-proof sanitization certificates</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-success/10 text-success" variant="secondary">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Verified
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Certificate Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">{mockCertificates.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-success">{mockCertificates.filter(c => c.verified).length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{mockCertificates.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Certificate (if from current session) */}
        {wipeSession && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-success" />
              Latest Certificate - Just Generated
            </h2>
            {renderCertificatePreview(mockCertificates[0])}
          </div>
        )}

        {/* All Certificates */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All Certificates</h2>
          <div className="space-y-4">
            {mockCertificates.map((cert) => (
              <div key={cert.id}>
                {renderCertificatePreview(cert)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};