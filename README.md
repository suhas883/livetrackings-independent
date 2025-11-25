# LiveTrackings - Independent Deployment

This is a completely independent deployment of LiveTrackings using:
- **GitHub**: Version control and source code repository
- **Cloudflare Pages**: Free static hosting and automatic deployments
- **Cloudflare Workers**: Serverless function deployment
- **Your Domain**: Full control over livetrackings.com

## Features

- 100% independent from Bolt.new
- Free hosting with Cloudflare Pages
- Automatic deployments from GitHub
- Custom domain support
- Full control over your code and infrastructure
- No vendor lock-in

## Quick Start

### Prerequisites
- GitHub account (already set up)
- Cloudflare account (already set up)
- Node.js (for local development)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Deployment

```bash
npm run deploy
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Project Structure

- `src/` - Source code
- `public/` - Static files
- `wrangler.toml` - Cloudflare Workers configuration
- `package.json` - Node.js dependencies
- `.env.example` - Environment variable template

## Deployment Status

- Pages Project: `livetrackings-independent.pages.dev`
- Custom Domain: Coming soon
- Status: Ready for deployment

## Support

For issues or questions, check the GitHub issues page.

---

**100% Independent | Full Control | Free Hosting**
