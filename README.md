# MatriSetu (मातृसेतु) 🌸

**MatriSetu** is a maternal and child healthcare navigation system connecting patients, caregivers, and doctors through a shared healthcare journey across India.

---

## Key Features

- **Multi-Role Clinical Portal**: Seamless role switcher between **Patient**, **Caregiver**, and **Doctor** views without page reloads.
- **Personalized Health Journey Visualizer**: Interactive timeline mapping completed ANC visits, current stage (Trimester 2), and upcoming clinical follow-ups with spring layout animations.
- **Government Scheme Navigator**: Filter central and state schemes (PMMVY, JSY, JSSK, Kilkari, Mission Indradhanush) by location, pregnancy stage, or child age.
- **Consent Matrix & Medical Records Vault**: Patient-owned access control center for time-stamped prescriptions, ultrasound scans, and lab reports with granular permissions for family and doctors.
- **WhatsApp Simulator Drawer**: Slide-in interactive WhatsApp bot simulator for ANC reminders, high-risk emergency triage (108 SOS), and Direct Benefit Transfer (DBT) payout alerts.
- **Bilingual Support**: Instant toggle between **English** and **Hindi**.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router) & React 19
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/muskan-101/MaitriSetu1.0.git

# Navigate into project directory
cd MatriSetu

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
MatriSetu/
├── public/              # Static assets (logo.png)
├── src/
│   ├── app/             # Next.js App Router pages & layout
│   ├── components/      # Core UI components
│   ├── context/         # React Context for global state & role switching
│   ├── data/            # Health timeline, schemes, & medical records data
│   └── types/           # TypeScript interfaces
├── tailwind.config.ts   # Custom theme & color palette configuration
└── package.json
```
