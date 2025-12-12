require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  SOLANA_RPC: process.env.SOLANA_RPC || 'https://api.devnet.solana.com',
  SOLANA_KEYPAIR_BASE58: process.env.SOLANA_KEYPAIR_BASE58 || null
};
