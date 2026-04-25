import { createContext } from "react";

import type { SetIconData } from "./setIconLoader";

const SetIconDataContext = createContext<Record<string, SetIconData>>({});

export default SetIconDataContext;
