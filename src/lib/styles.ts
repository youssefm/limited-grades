import { Column, Grade } from "lib/types";

export const HOVER_CLASSES =
  "hover:text-blue-500 focus:text-blue-500 dark:hover:text-amber-600 dark:focus:text-amber-600";
export const TRANSITION_CLASSES = "transition-colors ease-[ease]";

export const COLUMN_ICONS: Record<Column, string> = {
  [Column.WHITE]: "ms ms-w ms-cost",
  [Column.BLUE]: "ms ms-u ms-cost",
  [Column.BLACK]: "ms ms-b ms-cost",
  [Column.RED]: "ms ms-r ms-cost",
  [Column.GREEN]: "ms ms-g ms-cost",
  [Column.MULTICOLOR]:
    "ms ms-multicolor ms-duo ms-duo-color ms-grad scale-[1.44]",
  [Column.COLORLESS]: "ms ms-c ms-cost",
};

export const GRADE_BG_COLORS: Record<Grade, string> = {
  [Grade.A_PLUS]: "bg-A+",
  [Grade.A]: "bg-A",
  [Grade.A_MINUS]: "bg-A-",
  [Grade.B_PLUS]: "bg-B+",
  [Grade.B]: "bg-B",
  [Grade.B_MINUS]: "bg-B-",
  [Grade.C_PLUS]: "bg-C+",
  [Grade.C]: "bg-C",
  [Grade.C_MINUS]: "bg-C-",
  [Grade.D_PLUS]: "bg-D+",
  [Grade.D]: "bg-D",
  [Grade.D_MINUS]: "bg-D-",
  [Grade.F]: "bg-F",
};

export const GRADE_BORDER_COLORS: Record<Grade, string> = {
  [Grade.A_PLUS]: "border-A+",
  [Grade.A]: "border-A",
  [Grade.A_MINUS]: "border-A-",
  [Grade.B_PLUS]: "border-B+",
  [Grade.B]: "border-B",
  [Grade.B_MINUS]: "border-B-",
  [Grade.C_PLUS]: "border-C+",
  [Grade.C]: "border-C",
  [Grade.C_MINUS]: "border-C-",
  [Grade.D_PLUS]: "border-D+",
  [Grade.D]: "border-D",
  [Grade.D_MINUS]: "border-D-",
  [Grade.F]: "border-F",
};
