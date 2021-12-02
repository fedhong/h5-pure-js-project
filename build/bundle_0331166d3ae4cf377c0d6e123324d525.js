(function () {
    'use strict';

    /**
     * doT.js https://github.com/olado/doT
     */
    !function () { var u, d = { name: "doT", version: "1.1.1", templateSettings: { evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g, interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g, define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: !0, append: !0, selfcontained: !1, doNotSkipEncoded: !1 }, template: void 0, compile: void 0, log: !0 }; d.encodeHTMLSource = function (e) { var n = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" }, t = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g; return function (e) { return e ? e.toString().replace(t, function (e) { return n[e] || e }) : "" } }, u = function () { return this || (0, eval)("this") }(), "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define(function () { return d }) : u.doT = d; var s = { append: { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" }, split: { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" } }, p = /$^/; function l(e) { return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ") } d.template = function (e, n, t) { var r, o, a = (n = n || d.templateSettings).append ? s.append : s.split, c = 0, i = n.use || n.define ? function r(o, e, a) { return ("string" == typeof e ? e : e.toString()).replace(o.define || p, function (e, r, n, t) { return 0 === r.indexOf("def.") && (r = r.substring(4)), r in a || (":" === n ? (o.defineParams && t.replace(o.defineParams, function (e, n, t) { a[r] = { arg: n, text: t }; }), r in a || (a[r] = t)) : new Function("def", "def['" + r + "']=" + t)(a)), "" }).replace(o.use || p, function (e, n) { o.useParams && (n = n.replace(o.useParams, function (e, n, t, r) { if (a[t] && a[t].arg && r) { var o = (t + ":" + r).replace(/'|\\/g, "_"); return a.__exp = a.__exp || {}, a.__exp[o] = a[t].text.replace(new RegExp("(^|[^\\w$])" + a[t].arg + "([^\\w$])", "g"), "$1" + r + "$2"), n + "def.__exp['" + o + "']" } })); var t = new Function("def", "return " + n)(a); return t ? r(o, t, a) : t }) }(n, e, t || {}) : e; i = ("var out='" + (n.strip ? i.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : i).replace(/'|\\/g, "\\$&").replace(n.interpolate || p, function (e, n) { return a.start + l(n) + a.end }).replace(n.encode || p, function (e, n) { return r = !0, a.startencode + l(n) + a.end }).replace(n.conditional || p, function (e, n, t) { return n ? t ? "';}else if(" + l(t) + "){out+='" : "';}else{out+='" : t ? "';if(" + l(t) + "){out+='" : "';}out+='" }).replace(n.iterate || p, function (e, n, t, r) { return n ? (c += 1, o = r || "i" + c, n = l(n), "';var arr" + c + "=" + n + ";if(arr" + c + "){var " + t + "," + o + "=-1,l" + c + "=arr" + c + ".length-1;while(" + o + "<l" + c + "){" + t + "=arr" + c + "[" + o + "+=1];out+='") : "';} } out+='" }).replace(n.evaluate || p, function (e, n) { return "';" + l(n) + "out+='" }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), r && (n.selfcontained || !u || u._encodeHTML || (u._encodeHTML = d.encodeHTMLSource(n.doNotSkipEncoded)), i = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + d.encodeHTMLSource.toString() + "(" + (n.doNotSkipEncoded || "") + "));" + i); try { return new Function(n.varname, i) } catch (e) { throw "undefined" != typeof console && console.log("Could not create a template function: " + i), e } }, d.compile = function (e, n) { return d.template(e, null, n) }; }();

    const eval2 = eval;
    const DATA_EVENT_KEY = 'data_event_$_key';
    const $EVENT = '$event';
    const supportEventList = ['change', 'click', 'mouseover', 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'];
    const eventsHandler = {};
    window.h5_pure_js_event_index = typeof (window.h5_pure_js_event_index) !== 'undefined' ? window.h5_pure_js_event_index : -1;

    const _genEventKey = (on) => {
        return DATA_EVENT_KEY.replace('$', on);
    };

    const _genUniqueId = (on) => {
        const CRC_TAB = ['F', '_', 'E', 'd', 'H', 'o', 'N', 'g', 'V', '5'];
        const current = `${++window.h5_pure_js_event_index}`.split('');
        const res = [];
        for (let i = 0, l = current.length; i < l; i++) {
            res.push(CRC_TAB[current[i]]);
        }

        return `${on}_${res.join('_')}`;
    };

    const _bindEvent = (node, on, events = {}) => {
        const onEvent = `on${on}`;
        if (node[onEvent]) {
            let strName = '';
            let strParams = '';
            const eventHandler = node.getAttribute(onEvent).replace(/^\s+|\s+$/gm, '');

            if (eventHandler.substring(eventHandler.length - 1) === ')') {
                //传递参数
                const index = eventHandler.indexOf('(');
                strName = eventHandler.substring(0, index);
                strParams = eventHandler.substring(index + 1, eventHandler.length - 1);
            } else {
                //未传递参数
                strName = eventHandler;
            }
            Object.keys(events).forEach(key => {
                if (key === strName) {
                    const uniqueKey = _genEventKey(on);
                    const uniqueId = _genUniqueId(on);
                    node.setAttribute(uniqueKey, uniqueId);
                    if (strParams) {
                        const hasEventArg = strParams.indexOf($EVENT) === 0;

                        if (hasEventArg) {
                            strParams = strParams.replace($EVENT, '');
                        }

                        eventsHandler[on][uniqueId] = function (e) {
                            const args = eval2(`[${strParams}]`);
                            if (hasEventArg) {
                                args[0] = e;
                            }
                            return events[key](...args);
                        };
                    } else {
                        eventsHandler[on][uniqueId] = function (e) {
                            return events[key](e);
                        };
                    }
                }
            });
            node.removeAttribute(onEvent);
        }
    };

    supportEventList.forEach(on => {
        //初始化事件处理对象
        eventsHandler[on] = {};

        //添加事件
        document.addEventListener(on, function (e) {
            const list = [];
            let cur = e.target;
            while (cur && cur.tagName !== 'HTML') {
                const uniqueKey = _genEventKey(on);
                const uniqueId = cur.getAttribute(uniqueKey);
                uniqueId && list.push(uniqueId);
                cur = cur.parentNode;
            }
            for (let i = 0, l = list.length; i < l; i++) {
                const uniqueId = list[i];
                const bubbling = eventsHandler[on][uniqueId] && eventsHandler[on][uniqueId](e);
                if (bubbling === false) {
                    break;
                }
            }
        });
    });

    const createComponent = (tpl, dataAndStyle, events) => {
        const html = doT.template(tpl)(dataAndStyle);
        const container = document.createElement('div');
        container.innerHTML = html;
        const nodes = container.getElementsByTagName('*');
        for (let i = 0, l = nodes.length; i < l; i++) {
            for (let j = 0, jl = supportEventList.length; j < jl; j++) {
                _bindEvent(nodes[i], supportEventList[j], events);
            }
        }
        return container.innerHTML;
    };

    const renderComponent = async (container, component, ready) => {
        const html = await component();
        container.innerHTML = html;
        ready && ready();
    };

    var tpl$1 = "<div onclick=\"clickToHello($event)\" class=\"{{=it.style.hello}}\">\n    <div class=\"{{=it.style.title}}\">{{=it.data.title}}</div>\n    <div class=\"{{=it.style['ball-container']}}\">\n      <div class=\"{{=it.style.ball}}\"></div>\n      <div class=\"{{=it.style.shadow}}\"></div>\n    </div>\n  \n</div>\n";

    var style$1 = {"hello":"style_hello__2touE","title":"style_title__2fMqH","ball-container":"style_ball-container__3l2C4","ball":"style_ball__1Frtf","animate":"style_animate__3UcgR","shadow":"style_shadow__1QagS","move":"style_move__2lStJ"};

    const Hello = async (props) => {
        const data = {
            title: 'hello world!',
        };
        const events = {
            clickToHello: (e) => {
                console.log('hello world!');
            },
        };
        const component = createComponent(tpl$1, { data, style: style$1 }, events);

        return component;
    };

    var tpl = "<div class=\"{{=it.style.main}}\">\n    {{= it.data.helloComp}}\n</div>\n<div class=\"{{=it.style.assetsTest}}\"></div>\n<img class=\"{{=it.style.assetsImg}}\" src=\"assets/img/test_373f4cac2dbb5b270fa26506b85b7101.png\">";

    var style = {"main":"style_main__19ouv","assetsTest":"style_assetsTest__J0nL_","assetsImg":"style_assetsImg__2esFd"};

    const Index = async (props) => {
        const data = {
            helloComp: await Hello(),
        };
        const events = {};
        const component = createComponent(tpl, { data, style }, events);

        return component;
    };

    // 骨架屏消失
    const hideSkeleton = () => {
        const skeleton = document.getElementById('skeleton-screen');
        skeleton.style.opacity = 0;
        setTimeout(() => {
            skeleton.style.display = 'none';
        }, 500);
    };

    const Ready = () => {
        // 模拟数据加载耗时
        setTimeout(() => {
            hideSkeleton();
        }, 2000);

    };

    renderComponent(document.getElementById('app'), Index, Ready);

})();
