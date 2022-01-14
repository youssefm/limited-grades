This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning the repo, run:

```bash
npm install
```

to install npm dependencies. Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default, your server will make requests directly to 17lands. You can speed up development by using a Redis instance to cache results. Once you've set up your Redis instance, add the following line to `.env.local`:

```
REDIS_URL=<your Redis connection URL>
```

## Instructions for adding a new set

1. Add the new set to the `MagicSet` enum
2. Update the value of the `LATEST_SET` constant in `lib/constants.ts`
3. Once Scryfall is updated, download the Oracle Cards data file [here](https://scryfall.com/docs/api/bulk-data) and update `data/oracle-cards.json` in the repo
4. Update the root redirect in `next.config.js` to redirect to the latest set
5. Push to Github
