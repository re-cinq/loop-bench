// Pages whose body is static HTML still get the shared frame and a title box.
import { mountChrome } from './chrome.js';
import { header, loadBench } from './lib.js';

await mountChrome(loadBench);
document.getElementById('header').append(header(document.title));
