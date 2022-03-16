import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

import { MagicSet } from "lib/types";

const BASE_URL = "https://www.limitedgrades.com";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fields: ISitemapField[] = [{ loc: BASE_URL }];
  for (const set of Object.values(MagicSet)) {
    fields.push({ loc: `${BASE_URL}/${set}` });
  }

  return getServerSideSitemap(context, fields);
};

// Default export to prevent next.js errors
const Sitemap = () => {};
export default Sitemap;
