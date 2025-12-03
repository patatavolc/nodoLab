import {
    getFullDashboardStats,
    getStatsResumen,
    getStatsFinanzas,
    getStatsRecursos,
    getStatsReservas,
} from "../services/dashboard.service.js";

export const getDashboardData = async (req, res) => {
    try {
        const data = await getFullDashboardStats();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDashboardResumen = async (req, res) => {
    try {
        const data = await getStatsResumen();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDashboardFinanzas = async (req, res) => {
    try {
        const data = await getStatsFinanzas();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDashboardRecursos = async (req, res) => {
    try {
        const data = await getStatsRecursos();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDashboardReservas = async (req, res) => {
    try {
        const data = await getStatsReservas();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
