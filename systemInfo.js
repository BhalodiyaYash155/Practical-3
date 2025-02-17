const fs = require("fs").promises;
const os = require("os");
const path = require("path");

async function getSystemInformation() {
  try {
    const systemInfo = {
      OS_Type: os.type(),
      Platform: os.platform(),
      Architecture: os.arch(),
      Total_Memory: `${(os.totalmem() / 1e9).toFixed(2)} GB`,
      Free_Memory: `${(os.freemem() / 1e9).toFixed(2)} GB`,
      CPU_Cores: os.cpus().length,
      CPU_Model: os.cpus()[0].model,
      CPU_Speed: `${os.cpus()[0].speed} MHz`,
      Uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    };

    const logDirectory = path.join(__dirname, "logs");
    const logFile = path.join(logDirectory, "system-info.txt");

    await fs.mkdir(logDirectory, { recursive: true });

    const data = `
System Information:
-------------------
OS Type       : ${systemInfo.OS_Type}
Platform      : ${systemInfo.Platform}
Architecture  : ${systemInfo.Architecture}
Total Memory  : ${systemInfo.Total_Memory}
Free Memory   : ${systemInfo.Free_Memory}
CPU Cores     : ${systemInfo.CPU_Cores}
CPU Model     : ${systemInfo.CPU_Model}
CPU Speed     : ${systemInfo.CPU_Speed}
Uptime        : ${systemInfo.Uptime}
    `;

    await fs.writeFile(logFile, data, "utf-8");
    console.log("System information saved successfully!");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

getSystemInformation();
