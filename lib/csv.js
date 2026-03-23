import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const contactFile = path.join(dataDir, 'contacts.csv');
const usersFile = path.join(dataDir, 'users.csv');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize CSV files with headers if they don't exist
function initCSV(file, headers) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, headers + '\n');
  }
}

// Initialize contact CSV
initCSV(contactFile, 'name,email,subject,message,timestamp');

// Initialize users CSV  
initCSV(usersFile, 'name,email,timestamp');

export function saveContact(data) {
  const line = `"${data.name}","${data.email}","${data.subject}","${data.message.replace(/"/g, '""')}","${new Date().toISOString()}"`;
  fs.appendFileSync(contactFile, line + '\n');
  console.log('Contact data saved to CSV');
}

export function saveUser(data) {
  const line = `"${data.name}","${data.email}","${new Date().toISOString()}"`;
  fs.appendFileSync(usersFile, line + '\n');
  console.log('User data saved to CSV');
}

export function getContacts() {
  if (!fs.existsSync(contactFile)) {
    return [];
  }
  const content = fs.readFileSync(contactFile, 'utf8');
  const lines = content.trim().split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [name, email, subject, message, timestamp] = line.split(',').map(field => field.replace(/^"|"$/g, ''));
    return { name, email, subject, message, timestamp };
  });
}

export function getUsers() {
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  const content = fs.readFileSync(usersFile, 'utf8');
  const lines = content.trim().split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [name, email, timestamp] = line.split(',').map(field => field.replace(/^"|"$/g, ''));
    return { name, email, timestamp };
  });
}