# Accounting Document Processing Bot

A Telegram bot built with the Mastra AI framework that processes various accounting documents like invoices and bank statements. The bot uses AI to analyze images and documents, extract relevant information, and respond in Russian.

## Features

- **Document Type Detection**: Automatically identifies the type of uploaded documents (invoices, bank statements, receipts)
- **Invoice Processing**: Extracts key information from invoices including:
  - Invoice number
  - Invoice date
  - Amount and currency
  - Due date
- **Bank Statement Analysis**: Processes bank statements to determine:
  - Statement date
  - Number of transactions
  - Currency
  - Account number
  - Bank name and BIC
- **Image Support**: Currently only supports image-based documents
- **Russian Language**: Provides responses in Russian

## Tech Stack

- Node.js with TypeScript
- Mastra AI Framework
- GPT-4 for document analysis
- Telegram Bot API (Grammy)
- Docker for containerization

## Project Structure

- `/src/agents/` - AI agents for different document processing tasks
- `/src/tools/` - Utility tools for file operations and document analysis
- `/src/bots/` - Telegram bot implementation
- `/src/types/` - TypeScript type definitions

## Setup

1. Start the containers:
```bash
docker compose up -d
```

2. Shell into the container:
```bash
docker compose exec app bash
```

3. Create a `.env` file with:
```
BOT_TOKEN=your_telegram_bot_token
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Start a chat with the bot on Telegram
2. Send an image of an invoice or bank statement
3. The bot will automatically:
   - Detect the document type
   - Extract relevant information
   - Respond with the processed data in Russian

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier
