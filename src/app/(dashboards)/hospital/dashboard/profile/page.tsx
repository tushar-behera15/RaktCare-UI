/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import HospitalOverview from "../../_components/profile/HospitalOverview";
import ProfileHeader from "../../_components/profile/ProfileHeader";
import axios from "axios"
import { toast } from "sonner";
import HospitalInfoCard from "../../_components/profile/HospitalInfoCard";
import AddressCard from "../../_components/profile/AdressCard";
import WorkingHoursCard from "../../_components/profile/WorkingHoursCard";
import AccountInfoCard from "../../_components/profile/AccountInfoCard";
interface User {
    userId: string;
    email: string;
    role: string;
    createdAt: string;
}

interface Hospital {
    hospitalName: string;
    registrationNumber: string;
    licenseNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    emergencyContact: string;
    openingTime: string;
    closingTime: string;
    isVerified: boolean;
}
export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [hospital, setHospital] = useState<Hospital | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                setUser(res.data.user);
                setHospital(res.data.hospital);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        };
        getMe();
    }, [])

    return (
        <div className="space-y-8 p-6">

            <ProfileHeader />
            <HospitalOverview
                user={user as User}
                hospital={hospital as Hospital}
            />

            <HospitalInfoCard
                hospital={hospital as Hospital}
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <AddressCard
                    hospital={hospital as Hospital}
                />

                <WorkingHoursCard
                    hospital={hospital as Hospital}
                />

                <AccountInfoCard
                    user={user as User}
                />



            </div>


        </div>
    );
}