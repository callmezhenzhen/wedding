const fs = require('fs');
const path = require('path');
const RegValidFiles = /\.js|\.ts|\.vue|\.html/g;
const RegPiontInfo = /##(\S{0,})\|{1,}(\d{4}-\d{2}-\d{2})\|{1,}(\S{1,})##/g

// 读取文件，同步操作
const readFile = (files) => {
    let records = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let data = fs.readFileSync(files[i], 'utf8');
        getRecords(data, records, files[i]);
    }
    return records
}

// 读取目录，同步操作
const readdir = (dir, fileList) => {
    let files = fs.readdirSync(dir, 'utf8');
    for (let i = 0, len = files.length; i < len; i++) {
        let fullPath = path.join(dir, files[i]);
        let st = fs.statSync(fullPath);
        if (st.isDirectory()) { //目录
            readdir(fullPath, fileList);
        } else { //文件
            if (RegValidFiles.test(files[i])) fileList.push(fullPath); //给定类型的文件
        }
    }
    return fileList
}

// 获取记录信息
const getRecords = (data, records, filePath) => {
    let array;
    while ((array = RegPiontInfo.exec(data)) !== null) {
        records.push({ // 姓名|过期时间|action值
            name: array[1],
            expir: array[2],
            action: array[3],
            path: filePath
        });
    }
}

// 执行入口
const main = () => {
    console.log(Date.now());
    let files = readdir('./src', []); 
    let records = readFile(files);
    console.log(records)
    console.log(Date.now());
}

main();

