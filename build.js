const rollup = require('rollup');

const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const cleaner = require('rollup-plugin-cleaner');
const alias = require('rollup-plugin-alias');
const html = require('rollup-plugin-html');
const html2 = require('rollup-plugin-html2');
const { terser } = require('rollup-plugin-terser');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const pxtovw = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');
const dev = require('rollup-plugin-dev');
const devConfig = require('./dev.config');

const ENV = process.env.ENV;
const IS_PROD = ENV === 'prod';

const args = process.argv.splice(2);
const isServer = ~args.indexOf('--server') || ~args.indexOf('-s');
const isWatch = ~args.indexOf('--watch') || ~args.indexOf('-w');

const config = {
    input: path.resolve('src/app.js'),
    output: {
        file: path.resolve('build/bundle.js'),
        format: 'iife'
    },
    watch: {
        exclude: ['node_modules/**']
    },
    plugins: [
        cleaner({
            targets: [
                './build/'
            ]
        }),
        alias({
            resolve: ['.js'],
            entries: [
                { find: '@h5-pure-js', replacement: path.resolve('src/h5-pure-js') },
                { find: '@components', replacement: path.resolve('src/components') },
                { find: '@pages', replacement: path.resolve('src/pages') },
            ]
        }),
        resolve(),
        html({
            include: '**/*.html',
        }),
        html2({
            template: path.resolve('public/index.html'),
            externals: [{
                file: 'bundle.css',
                pos: 'before',
            }]
        }),
        IS_PROD && terser(),
        postcss({
            //inject: true,
            minimize: IS_PROD,
            extract: path.resolve('build/bundle.css'),
            modules: true,
            plugins: [autoprefixer, pxtovw({
                viewportWidth: 750, // (Number) The width of the viewport.
                // viewportHeight: 1334, // (Number) The height of the viewport.
                unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
            })]
        }),
        copy({
            targets: [
                { src: 'src/assets', dest: 'build' }
            ]
        }),
        {
            name: 'myPlugin',
            moduleParsed(module) {
                // console.log('------------->start myPlugin:');
                // console.log(module.code);
            },
        },
        isServer && dev({
            force: true,
            dirs: ['build'],
            ...devConfig,
        }),
    ]
};

const inputOptions = {
    input: config.input,
    plugins: config.plugins,

};
const outputOptions = {
    output: config.output,
}
const watchOptions = {
    ...inputOptions,
    ...outputOptions,
    watch: config.watch,
}

async function build() {
    console.log('start build');
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);

    // dev??????watch
    if (isWatch) {
        const watcher = rollup.watch(watchOptions);
        watcher.on('event', event => {
            console.log(`watch ${event.code}`);
            // event.code???
            //   START        ??? ?????????????????????????????????
            //   BUNDLE_START ??? ?????????????????????
            //   BUNDLE_END   ??? ?????????????????????
            //   END          ??? ???????????????????????????
            //   ERROR        ??? ?????????????????????
            //   FATAL        ??? ???????????????????????????
        });

        // ????????????
        // watcher.close();
    }
}

if (require.main === module) {
    if (~args.indexOf('--exec') || ~args.indexOf('-e')) {
        !(async () => {
            console.time('use time');
            console.log('---------------> begin');
            await build();
            console.log('---------------> end');
            console.timeEnd('use time');
        })();
    } else {
        console.log('\033[42;30m Warning \033[40;32m If you want run it directly, required --exec.\033[0m')
    }
}

module.exports = build;