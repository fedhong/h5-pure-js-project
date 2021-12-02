import { createComponent } from '@h5-pure-js';
import Hello from '@components/Hello/script.js';

import tpl from './dom.html';
import style from './style.less';

const Index = async (props) => {
    const data = {
        helloComp: await Hello(),
    };
    const events = {};
    const component = createComponent(tpl, { data, style }, events);

    return component;
};

export default Index;
