export interface Day {
  date: string;
  times: [string, string][];
  availability: "available" | "unavailable";
}
