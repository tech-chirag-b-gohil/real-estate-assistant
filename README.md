# Real Estate Assistant

A multi-agent AI-powered assistant for real estate inquiries and property analysis, built with **Next.js (React)** for the frontend and **FastAPI (Python)** for the backend.

## Features

- Multi-agent support (Property Analyzer, Tenancy FAQ, Smart Router)
- Image upload and property issue analysis
- Rental law and tenancy Q&A
- Real-time chat UI with streaming responses
- Modern UI with Tailwind CSS and Redux state management

## Tech Stack

- **Frontend:** Next.js, React, Redux, Tailwind CSS
- **Backend:** FastAPI, OpenAI API
- **Other:** TypeScript, Python, Vercel (deployment)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- [OpenAI API Key](https://platform.openai.com/account/api-keys)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd real-estate-assistant
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   ```

3. **Install backend dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-openai-key
     ```

### Running the App

Start both the Next.js frontend and FastAPI backend in development mode:

```sh
npm run dev
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)
- The backend API will run on [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Build for Production

```sh
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app directory (frontend)
- `components/` - React UI components
- `redux/` - Redux state management
- `api/` - FastAPI backend (Python)
- `lib/` - Shared utilities and agent definitions

## Customization

- **Agents:** Edit [`lib/agents.ts`](lib/agents.ts) to add or modify agents.
- **Prompts:** Update system prompts in [`api/constants/prompts.py`](api/constants/prompts.py).

## License

MIT

---

*Built with ❤️ using