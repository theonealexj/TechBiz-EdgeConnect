export function createNetworkStats(loadTime, bandwidthKbps, contentType) {
    // Collect simulated hardware metrics
    const battery = navigator.getBattery ? 100 : 85;
    const cpuUsage = 40;

    return {
        networkSpeed: bandwidthKbps,
        battery,
        cpuUsage,
        contentType
    };
}
