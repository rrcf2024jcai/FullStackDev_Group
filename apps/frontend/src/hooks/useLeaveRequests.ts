import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react"; 
import * as LeaveService from "../services/leaveService";
import { LeaveRequest } from "../types/leave";

export function useLeaveRequests() {
    const { getToken } = useAuth(); 

    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const token = await getToken(); 
            if (!token) return; 

            // 把 Token 传给 Service
            const data = await LeaveService.fetchAllLeaves(token);
            setRequests([...data]);
        } catch (err) {
            setError("Failed to load leave requests.");
        }
    };

    const addRequest = async (newItem: Omit<LeaveRequest, "id" | "status" | "createdAt" | "updatedAt">) => {
        try {
            const token = await getToken(); 
            if (!token) return;

            await LeaveService.submitNewRequest(newItem, token);
            await loadRequests();
        } catch (err) {
            setError("Failed to add request.");
        }
    };

    const removeRequest = async (id: number) => {
        try {
            const token = await getToken(); 
            if (!token) return;

            await LeaveService.removeRequest(id, token);
            await loadRequests();
        } catch (err) {
            setError("Failed to delete request.");
        }
    };

    return {
        requests,
        error,
        addRequest,
        removeRequest
    };
}