# Skill: Add a New Magic Set to Limited Grades

Use this skill when the user asks to add a new Magic: The Gathering set to the project. This involves researching the set, downloading its SVG icon, adding a static entry in `MagicSet.tsx`, and updating the Next.js redirect config.

## Step-by-step Process

### Step 1: Research the Set on mtg.wiki

Use `fetch_webpage` to look up the set on mtg.wiki and find key information:

```
fetch_webpage({
  urls: ["https://mtg.wiki/page/<SetName>"],
  query: "MTG Arena release date, set code, set name"
})
```

- Find the **MTG Arena release date** (this is the `startDate` used in the constructor)
- Confirm the **set code** (the short lowercase code like `dsk`, `blb`, `mkm`, etc.)
- Confirm the **full set name**

If the wiki page uses underscores in the URL for multi-word set names, try that format (e.g., `https://mtg.wiki/page/Wilds_of_Eldraine`).

### Step 2: Download the Set SVG from Scryfall

Use `fetch_webpage` to get the SVG content:

```
fetch_webpage({
  urls: ["https://svgs.scryfall.io/sets/<setCode>.svg"],
  query: "SVG path data"
})
```

The SVG will contain `<path>` elements with `d` attributes. Extract:

- The `viewBox` attribute from the `<svg>` element
- All `<path d="...">` elements

### Step 3: Add a New Static Entry in MagicSet.tsx

Edit `src/lib/MagicSet.tsx` to add a new static field. The entry should be placed at the **top** of the static fields (just after the class fields and before the existing first set), since sets are ordered newest-first.

#### Basic constructor signature:

```tsx
static SET_NAME = new MagicSet(
  "setCode",           // lowercase set code (e.g., "dsk")
  "Display Name",      // human-readable name (e.g., "Duskmourn")
  "YYYY-MM-DD",        // MTG Arena release date
  (props) => (         // SVG icon component
    <GradientIcon viewBox="<viewBox from SVG>" {...props}>
      <path d="<path data>" />
    </GradientIcon>
  ),
  // Optional parameters below — omit to use defaults:
  // decks: defaults to Deck.TWO_COLOR_DECKS
  // format: defaults to Format.PREMIER_DRAFT
  // code17Lands: only needed if 17lands uses a different code
);
```

#### Constructor parameters:

| Parameter     | Type                          | Default                | Description                     |
| ------------- | ----------------------------- | ---------------------- | ------------------------------- |
| `code`        | `string`                      | required               | Lowercase set code              |
| `label`       | `string`                      | required               | Display name                    |
| `startDate`   | `string`                      | required               | Arena release date (YYYY-MM-DD) |
| `SvgIcon`     | `FC<SVGProps<SVGSVGElement>>` | required               | SVG wrapped in GradientIcon     |
| `decks`       | `(Deck \| [Deck, string])[]`  | `Deck.TWO_COLOR_DECKS` | Available deck archetypes       |
| `format`      | `Format`                      | `Format.PREMIER_DRAFT` | Draft format                    |
| `code17Lands` | `string`                      | `undefined`            | Override 17Lands set code       |

#### SVG Icon guidelines:

- Wrap the SVG paths in a `<GradientIcon>` component
- Set the `viewBox` to match the original SVG's viewBox
- Pass `{...props}` to `GradientIcon`
- Remove any `fill`, `stroke`, or style attributes from paths (GradientIcon handles the fill via gradient)
- If the SVG has a single color fill like `fill="#000"`, just remove it
- Keep all `<path>` elements with their `d` attributes

#### Special deck configurations:

For sets with non-standard archetypes (e.g., three-color sets like Khans of Tarkir), pass a custom deck array:

```tsx
static TARKIR_DRAGONSTORM = new MagicSet(
  "tdm",
  "Dragonstorm",
  "2025-04-08",
  (props) => ( /* SVG */ ),
  [
    Deck.ABZAN, Deck.JESKAI, Deck.SULTAI,
    Deck.MARDU, Deck.TEMUR, Deck.ORZHOV,
    Deck.IZZET, Deck.GOLGARI, Deck.BOROS, Deck.SIMIC,
  ]
);
```

For guild sets (only 5 of the 10 two-color pairs), pass only the relevant decks:

```tsx
[Deck.AZORIUS, Deck.RAKDOS, Deck.GRUUL, Deck.ORZHOV, Deck.SIMIC];
```

For sets with a different draft format:

```tsx
static THROUGH_THE_OMENPATHS = new MagicSet(
  "om1",
  "Through the Omenpaths",
  "2025-09-22",
  (props) => ( /* SVG */ ),
  Deck.TWO_COLOR_DECKS,
  Format.PICK_TWO_DRAFT  // non-default format
);
```

If 17Lands uses a different set code than the one in this app:

```tsx
static POWERED_CUBE = new MagicSet(
  "powered",
  "Powered Cube",
  "2025-10-28",
  CubeSvg,
  Deck.TWO_COLOR_DECKS,
  Format.PREMIER_DRAFT,
  "cube - powered"       // code17Lands override
);
```

### Step 4: Update next.config.js Redirect

Edit `next.config.js` to change the root redirect destination to the new set's code:

```javascript
redirects: async () => [
  {
    source: "/",
    destination: "/<newSetCode>",  // Update this to the new set code
    permanent: false,
  },
  // ... keep the other redirect unchanged
],
```

## File Locations Summary

| File                   | Change                                            |
| ---------------------- | ------------------------------------------------- |
| `src/lib/MagicSet.tsx` | Add new static `MagicSet` instance (newest first) |
| `next.config.js`       | Update root `/` redirect to new set code          |

## Naming Convention for Static Field

Use UPPER_SNAKE_CASE for the static field name, derived from the set name:

- "Duskmourn" → `DUSKMOURN`
- "Modern Horizons 3" → `MODERN_HORIZONS_3`
- "Brothers' War" → `BROTHERS_WAR`
- "Wilds of Eldraine" → `WILDS_OF_ELDRAINE`
- "Lorwyn Eclipsed" → `LORWYN_ECLIPSED`

## Available Formats

- `Format.PREMIER_DRAFT` (default)
- `Format.TRADITIONAL_DRAFT`
- `Format.PICK_TWO_DRAFT`

## Available Deck Groups

- `Deck.TWO_COLOR_DECKS` — all 10 two-color pairs (default)
- `Deck.MONO_COLOR_DECKS` — 5 mono-color options
- Custom array of `Deck.*` statics for sets with unique archetypes
- Decks can have custom labels via tuple syntax: `[Deck.ORZHOV, "Custom Label"]`
