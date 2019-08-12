const electronInstaller = require("electron-winstaller");

const hmm = async () => {
try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: "./builds/Party-ify-win32-x64",
    outputDirectory: "./releases",
    authors: "Aric Zhuang",
    exe: "Party-ify.exe",
	version: "1.0.2",
  });
  console.log("It worked!");
} catch (e) {
  console.log(`No dice: ${e.message}`);
}
}
hmm()
