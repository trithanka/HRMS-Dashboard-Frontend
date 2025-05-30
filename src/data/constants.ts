export const LEAVE_TYPE = {
  CL: "Casual Leave",
  ML: "Medical Leave",
  RH: "Restricted Holiday",
  PL: "Parental Leave",
} as const;

export type LeaveType = "CL" | "ML" | "RH" | "PL";

export const MONTH_LIST = [
  { label: "January", id: 1 },
  { label: "February", id: 2 },
  { label: "March", id: 3 },
  { label: "April", id: 4 },
  { label: "May", id: 5 },
  { label: "June", id: 6 },
  { label: "July", id: 7 },
  { label: "August", id: 8 },
  { label: "September", id: 9 },
  { label: "October", id: 10 },
  { label: "November", id: 11 },
  { label: "December", id: 12 },
];
