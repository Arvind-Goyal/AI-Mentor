import {
  LayoutDashboard,
  Sparkles,
  Code2,
  History,
  Settings,
  CircleHelp,
} from "lucide-react";

import ROUTES from "./routes";

export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
  },
  {
    label: "Analyze",
    icon: Sparkles,
    path: ROUTES.ANALYZE,
  },
  {
    label: "Editor",
    icon: Code2,
    path: ROUTES.EDITOR,
  },
  {
    label: "History",
    icon: History,
    path: ROUTES.HISTORY,
  },
];

export const SIDEBAR_FOOTER = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Help",
    icon: CircleHelp,
    path: "/help",
  },
];