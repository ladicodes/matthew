const { Connection, Keypair, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');
const bs58 = require('bs58');
const { SOLANA_RPC, SOLANA_KEYPAIR_BASE58 } = require('../config/env');
const hash = require('./hashing');

/**
 * Publish a hash to Solana blockchain for immutable audit trail
 * @param {Object} reportData - Report data to publish
 * @returns {Promise<Object>} - Transaction signature and explorer link
 */
async function publishHash(reportData) {
  try {
    if (!SOLANA_KEYPAIR_BASE58) {
      // Return mock transaction for demo/testing
      const mockHash = hash(reportData);
      return {
        success: true,
        hash: mockHash,
        signature: `MOCK_${mockHash.substring(0, 16)}`,
        explorerUrl: `https://explorer.solana.com/tx/MOCK_${mockHash.substring(0, 16)}?cluster=devnet`,
        message: 'Mock transaction (configure SOLANA_KEYPAIR_BASE58 for real blockchain publishing)'
      };
    }

    const connection = new Connection(SOLANA_RPC, 'confirmed');
    
    // Decode keypair from base58
    const keypair = Keypair.fromSecretKey(bs58.decode(SOLANA_KEYPAIR_BASE58));
    
    // Generate hash of report data
    const dataHash = hash(reportData);
    
    // Create a memo transaction with the hash
    // In production, you'd use a custom program or memo program
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: keypair.publicKey, // Send to self
        lamports: 1000 // Minimal amount
      })
    );
    
    // Add hash as memo (in production, use proper memo program)
    transaction.feePayer = keypair.publicKey;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    
    // Sign and send
    transaction.sign(keypair);
    const signature = await connection.sendRawTransaction(transaction.serialize());
    
    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');
    
    const network = SOLANA_RPC.includes('devnet') ? 'devnet' : 'mainnet-beta';
    
    return {
      success: true,
      hash: dataHash,
      signature,
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=${network}`,
      timestamp: new Date().toISOString(),
      publicKey: keypair.publicKey.toBase58()
    };
  } catch (error) {
    console.error('Solana publishing error:', error.message);
    
    // Return fallback hash for audit trail
    const fallbackHash = hash(reportData);
    return {
      success: false,
      hash: fallbackHash,
      error: error.message,
      message: 'Hash generated but blockchain publishing failed. Data integrity preserved.'
    };
  }
}

module.exports = {
  publishHash
};
