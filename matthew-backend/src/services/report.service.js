const supabase = require('../config/supabase');
const { publishHash } = require('../utils/solana');
const hash = require('../utils/hashing');

/**
 * Save a tax report to database and publish to blockchain
 * @param {Object} reportData - Tax calculation or simulation data
 * @returns {Promise<Object>} - Saved report with blockchain reference
 */
async function save(reportData) {
  try {
    // Generate unique hash
    const reportHash = hash(reportData);
    
    // Publish to blockchain
    const blockchainResult = await publishHash(reportData);
    
    // Save to Supabase (if configured)
    if (supabase) {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          hash: reportHash,
          data: reportData,
          blockchain_signature: blockchainResult.signature,
          blockchain_url: blockchainResult.explorerUrl,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        success: true,
        report: data,
        blockchain: blockchainResult
      };
    } else {
      // No database configured, return report with blockchain hash
      return {
        success: true,
        report: {
          id: reportHash,
          hash: reportHash,
          data: reportData,
          blockchain_signature: blockchainResult.signature,
          blockchain_url: blockchainResult.explorerUrl,
          created_at: new Date().toISOString()
        },
        blockchain: blockchainResult,
        message: 'Database not configured. Report generated with blockchain verification.'
      };
    }
  } catch (error) {
    console.error('Report save error:', error.message);
    
    // Fallback: return report without database save
    const reportHash = hash(reportData);
    const blockchainResult = await publishHash(reportData);
    
    return {
      success: false,
      error: error.message,
      report: {
        id: reportHash,
        hash: reportHash,
        data: reportData,
        created_at: new Date().toISOString()
      },
      blockchain: blockchainResult,
      message: 'Report generated but database save failed. Blockchain hash preserved.'
    };
  }
}

/**
 * Find a report by ID or hash
 * @param {string} identifier - Report ID or hash
 * @returns {Promise<Object>} - Report data
 */
async function find(identifier) {
  try {
    if (!supabase) {
      return {
        success: false,
        error: 'Database not configured',
        message: 'Supabase credentials required to retrieve reports'
      };
    }
    
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .or(`id.eq.${identifier},hash.eq.${identifier}`)
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      report: data
    };
  } catch (error) {
    console.error('Report find error:', error.message);
    return {
      success: false,
      error: error.message,
      message: 'Report not found'
    };
  }
}

module.exports = {
  save,
  find
};
