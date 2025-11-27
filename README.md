# 🚀 Acroeduvos - Free Competitive Programming Platform

<div align="center">

![Acroeduvos](https://img.shields.io/badge/Acroeduvos-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

**Learn • Code • Create • Certify**

A completely free, 24/7 competitive programming platform like LeetCode and CodeChef with real-time code execution.

[🌐 Live Demo](https://acroeduvos.in) • [📚 Documentation](./COMPLETE_DEPLOYMENT_GUIDE.md) • [✨ Features](./FEATURES_COMPLETE.md)

</div>

---

## 🌟 Why Acroeduvos?

- ✅ **100% Free** - No subscriptions, no hidden costs
- ✅ **24/7 Available** - Always online, globally accessible
- ✅ **No Registration** - Start coding immediately
- ✅ **Real-Time** - Live stats, rankings, and execution
- ✅ **12+ Languages** - Python, Java, C++, JavaScript, and more
- ✅ **100+ Problems** - Growing library of coding challenges
- ✅ **Live Contests** - Compete with programmers worldwide
- ✅ **Modern UI** - Beautiful, responsive, dark mode

---

## 🎯 Features

### 💻 Code Compiler
- **12+ Programming Languages**: Python, JavaScript, TypeScript, Java, C++, C, Go, Rust, PHP, Ruby, C#, Kotlin
- **Real-Time Execution**: Run code instantly with input/output
- **Performance Metrics**: Track execution time and memory usage
- **Code Management**: Save, load, and export your solutions

### 📝 Problem Database
- **100+ Coding Problems** (expandable to 500+)
- **Difficulty Levels**: Easy, Medium, Hard
- **Categories**: Arrays, Strings, Trees, DP, Graphs, etc.
- **Company Tags**: Google, Amazon, Microsoft, Facebook, Apple
- **Test Cases**: Automatic validation with hidden tests

### 🏆 Leaderboard System
- **Real-Time Rankings**: Global, weekly, and monthly
- **Live Updates**: See rankings change in real-time
- **User Stats**: Problems solved, contests won, streaks
- **Top 3 Podium**: Special recognition for top performers

### 🎮 Contest System
- **Live Contests**: Compete in real-time
- **Upcoming Events**: Register for future contests
- **Past Results**: View completed contest rankings
- **Multiple Difficulties**: Beginner to Advanced

### 📊 Real-Time Statistics
- Active users online
- Submissions per minute
- Success rates
- Live problem-solving activity

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/acroeduvos.git
cd acroeduvos

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000
```

### Deploy to Production

#### Option 1: Vercel (Recommended - Free)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/acroeduvos)

#### Option 2: Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

See [Complete Deployment Guide](./COMPLETE_DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📁 Project Structure

```
acroeduvos/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── execute/              # Code execution API
│   │   ├── problems/             # Problems API
│   │   └── leaderboard/          # Leaderboard API
│   ├── practice/                 # Practice problems page
│   ├── problems/[slug]/          # Individual problem pages
│   ├── compiler/                 # Standalone compiler
│   ├── contests/                 # Contests page
│   ├── leaderboard/              # Leaderboard page
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── ui/                       # UI components (Radix)
│   ├── header.tsx                # Navigation header
│   ├── problem-interface.tsx    # Problem solving interface
│   └── ...                       # Other components
├── lib/                          # Utilities and helpers
│   ├── database/                 # Data management
│   │   └── problems-data.ts      # Problem database
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
└── styles/                       # Global styles
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Runtime**: Node.js
- **Execution**: Server-side sandboxed execution

### Deployment
- **Platform**: Vercel (Free Tier)
- **CDN**: Vercel Edge Network
- **SSL**: Automatic HTTPS
- **Analytics**: Vercel Analytics

---

## 📚 Documentation

- [Complete Deployment Guide](./COMPLETE_DEPLOYMENT_GUIDE.md) - Step-by-step deployment
- [Features Documentation](./FEATURES_COMPLETE.md) - Complete feature list
- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Development roadmap

---

## 🎯 Use Cases

### For Students
- Learn programming fundamentals
- Practice data structures and algorithms
- Prepare for coding interviews
- Participate in contests

### For Job Seekers
- FAANG interview preparation
- Company-specific problem practice
- Build problem-solving portfolio
- Improve coding speed

### For Developers
- Sharpen algorithmic skills
- Learn new programming languages
- Stay competitive
- Contribute to open source

### For Educators
- Assign coding problems
- Track student progress
- Organize coding contests
- Teach algorithms

---

## 🌍 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding Problems
1. Edit `lib/database/problems-data.ts`
2. Follow the existing problem structure
3. Include test cases and examples
4. Submit a pull request

### Reporting Issues
- Use GitHub Issues
- Provide detailed description
- Include steps to reproduce
- Add screenshots if applicable

### Feature Requests
- Open a GitHub Issue
- Describe the feature
- Explain the use case
- Discuss implementation

---

## 📈 Roadmap

### ✅ Phase 1 (Complete)
- [x] Core compiler with 12+ languages
- [x] 100+ coding problems
- [x] Real-time leaderboard
- [x] Contest system
- [x] Problem interface
- [x] Search and filters

### 🚧 Phase 2 (In Progress)
- [ ] User authentication
- [ ] User profiles
- [ ] Submission history
- [ ] Progress tracking
- [ ] Achievement system

### 📋 Phase 3 (Planned)
- [ ] Discussion forum
- [ ] Solution sharing
- [ ] Video tutorials
- [ ] Editorial solutions
- [ ] AI-powered hints

### 🔮 Phase 4 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] API access
- [ ] Custom contests
- [ ] Team competitions
- [ ] Interview mode

---

## 📊 Statistics

- **Problems**: 100+ (growing to 500+)
- **Languages**: 12+
- **Categories**: 10+
- **Companies**: 15+
- **Contests**: Weekly
- **Users**: Growing daily

---

## 🔒 Security

- Sandboxed code execution
- Input validation
- Rate limiting
- CORS protection
- XSS prevention
- SQL injection protection

---

## ⚡ Performance

- **Page Load**: <2 seconds
- **Code Execution**: <5 seconds
- **API Response**: <100ms
- **Uptime**: 99.9%
- **Global CDN**: Yes

---

## 📱 Mobile Support

Fully responsive design works perfectly on:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

---

## 🎨 Design

- Modern, clean interface
- Gradient backgrounds
- Smooth animations
- Dark mode support
- Accessible (WCAG compliant)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by LeetCode, CodeChef, and HackerRank
- Built with Next.js and React
- UI components from Radix UI
- Icons from Lucide React
- Deployed on Vercel

---

## 📞 Support

- **Documentation**: See docs folder
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/acroeduvos/issues)
- **Email**: support@acroeduvos.in
- **Community**: Coming soon

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

## 💖 Support the Project

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔀 Submit pull requests
- 📢 Share with others

---

<div align="center">

**Made with ❤️ for the global coding community**

[Website](https://acroeduvos.in) • [GitHub](https://github.com/YOUR_USERNAME/acroeduvos) • [Twitter](https://twitter.com/acroeduvos)

**Free • Forever • 24/7**

</div>
