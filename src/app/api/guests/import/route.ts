import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';

// POST /api/guests/import - Import guests from CSV
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Check if it's a CSV file
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      return NextResponse.json(
        { message: 'Please upload a CSV file' },
        { status: 400 }
      );
    }
    
    // Read the file content
    const fileContent = await file.text();
    const rows = fileContent.split('\n');
    
    // Detect the separator (comma or semicolon)
    const firstRow = rows[0];
    const separator = firstRow.includes(';') ? ';' : ',';
    
    // Parse header row
    const header = firstRow.split(separator);
    const nameIndex = header.findIndex(col => col.trim().toLowerCase() === 'name');
    const sideIndex = header.findIndex(col => col.trim().toLowerCase() === 'side');
    const tagsIndex = header.findIndex(col => col.trim().toLowerCase() === 'tags');
    const rsvpStatusIndex = header.findIndex(col => col.trim().toLowerCase() === 'rsvp_status');
    
    // Validate required columns
    if (nameIndex === -1 || sideIndex === -1) {
      return NextResponse.json(
        { message: 'CSV file must contain "name" and "side" columns' },
        { status: 400 }
      );
    }
    
    // Parse data rows and prepare for insertion
    const guests = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (!row) continue; // Skip empty rows
      
      // Split the row into columns, handling quoted values
      const columns = [];
      let inQuotes = false;
      let currentValue = '';
      
      for (let j = 0; j < row.length; j++) {
        const char = row[j];
        
        if (char === '"' && (j === 0 || row[j-1] !== '\\')) {
          inQuotes = !inQuotes;
        } else if ((char === separator) && !inQuotes) {
          columns.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Add the last column
      columns.push(currentValue.trim());
      
      // Extract values
      const name = columns[nameIndex];
      const side = columns[sideIndex];
      
      // Validate required values
      if (!name || !side) continue;
      
      // Validate side value
      if (!['bride', 'groom'].includes(side.toLowerCase())) {
        continue;
      }
      
      // Extract optional values
      let tags: string[] = [];
      if (tagsIndex !== -1 && columns[tagsIndex]) {
        // Parse tags, removing quotes if present
        const tagsValue = columns[tagsIndex].replace(/^"(.*)"$/, '$1');
        tags = tagsValue.split(',').map(tag => tag.trim());
      }
      
      let rsvpStatus = 'pending';
      if (rsvpStatusIndex !== -1 && columns[rsvpStatusIndex]) {
        const status = columns[rsvpStatusIndex].toLowerCase();
        if (['pending', 'attending', 'declined'].includes(status)) {
          rsvpStatus = status;
        }
      }
      
      // Generate a unique invite ID
      const uniqueInviteId = uuidv4().slice(0, 8);
      
      // Add to guests array
      guests.push({
        name,
        side: side.toLowerCase(),
        tags,
        unique_invite_id: uniqueInviteId,
        rsvp_status: rsvpStatus,
      });
    }
    
    // Check if any guests were parsed
    if (guests.length === 0) {
      return NextResponse.json(
        { message: 'No valid guests found in the CSV file' },
        { status: 400 }
      );
    }
    
    // Insert guests into the database
    const { data, error } = await supabase
      .from('guests')
      .insert(guests)
      .select();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({
      message: `Successfully imported ${guests.length} guests`,
      guests: data
    }, { status: 201 });
  } catch (error) {
    console.error('Error importing guests:', error);
    return NextResponse.json(
      { message: 'An error occurred while importing guests' },
      { status: 500 }
    );
  }
}
