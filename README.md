# 🤖 Discord Judge Bot

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.9.0-brightgreen.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14.16.3-blue.svg)](https://discord.js.org/)

A powerful Discord bot for creating and managing challenges with digital badge rewards and progress tracking. Features role-based challenge creation, comprehensive user statistics, and automated reward distribution.

## ✨ Features

- **Challenge Management**: Create, edit, and manage challenges with difficulty levels
- **Digital Badges**: Integrate with Badgr API for automatic digital credential issuance
- **Progress Tracking**: Comprehensive user progress and statistics with visual indicators
- **Hint System**: Progressive hint system with point cost calculations
- **Leaderboards**: Global rankings and detailed completion history
- **Role-Based Access**: Maker role system for content creators
- **Admin Tools**: Comprehensive administrative commands for bot management

## 📸 Preview

Sample screenshot showing a subset of commands

<details>
<summary>Commands</summary>

![Commands](/assets/commands.png)
</details>
<details>
<summary>Game List</summary>

![Game list](/assets/game-list-pager.png)
</details>
<details>
<summary>Game Detail</summary>

![Game detail](/assets/game-detail.png)
</details>
<details>
<summary>Leaderboard</summary>

![Leaderboard](/assets/leaderboard.png)
</details>
<details>
<summary>Notification</summary>

![Notification](/assets/notification.png)
</details>
<details>
<summary>Maker</summary>

![Maker](/assets/maker.png)
</details>
<details>
<summary>Review</summary>

![Review](/assets/review-notification.png)
</details>

## 🚀 Available Commands

### User Commands
- `/judge-register` - Register your email to receive badges
- `/judge-games` - Browse available challenges with sorting and pagination
- `/judge-hint` - Request hints for challenges (costs points)
- `/judge-submit` - Submit your answer to a challenge
- `/judge-progress` - View your progress and statistics
- `/judge-leaderboard` - View global rankings

### Maker Commands (Requires Maker Role)
- `/maker create` - Create new challenges
- `/maker edit` - Edit your existing challenges
- `/maker remove` - Remove your challenges
- `/maker list` - List all your created challenges

### Admin Commands
- `/judge-admin reset` - Reset user progress
- `/judge-admin stats` - View game statistics
- `/judge-admin manage-hints` - Manage user hint counts
- `/judge-admin user-stats` - View detailed user statistics

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v16.9.0 or higher
- Discord Bot Token
- Badgr API credentials (for digital badges)
- SQLite (included with project)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/gl0bal01/discord-judge-bot.git
cd discord-judge-bot/judge-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the judge-bot directory:

```env
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_application_client_id_here
GUILD_ID=your_development_server_id_here

# Badgr API Configuration (Optional)
BADGR_BASE_URL=https://api.badgr.io/v2
BADGR_TOKEN=your_badgr_api_token_here
```

### 4. Configure the Bot
Edit the configuration files in the `config/` directory:
- `bot.yaml` - Bot settings, admin users, and feature toggles
- `api.yaml` - External API configurations

## 🚀 Running the Bot

### 1. Deploy Commands
```bash
# For development (instant deployment to your test server)
npm run deploy

# For production (global deployment - takes up to 1 hour)
GUILD_ID= npm run deploy
```

### 2. Start the Bot
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## 📁 Project Structure

```
discord-judge-bot/
├── judge-bot/
│   ├── commands/           # Discord slash commands
│   ├── config/            # Configuration files
│   │   └── games/         # Individual challenge files
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   ├── data/              # Database storage
│   ├── logs/              # Application logs
│   └── index.js           # Main application file
├── LICENSE                # MIT License
└── README.md             # This file
```

## 🔧 Configuration

### Bot Settings (`config/bot.yaml`)
```yaml
bot:
  admins: ["admin_discord_id"]
  rate_limits:
    submit: 5
    hint: 10
  points:
    starting_points: 100
    hint_base_penalty: 10
  success_announcements:
    enabled: true
    channel_id: "channel_id"
```

### Creating Challenges
Challenges are stored in `config/games/` as YAML files. Use the `/maker create` command or manually create files following this structure:

```yaml
challenge_id:
  name: "Challenge Name"
  description: "Challenge description"
  author: "Creator Name"
  answer: "correct answer"
  difficulty: 2
  reward_type: "badgr"
  hints:
    - "First hint"
    - "Second hint"
  approved: true
```

## 🏆 Digital Badges

The bot integrates with [Badgr](https://badgr.com/) for automatic digital badge issuance:

1. Create badge classes in your Badgr account
2. Configure badge class IDs in your challenges
3. Users automatically receive badges upon challenge completion

## 🛡️ Security Features

- **Input Validation**: Comprehensive validation and sanitization
- **Parameterized Queries**: SQL injection protection
- **Role-Based Access**: Secure command permissions
- **Rate Limiting**: Protection against spam and abuse

## 📊 Statistics & Analytics

- User progress tracking with visual indicators
- Global leaderboards with pagination
- Administrative statistics and analytics
- Challenge completion rates and difficulty analysis

## 🐛 Troubleshooting

### Common Issues

**Commands not appearing:**
```bash
npm run deploy
```

**Database errors:**
- Ensure the `data/` directory exists and is writable
- Check file permissions

**API errors:**
- Verify your Discord bot token
- Check Badgr API credentials and permissions

### Debug Logging
Enable debug logging by setting the log level in `config/bot.yaml`:
```yaml
logging:
  level: "debug"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 gl0bal01

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/) - Discord API library
- [Badgr](https://badgr.com/) - Digital credentialing platform
- [SQLite](https://www.sqlite.org/) - Database engine
- [Winston](https://github.com/winstonjs/winston) - Logging library

---

**Made with ❤️ for all the Players around the world**

For support, feature requests, or bug reports, please open an issue on GitHub.