// export async function processPageLoad(stats)
export async function processPageLoad(stats) {
    try {
        const response = await fetch('http://localhost:5000/edge-ai/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const aiOutput = await response.json();
        console.log("AI Decision from Backend:", aiOutput);
        return aiOutput;
    } catch (error) {
        console.error("Failed to reach backend AI, falling back to local heuristic:", error);

        // Fallback local logic in case backend is offline
        const networkSpeed = stats.networkSpeed;
        const battery = stats.battery;
        const cpuUsage = stats.cpuUsage;

        let quality = 80;
        let resolution = 720;

        if (networkSpeed < 800 || battery < 20 || cpuUsage > 90) {
            quality = 50;
            resolution = 360;
        } else if (networkSpeed <= 2000 || battery < 50 || cpuUsage > 75) {
            quality = 70;
            resolution = 480;
        }

        return { quality, resolution };
    }
}
