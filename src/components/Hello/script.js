import { createComponent } from '@h5-pure-js';
import tpl from './dom.html';
import style from './style.less';

const Hello = async (props) => {
    const data = {
        title: 'hello world!',
    };
    const events = {
        clickToHello: (e) => {
            console.log('hello world!')
        },
    };
    const component = createComponent(tpl, { data, style }, events);

    return component;
};

export default Hello;
