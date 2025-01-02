# Invoice Management

The project provides interface for managing invoices, allowing user to visualize invoices data via [shadcn/chart](https://ui.shadcn.com/docs/components/chart)

![landing-img](./public/landing.png)

## Tech stacks

- [Next.js (v15)](https://nextjs.org/docs)
- [AuthJs](https://authjs.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com)
- [Prisma](https://www.prisma.io/)
- [Neon](https://console.neon.tech/app/projects) for `database`
- [Conform](https://conform.guide/) & [Zod](https://zod.dev/) for `form validation & management`
- [Mailtrap](https://mailtrap.io/)

## Getting Started

First, install the dependencies via:

```bash
pnpm install
```

Then create `.env` file in the root folder with variables in [.env.example](./.env.example). Make sure all values in the file is filled:

```bash
AUTH_SECRET= # Added by `npx auth`. Read more: https://cli.authjs.dev

# Information from SMTP server (Mailtrap)
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=

# Information from SMTP server (Mailtrap)
MAILTRAP_TOKEN=

DATABASE_URL= #Database URI
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
