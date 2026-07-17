export interface Recipient {
    _id: string;
    patientName: string;
    age: number;
    gender: "male" | "female" | "other";
    contactNo: string;
    bloodGroup: string;
    unitNeeded: number;
    urgency: "high" | "medium" | "low";
    diseases: string[];
    status: "pending" | "completed";
    createdAt: string;
    updatedAt: string;
    assignedDonorId?: {
        _id: string;
        userId: {
            fullName: string;
            email: string;
            phone: string;
            bloodGroup: string;
        };
    } | null;
}