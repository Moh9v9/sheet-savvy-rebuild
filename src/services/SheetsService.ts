
/**
 * Google Sheets data service
 * 
 * This service handles communication with Google Sheets API
 * for retrieving and manipulating sheet data.
 */

// Sheet data interface
export interface SheetData {
  rows: any[];
  columns: string[];
  metadata?: {
    title?: string;
    lastUpdated?: string;
    owner?: string;
    sheetCount?: number;
  };
}

// Connection status interface
export interface SheetConnection {
  sheetId: string;
  connected: boolean;
  name: string;
  url?: string;
  lastSynced?: Date;
  error?: string;
}

// Connection history interface for persisting connections
export interface ConnectionHistory {
  recentSheets: SheetConnection[];
  addConnection(connection: SheetConnection): void;
  removeConnection(sheetId: string): void;
  getConnection(sheetId: string): SheetConnection | undefined;
}

// Create connection history singleton
const connectionHistory: ConnectionHistory = {
  recentSheets: [],
  
  addConnection(connection: SheetConnection) {
    // Remove existing connection with same ID if it exists
    this.recentSheets = this.recentSheets.filter(sheet => sheet.sheetId !== connection.sheetId);
    
    // Add to beginning of array (most recent)
    this.recentSheets.unshift({
      ...connection,
      lastSynced: new Date()
    });
    
    // Limit to 10 recent connections
    if (this.recentSheets.length > 10) {
      this.recentSheets.pop();
    }
    
    // Persist to localStorage
    try {
      localStorage.setItem('sheetSavvy_connections', JSON.stringify(this.recentSheets));
    } catch (error) {
      console.error('Failed to persist connection history', error);
    }
  },
  
  removeConnection(sheetId: string) {
    this.recentSheets = this.recentSheets.filter(sheet => sheet.sheetId !== sheetId);
    
    // Update localStorage
    try {
      localStorage.setItem('sheetSavvy_connections', JSON.stringify(this.recentSheets));
    } catch (error) {
      console.error('Failed to persist connection history', error);
    }
  },
  
  getConnection(sheetId: string) {
    return this.recentSheets.find(sheet => sheet.sheetId === sheetId);
  }
};

// Try to load saved connections from localStorage
try {
  const savedConnections = localStorage.getItem('sheetSavvy_connections');
  if (savedConnections) {
    connectionHistory.recentSheets = JSON.parse(savedConnections);
  }
} catch (error) {
  console.error('Failed to load saved connections', error);
}

// Mock functionality for now - will be replaced with actual API calls
export const SheetsService = {
  connectionHistory,
  
  // Get data from a Google Sheet
  async getSheetData(sheetId: string, range: string): Promise<SheetData> {
    console.log(`Fetching sheet data from ${sheetId}, range ${range}`);
    
    // This is just mock data for initial setup
    // Will be replaced with actual Google Sheets API calls
    return {
      columns: ['ID', 'Name', 'Email', 'Status'],
      rows: [
        ['001', 'John Doe', 'john@example.com', 'Active'],
        ['002', 'Jane Smith', 'jane@example.com', 'Pending'],
        ['003', 'Robert Johnson', 'robert@example.com', 'Active'],
        ['004', 'Emily Davis', 'emily@example.com', 'Inactive'],
        ['005', 'Michael Wilson', 'michael@example.com', 'Active'],
      ],
      metadata: {
        title: 'Customer Database',
        lastUpdated: new Date().toISOString(),
        owner: 'Current User',
        sheetCount: 3
      }
    };
  },
  
  // Connect to a Google Sheet
  async connectToSheet(sheetUrl: string): Promise<SheetConnection> {
    // Extract sheet ID from URL
    const sheetId = sheetUrl.match(/[-\w]{25,}/)?.[0] || '';
    
    if (!sheetId) {
      throw new Error('Invalid Google Sheet URL');
    }
    
    // In real implementation, would verify access and connectivity
    const connection: SheetConnection = {
      sheetId,
      connected: true,
      name: 'Customer Database',
      url: sheetUrl,
      lastSynced: new Date()
    };
    
    // Add to connection history
    this.connectionHistory.addConnection(connection);
    
    return connection;
  },
  
  // Get all sheet names/tabs in a spreadsheet
  async getSheetTabs(sheetId: string): Promise<string[]> {
    // Mock implementation - would actually call the API
    return ['Customers', 'Orders', 'Products'];
  },
  
  // Update cell values in a sheet
  async updateCells(sheetId: string, range: string, values: any[][]): Promise<boolean> {
    console.log(`Updating cells in ${sheetId}, range ${range}`);
    // Mock implementation - would actually call the API
    return true;
  },
  
  // Get recent connections
  getRecentConnections(): SheetConnection[] {
    return this.connectionHistory.recentSheets;
  },
  
  // Disconnect from a sheet
  disconnectSheet(sheetId: string): void {
    this.connectionHistory.removeConnection(sheetId);
  }
};
