import { createContext } from "react";
import { RectReadOnly } from "react-use-measure";

export const BodyMeasureCtx = createContext<RectReadOnly | null>(null)
