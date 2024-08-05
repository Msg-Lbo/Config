import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'app/dist');
const outputDir = path.join(__dirname, 'output');
const projectDir = "G:/projects/BotServer/BotServer/Resources/WebUi";

// 复制一份dist到项目目录
fs.rmSync(projectDir + '*', { recursive: true, force: true });
fs.cpSync(distDir, projectDir, { recursive: true });


// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 文件名年月日时分,不足补零
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hour = now.getHours().toString().padStart(2, '0');
const minute = now.getMinutes().toString().padStart(2, '0');
const fileName = `${year}${month}${day}${hour}${minute}.zip`;
const outputFilePath = path.join(outputDir, fileName);

fs.readdir(distDir, async (err, files) => {
    if (err) {
        console.error('无法读取dist目录:', err);
        return;
    }
    // 确保输出文件存在
    fs.open(outputFilePath, 'w', (err, fd) => {
        if (err) {
            console.error('无法创建输出文件:', err);
            return;
        }
        fs.close(fd, (err) => {
            if (err) {
                console.error('无法关闭输出文件:', err);
                return;
            }
            return
        });
    });

    // 打包成zip文件
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // 设置压缩级别
    });

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('压缩完成');
    });


    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(distDir, false);
    await archive.finalize();
});




