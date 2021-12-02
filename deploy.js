const crypto = require('crypto');
const fs = require('fs');
const build = require('./build')


const _md5 = (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    const md5 = fsHash.digest('hex');
    return md5;
}

async function deploy() {

    console.log('start deploy');

    // 1、对静态资源文件进行MD5
    const assetMap = {};
    const assetPath = './build/assets';
    (function md5Assets(path) {
        if (!fs.existsSync(path)) return;
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (info.isDirectory()) {
                md5Assets(absolutePath);
            } else {
                const md5 = _md5(absolutePath);
                const newName = item.replace(/\./, `_${md5}.`);
                assetMap[item] = newName;

                //md5后的文件名
                const md5FilePath = `${path}/${newName}`;
                //rename                
                fs.renameSync(absolutePath, md5FilePath);
            }
        })
    })(assetPath);
    console.log('assetMap', assetMap);

    // 2、替换css、js文件中，对静态资源的引用
    const cssAndJsPath = './build';
    (function replaceCssAndJs(path) {
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (!info.isDirectory() && (item.endsWith('.css') || item.endsWith('.js'))) {
                let file = fs.readFileSync(absolutePath, 'utf-8');
                Object.keys(assetMap).forEach(key => {
                    // 替换源文件名 -> md5文件名
                    file = file.replace(key, assetMap[key]);
                });
                fs.writeFileSync(absolutePath, file, 'utf-8');
            }
        })
    })(cssAndJsPath);

    // 3、对css文件和js文件进行MD5
    const cssMap = {};
    const jsMap = {};
    const buildPath = './build';
    (function md5CssAndJs(path) {
        const paths = fs.readdirSync(path);
        paths.forEach(function (item, index) {
            const absolutePath = `${path}/${item}`;
            const info = fs.statSync(absolutePath)

            if (!info.isDirectory()) {
                const md5 = _md5(absolutePath);
                const newName = item.replace(/\./, `_${md5}.`);
                const md5FilePath = `${path}/${newName}`;

                if (newName.endsWith('.css')) {
                    cssMap[item] = newName;
                    fs.renameSync(absolutePath, md5FilePath);
                }
                if (newName.endsWith('.js')) {
                    jsMap[item] = newName
                    fs.renameSync(absolutePath, md5FilePath);
                }
            }
        })
    })(buildPath);

    console.log('cssMap', cssMap);
    console.log('jsMap', jsMap);

    // 4、替换html文件中，对静态资源、css、js的引用
    const htmlPath = './build/index.html';
    (function replaceHTML(path) {
        let html = fs.readFileSync(path, 'utf-8');
        [assetMap, cssMap, jsMap].forEach(item => {
            Object.keys(item).forEach(key => {
                // 替换源文件名 -> md5文件名
                html = html.replace(key, item[key]);
            });
        })
        fs.writeFileSync(path, html, 'utf-8');
    })(htmlPath)
}

!(async () => {
    console.time('use time');
    console.log('---------------> begin');
    await build();
    await deploy();
    console.log('---------------> end');
    console.timeEnd('use time');
})();