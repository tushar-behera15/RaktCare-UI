export interface UserProfile {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
}

export interface Donor {
    _id: string;
    weight: number;
    hemoglobin: number;
    diseases: string[];
    donationCount: number;
    lastDonationDate: string | null;
    isAvailableForDonation: boolean;
}

export interface DonorProfile {
    user: UserProfile;
    donor: Donor;
}