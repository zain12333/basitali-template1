/**
 * Create an admin user in Supabase
 * Usage: node scripts/create-admin.mjs <email> <password>
 *
 * This script hashes the password using PBKDF2 (matching the login route)
 * and outputs an SQL INSERT statement you can run in Supabase SQL Editor.
 */

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password>');
  process.exit(1);
}

const salt = crypto.getRandomValues(new Uint8Array(32));
const keyMaterial = await crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(password),
  'PBKDF2',
  false,
  ['deriveBits']
);
const derivedBits = await crypto.subtle.deriveBits(
  { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
  keyMaterial,
  256
);

const saltB64 = Buffer.from(salt).toString('base64');
const hashB64 = Buffer.from(derivedBits).toString('base64');
const passwordHash = `${saltB64}:${hashB64}`;

console.log('\n--- Run this SQL in Supabase SQL Editor ---\n');
console.log(
  `INSERT INTO admin_users (email, password_hash) VALUES ('${email}', '${passwordHash}');`
);
console.log('\n--- Done ---\n');
