/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { DonorProfile } from "@/types/Donor";
import ProfileHeader from "../../_components/profile/ProfileHeader";
import PersonalInformationCard from "../../_components/profile/PersonalInfo";
import MedicalInformationCard from "../../_components/profile/MedicalInformationCard";
import HealthInformationCard from "../../_components/profile/HealthInformtionSection";
import DonationStatisticsCard from "../../_components/profile/DonationHistoryCards";

export default function DonorProfilePage() {
    const [profile, setProfile] = useState<DonorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    // const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const { data } = await axios.get(
                    "http://localhost:5000/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                setProfile(data);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load donor profile."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Failed to load profile.
            </div>
        );
    }

    return (
        <div className="space-y-6 p-3">
            <ProfileHeader />

            <div className="grid gap-6 lg:grid-cols-2">
                <PersonalInformationCard profile={profile} />
                <MedicalInformationCard profile={profile} />
            </div>

            <HealthInformationCard profile={profile} />

            <DonationStatisticsCard profile={profile} />

            {/* <EditProfileDialog
                open={open}
                onOpenChange={setOpen}
                profile={profile}
                onSuccess={fetchProfile}
            /> */}
        </div>
    );
}