/**
 * @file reward.js - Challenge Reward Distribution Service
 * @description Automated reward system for challenge completions supporting multiple reward types.
 *              Integrates with Badgr API for digital badge issuance and handles text-based rewards.
 *              Features comprehensive error handling, database recording, and flexible reward
 *              configuration management for different challenge completion scenarios.
 * @version 1.1.0
 * @author gl0bal01
 * @since 2025-04-03
 */
const axios = require('axios');
const { recordReward } = require('./database');

class RewardService {
  constructor(config) {
    this.config = config;
    this.badgrBaseUrl = config.badgr.base_url;
    this.badgrToken = config.badgr.token;
  }

  /**
   * Issue a reward based on the game's reward type
   * @param {Object} user - User object from database
   * @param {Object} game - Game configuration with ID
   * @returns {Promise<Object>} - Reward information
   */
  async issueReward(user, game) {
    try {
      // Determine reward type
      const rewardType = game.reward_type;
      
      // Ensure we have a game ID
      const gameId = game.id || null;
      
      // Check if gameId is missing
      if (!gameId) {
        throw new Error('Game ID is required for reward issuance');
      }
      
      if (rewardType === 'badgr') {
        return await this.issueBadge(user, game, gameId);
      } else if (rewardType === 'text') {
        return await this.issueTextReward(user, game, gameId);
      } else {
        throw new Error(`Unknown reward type: ${rewardType}`);
      }
    } catch (error) {
      global.logger.error(`Error issuing reward: ${error.message}`);
      throw error;
    }
  }

  /**
   * Issue a Badgr badge
   * @param {Object} user - User object from database
   * @param {Object} game - Game configuration
   * @param {string} gameId - Game ID for database recording
   * @returns {Promise<Object>} - Badge information
   */
  async issueBadge(user, game, gameId) {
    try {
      if (!user.email) {
        throw new Error('User email is required for badge issuance');
      }

      const badgeClassId = game.badge_class_id;
      
      if (!badgeClassId) {
        throw new Error('Badge class ID is not configured for this game');
      }

      // Make API call to Badgr
      const response = await axios.post(
        `${this.badgrBaseUrl}/badgeclasses/${badgeClassId}/assertions`,
        {
          recipient: {
            identity: user.email,
            type: 'email',
            hashed: true
          },
          evidence: [
            {
              type: 'Evidence',
              narrative: `Completed the "${game.name}" challenge in Discord ScoreBot`
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.badgrToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Record the reward in the database using explicit gameId
      await recordReward(user.id, gameId, 'badgr', JSON.stringify(response.data));

      return {
        type: 'badgr',
        data: response.data,
        message: `Badge "${game.name}" issued to ${user.email}`
      };
    } catch (error) {
      global.logger.error(`Error issuing badge: ${error.message}`);
      
      // Check for specific Badgr errors
      if (error.response && error.response.data) {
        global.logger.error(`Badgr API error: ${JSON.stringify(error.response.data)}`);
      }
      
      throw error;
    }
  }

  /**
* Issue a text reward
* @param {Object} user - User object from database
* @param {Object} game - Game configuration
* @param {string} gameId - Game ID for database recording
* @returns {Promise<Object>} - Text reward information
*/
async issueTextReward(user, game, gameId) {
  try {
    const rewardText = game.reward_text;
    
    if (!rewardText) {
      throw new Error('Text reward content is not configured for this game');
    }

    // Record the reward in the database
    await recordReward(user.id, gameId, 'text', rewardText);

    return {
      type: 'text',
      data: { text: rewardText },
      message: `Text reward for "${game.name}" is available`
    };
  } catch (error) {
    global.logger.error(`Error issuing text reward: ${error.message}`);
    throw error;
  }
}
}



module.exports = RewardService;