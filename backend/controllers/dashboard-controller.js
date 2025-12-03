
export const getDashboardData = async (req, res) => {
    try {
        const data = await getDashboardStats();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
};

export const getDashboardResumen = async (req, res) => {
    try {
        const data = await getDashboardResumen();
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({error: error.message });
    }
};

export const getDashboardFinanzas = async (req, res) => {
    try {
        const data = await getDashboardFinanzas();
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({error: error.message });
    }
}


