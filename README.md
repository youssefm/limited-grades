This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Instructions for adding a new set

1. Add the new set to the `Set` enum
2. Update the value of the `LATEST_SET` constant in `lib/constants.ts`
3. Once Scryfall is updated, download the Oracle Cards data file [here](https://scryfall.com/docs/api/bulk-data) and update `data/oracle-cards.json` in the repo
4. Update the root redirect in `next.config.js` to redirect to the latest set
5. Push to Github

## To Do

- Switch to a darker theme
- Add card type filter? (creature/non-creature/land)
