import { useState, useEffect } from "react";
import * as LeaveService from "../services/leaveService";
import { LeaveRequest } from "../types/leave";

/**
 * Manages the state for the Leave Requests feature.
 * Connects the Component to the Service layer.
 */
export function useLeaveRequests() {
    // State to hold the list of requests
    const [requests, setRequests] = useState<LeaveRequest[]>([]);
    
    // State to handle potential errors
    const [error, setError] = useState<string | null>(null);

    // Initial data fetch
    useEffect(() => {
        loadRequests();
    }, []);

    // Helper function to load data from Service
    const loadRequests = async () => {
        try {
            const data = await LeaveService.fetchAllLeaves();
            setRequests([...data]); // Create a new array reference
        } catch (err) {
            setError("Failed to load leave requests.");
        }
    };

    // Handler for adding a request
    const addRequest = async (newItem: LeaveRequest) => {
        try {
            await LeaveService.submitNewRequest(newItem);
            // Reload data to ensure UI is in sync with "backend"
            await loadRequests();
        } catch (err) {
            setError("Failed to add request.");
        }
    };

    // Handler for deleting a request
    const removeRequest = async (id: number) => {
        try {
            await LeaveService.removeRequest(id);
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