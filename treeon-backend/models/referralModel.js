const db = require('../db');

/**
 * Get referral data for a donor (code, count, earned trees)
 */
exports.getData = async (donorId) => {
  const codeResult = await db.query(
    'SELECT referral_code FROM donors WHERE donor_id = $1',
    [donorId]
  );
  const countResult = await db.query(
    'SELECT COUNT(*) AS count FROM referrals WHERE referrer_id = $1',
    [donorId]
  );
  const treesResult = await db.query(
    'SELECT COALESCE(SUM(trees_earned), 0) AS trees_earned FROM referrals WHERE referrer_id = $1',
    [donorId]
  );

  return {
    code: codeResult.rows[0]?.referral_code || null,
    totalReferrals: parseInt(countResult.rows[0].count),
    treesEarned: parseInt(treesResult.rows[0].trees_earned),
  };
};

/**
 * Create a referral code for donor
 */
exports.createCode = async (donorId) => {
  // Generate a random code, e.g., donor name + random string
  const code = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  await db.query(
    'UPDATE donors SET referral_code = $1 WHERE donor_id = $2',
    [code, donorId]
  );
  return code;
};