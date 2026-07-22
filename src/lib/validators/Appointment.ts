export type BloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

export type AppointmentStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "completed"
    | "cancelled";

export interface DonorUser {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    bloodGroup: BloodGroup;
}

export interface Donor {
    _id: string;
    userId: DonorUser;
    isAvailableForDonation: boolean;
    lastDonationDate: string | null;
    donationCount: number;
}

export interface Hospital {
    _id: string;
    hospitalName: string;
    address: string;
    contactNo: string;
}

export interface Appointment {
    _id: string;
    donorId: Donor;
    hospitalId: Hospital;
    appointmentDate: string;
    status: AppointmentStatus;
    remarks?: string;
    createdAt: string;
    updatedAt: string;
}