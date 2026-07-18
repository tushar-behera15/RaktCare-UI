export interface BloodStock {
    _id: string;

    hospitalId: string;

    bloodGroup:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

    availableUnits: number;

    reservedUnits: number;

    totalUnits: number;

    lastUpdated: string;
}