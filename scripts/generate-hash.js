// Script to generate a bcrypt hash for admin password
const bcrypt = require('bcrypt');

async function generateHash() {
  // Replace 'your-secure-password' with your desired admin password
  const password = 'your-secure-password';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Your bcrypt hash for .env.local:');
    console.log('ADMIN_PASSWORD_HASH=' + hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
