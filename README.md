# Website Audit Tool

A professional website performance and SEO analysis tool built with Next.js and powered by Google PageSpeed Insights API.

![Website Audit Tool](https://via.placeholder.com/800x400?text=Website+Audit+Tool)

## 🚀 Features

- **Performance Analysis** - Detailed page speed metrics and optimization recommendations
- **SEO Scoring** - Search engine optimization analysis
- **Accessibility Testing** - WCAG compliance and accessibility scoring
- **Best Practices** - Modern web development standards validation
- **Broken Element Detection** - Identifies critical issues like JavaScript errors, slow server response, and crawlability problems
- **Color-Coded Results** - Visual feedback with Red (Failed), Yellow (Needs Improvement), and Green (Satisfactory) scoring
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Real-time Analysis** - Live results powered by Google PageSpeed Insights

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **API:** Google PageSpeed Insights API v5
- **Deployment:** Vercel

## 📊 What It Analyzes

### Performance Metrics
- First Contentful Paint (FCP)
- Speed Index
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

### Scoring Categories
- **Performance** (0-100) - Page load speed and optimization
- **Accessibility** (0-100) - Usability for people with disabilities
- **SEO** (0-100) - Search engine optimization
- **Best Practices** (0-100) - Modern web standards compliance

### Critical Issue Detection
- JavaScript console errors
- Server response time problems
- Search engine crawlability issues
- Viewport configuration errors
- HTTP status code problems

## 🎯 Use Cases

- **Web Developers** - Analyze client websites and identify optimization opportunities
- **Digital Marketers** - Audit website performance for SEO campaigns
- **Business Owners** - Understand their website's technical health
- **Freelancers** - Offer free audits to generate leads

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Google Cloud account (for PageSpeed API key)

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/website-audit-tool.git
cd website-audit-tool
```

2. Install dependencies
```bash
npm install
```

3. Get a Google PageSpeed API key
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project and enable PageSpeed Insights API
   - Generate an API key
   - Enable billing (required for higher quotas, but API is free for first 25,000 requests/day)

4. Add your API key
   - Open `app/page.js`
   - Replace `YOUR_API_KEY` with your actual key on line 47

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (Vercel auto-detects Next.js)

Your site will be live at: `https://your-project.vercel.app`

## 🎨 Customization

### Change Color Scheme
Edit the gradient colors in `app/page.js`:
```javascript
className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
```

### Modify Score Thresholds
Adjust the scoring logic in the `getScoreInfo()` function:
```javascript
if (numScore >= 90) return 'Satisfactory'  // Green
else if (numScore >= 50) return 'Needs Improvement'  // Yellow
else return 'Failed'  // Red
```

### Update Contact Information
Change the CTA section in `app/page.js` (around line 240):
```javascript
<a href="mailto:your@email.com">Email Me</a>
<a href="tel:YOUR_PHONE">Call: YOUR_PHONE</a>
```

## 📈 API Quotas

- **Free tier:** 25,000 requests/day (with billing enabled)
- **Anonymous:** ~25-50 requests/day (without API key)

Enable billing in Google Cloud Console to access higher quotas (still free).

## 🔒 Security Notes

- Never commit API keys to public repositories
- Use environment variables for production: `process.env.NEXT_PUBLIC_API_KEY`
- Restrict API key to PageSpeed Insights API only in Google Cloud Console

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Robert Nattrass**
- Portfolio: [robnattrassiii.rf.gd](https://robnattrassiii.rf.gd)
- Email: roberthnattrassiii@gmail.com
- Phone: (281) 622-5095

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Built to help web developers deliver better websites and win more clients.**