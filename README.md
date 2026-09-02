# 🩸 PulseGrid

**PulseGrid** is the most advanced, real-time blood supply chain and emergency logistics network in Kerala. By transforming passive willingness into actionable, life-saving intervention, PulseGrid bridges the gap between verified medical facilities, active donors, and emergency transport services.

![PulseGrid Vision](public/logo.jpg)

## 🌟 The Vision
In critical scenarios, latency is the enemy. Traditional methods of sourcing blood rely on fragmented databases and localized inquiries that consume precious hours. PulseGrid eliminates this entirely by mapping the complete blood supply chain onto a real-time, interactive grid.

- **482+ Verified Banks:** Connecting medical facilities across all districts.
- **12K+ Active Donors:** An ever-growing network of individuals ready to step up.
- **1.5M+ Lives Impacted:** Facilitating rapid emergency medical transports.

## 🚀 Features
- **Real-time Emergency Logistics:** Advanced geolocation algorithms identify the nearest verified facilities possessing the exact blood type required.
- **Interactive UI:** A highly immersive frontend built with Next.js and Framer Motion, featuring a live WebGL fluid physics canvas.
- **Donor Dashboard:** Seamless registration and tracking for active donors.
- **Hospital Portal:** Real-time inventory monitoring and immediate push alerts for critical shortages.
- **Intelligent Matching:** Cross-referencing hospital inventory levels with live donor coordinates to compress response times.

## 🛠️ Tech Stack
- **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, [Framer Motion](https://www.framer.com/motion/) for animations.
- **Graphics/UI:** `webgl-fluid` for interactive physics-based backgrounds, CSS Glassmorphism.
- **Backend:** Next.js Server Actions & API Routes.
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL) managed via [Prisma ORM](https://www.prisma.io/).

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### 1. Clone the repository
```bash
git clone https://github.com/Abhinavms1/pulsegrid.git
cd pulsegrid
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` or `.env.local` file in the root directory and add your Supabase / Database connection strings:
```env
DATABASE_URL="your-supabase-postgresql-connection-string"
```
*(Refer to `SUPABASE_GUIDE.md` for detailed database setup instructions).*

### 4. Prisma Setup
Initialize and migrate the database:
```bash
npx prisma generate
npx prisma db push
```
*(Optional: Run `node seed.mjs` to populate initial data).*

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live application.

## 📁 Project Structure
- `/src/app` - Next.js App Router pages (Home, About, Dashboard, Login, etc.)
- `/src/components` - Reusable React components (Navigation, WebGL Scene, etc.)
- `/public` - Static assets and images
- `/prisma` - Database schema and configuration

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License
This project is proprietary and intended for the PulseGrid Network infrastructure.
