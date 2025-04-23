
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [syncInterval, setSyncInterval] = useState(15);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and connections.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Sheets Connection</CardTitle>
          <CardDescription>
            Manage your Google Sheets API connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Connection Status</h3>
              <p className="text-sm text-muted-foreground">
                Currently using mock data
              </p>
            </div>
            <Button variant="outline">Configure API Key</Button>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Automatic Sync</h3>
              <p className="text-sm text-muted-foreground">
                Sync sheet data automatically
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={autoRefresh} 
                onCheckedChange={setAutoRefresh} 
                id="auto-refresh"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Sync Interval</h3>
              <p className="text-sm text-muted-foreground">
                How often to sync with Google Sheets
              </p>
            </div>
            <select 
              className="p-2 border rounded-md"
              value={syncInterval}
              onChange={(e) => setSyncInterval(Number(e.target.value))}
              disabled={!autoRefresh}
            >
              <option value={5}>Every 5 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Customize your application experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Enable dark theme for the application
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
                id="dark-mode"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive notifications for updates
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
                id="notifications" 
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Cache Management</h3>
              <p className="text-sm text-muted-foreground">
                Clear cached data from your application
              </p>
            </div>
            <Button variant="outline">Clear Cache</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;
