export function getServerPerformanceStatus() {
  return {
    cpuUsage: process.cpuUsage(),
    memory: process.memoryUsage(),
  };
}
