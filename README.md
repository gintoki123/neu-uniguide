<div align="center">

# 🧭 NEU UniGuide

**A smart campus guide for Near East University: navigation, academic tools and an AI assistant in one app**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui&logoColor=white)

</div>

---

## Overview

NEU UniGuide helps students, staff and visitors find their way around the Near East University campus. It also gives quick answers about faculties, departments, doctors and facilities. The interface is available in **English, Turkish and Arabic**, with light and dark themes.

📄 Full project report: [Report.pdf](Report.pdf)

## Features

| Module | Highlights |
|---|---|
| **Campus map & routes** | Interactive map, route guidance between buildings, nearest-facility finder |
| **Smart search** | Departments, buildings, facilities and doctors |
| **Academic tools** | Credit tracker, workload estimator, graduation checker, course explorer, curriculum viewer |
| **AI assistant** | Campus chatbot backed by an LLM API, with a built-in NEU knowledge base and a voice assistant |
| **Doctors & facilities** | Detailed profiles, side-by-side comparison, appointment and booking requests, live status |
| **Analytics** | Department analytics, academic pathways and career outcomes (Recharts) |
| **Admin** | Manage and reset campus data |

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** Tailwind CSS 4, shadcn/ui on Radix UI, Lucide icons
- **Charts:** Recharts
- **AI:** OpenRouter chat-completions API, called from a server-side route (`app/api/chat`)

## Getting started

Requirements: **Node.js 18+** and **pnpm**.

```bash
git clone https://github.com/gintoki123/neu-uniguide.git
cd neu-uniguide
pnpm install
```

**Set up the AI assistant** (optional; without a key the rest of the app works and the chatbot shows a fallback message):

```bash
cp .env.example .env.local
# then put your key from https://openrouter.ai/keys in .env.local
```

**Run:**

```bash
pnpm dev     # http://localhost:3000
```

## Project structure

```
neu-uniguide/
├── app/
│   ├── api/chat/route.ts   # Server-side AI endpoint (reads OPENROUTER_API_KEY)
│   ├── layout.tsx
│   └── page.tsx            # App shell and section routing
├── components/
│   ├── features/           # Academic tools, booking, comparison, voice assistant…
│   ├── views/              # Main screens (dashboard, map, doctors, chatbot…)
│   └── ui/                 # shadcn/ui building blocks
├── lib/                    # Campus data, knowledge base, translations, storage
├── hooks/
├── public/
└── styles/
```

## License

Developed for educational and academic purposes at Near East University.

## Author

**Bilal Boulaalam** · [GitHub](https://github.com/gintoki123)
