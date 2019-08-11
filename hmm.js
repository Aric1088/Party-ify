const electronInstaller = require("electron-winstaller");

const hmm = () => {
try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: "/builds/Party-ify-win32-x64",
    outputDirectory: "/",
    authors: "Aric Zhuang",
    exe: "Party-ifyInstall.exe"
  });
  console.log("It worked!");
} catch (e) {
  console.log(`No dice: ${e.message}`);
}
}
hmm()
