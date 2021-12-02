import { renderComponent } from '@h5-pure-js';
import Index from '@pages/index/script';
import IndexReady from '@pages/index/ready.js';

renderComponent(document.getElementById('app'), Index, IndexReady)