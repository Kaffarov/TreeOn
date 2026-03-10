const express = require('express');
const db = require('../db');
const router = express.Router();

// Get donor dashboard data
router.get('/:donorId/dashboard', async (req, res) => {
  const { donorId } = req.params;
  try {
    const donor = await db.query(
      `SELECT 
         d.donor_id,
         u.first_name || ' ' || u.last_name AS name,
         d.total_trees,
         d.total_donated,
         s.plan_type,
         s.next_billing_date
       FROM donors d
       JOIN users u ON d.donor_id = u.user_id
       LEFT JOIN subscriptions s ON d.donor_id = s.donor_id AND s.status = 'active'
       WHERE d.donor_id = $1`,
      [donorId]
    );

    const recentTrees = await db.query(
      `SELECT tree_id, species, planted_date, location
       FROM trees
       WHERE donor_id = $1
       ORDER BY planted_date DESC
       LIMIT 5`,
      [donorId]
    );

    res.json({
      donor: donor.rows[0],
      recentTrees: recentTrees.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;