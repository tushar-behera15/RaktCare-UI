"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { BloodStock } from "@/types/BloodStock";

import BloodStockHeader from "../../_components/blood-stock/BloodStockHeader";
import BloodStockStats from "../../_components/blood-stock/BloodStockStats";
import BloodStockFilters from "../../_components/blood-stock/BloodStockFilters";
import CreateBloodStockDialog from "../../_components/blood-stock/CreateBloodStock";

import { getColumns } from "../../_components/blood-stock/columns";
import { Loader2 } from "lucide-react";
import { DataTable } from "../../_components/blood-stock/data-table";
import EditBloodStockDialog from "../../_components/blood-stock/EditBloodStock";

const BloodStockMainPage = () => {
    const [bloodStock, setBloodStock] = useState<BloodStock[]>([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [createOpen, setCreateOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const [selectedStock, setSelectedStock] =
        useState<BloodStock | null>(null);

    useEffect(() => {
        fetchBloodStock();
    }, []);
    async function fetchBloodStock() {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/hospital/bloodstock/all",
                {
                    withCredentials: true,
                }
            );

            setBloodStock(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blood stock.");
        } finally {
            setLoading(false);
        }
    };



    const handleReset = () => {
        setSearch("");
        setStatus("all");
    };

    const totalAvailable = bloodStock.reduce(
        (sum, stock) => sum + stock.availableUnits,
        0
    );

    const totalReserved = bloodStock.reduce(
        (sum, stock) => sum + stock.reservedUnits,
        0
    );

    const bloodGroups = bloodStock.length;

    const lowStock = bloodStock.filter(
        (stock) => stock.availableUnits <= 5
    ).length;

    const filteredStock = useMemo(() => {
        return bloodStock.filter((stock) => {
            const matchesSearch = stock.bloodGroup
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                status === "all"
                    ? true
                    : status === "available"
                        ? stock.availableUnits > 5
                        : status === "low"
                            ? stock.availableUnits > 0 &&
                            stock.availableUnits <= 5
                            : stock.availableUnits === 0;

            return matchesSearch && matchesStatus;
        });
    }, [bloodStock, search, status]);

    const columns = useMemo(
        () =>
            getColumns({
                onUpdate: (stock) => {
                    setSelectedStock(stock);
                    setEditOpen(true);
                }

            }),
        []
    );
    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-3">

            <BloodStockHeader
                onCreate={() => setCreateOpen(true)}
            />

            <BloodStockStats
                totalAvailable={totalAvailable}
                totalReserved={totalReserved}
                bloodGroups={bloodGroups}
                lowStock={lowStock}
            />

            <BloodStockFilters
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onReset={handleReset}
            />
            <div className="rounded-xl border bg-card">

                <DataTable
                    columns={columns}
                    data={filteredStock}
                />

                <CreateBloodStockDialog
                    open={createOpen}
                    onOpenChange={setCreateOpen}
                    onSuccess={fetchBloodStock}
                />


                <EditBloodStockDialog
                    open={editOpen}
                    stock={selectedStock}
                    onOpenChange={setEditOpen}
                    onSuccess={fetchBloodStock}
                />

            </div>
        </div>

    );
};

export default BloodStockMainPage;