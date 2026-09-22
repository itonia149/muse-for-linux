'use strict';

const assert = require('node:assert');
const { isInternalNav, isOpenableExternal, isAuthHost } = require('./url-policy');

// isInternalNav — only Muse + Meta auth hosts render in-app
assert.strictEqual(isInternalNav('https://muse.ai/'), true);
assert.strictEqual(isInternalNav('https://www.muse.ai/'), true);
assert.strictEqual(isInternalNav('https://muse.ai/chat'), true);
assert.strictEqual(isInternalNav('https://auth.muse.ai/aymh/?origin=https%3A%2F%2Fmuse.ai'), true);
assert.strictEqual(isInternalNav('https://auth.meta.com/login'), true);
assert.strictEqual(isInternalNav('https://accountscenter.meta.com/'), true);
assert.strictEqual(isInternalNav('https://www.meta.com/account/'), true);
assert.strictEqual(isInternalNav('https://secure.auth.meta.com/x'), true);
assert.strictEqual(isInternalNav('https://app.muse.ai/x'), true);
assert.strictEqual(isInternalNav('https://example.com/x'), false);
assert.strictEqual(isInternalNav('https://www.facebook.com/login'), false, 'FB links from chat go out');
assert.strictEqual(isInternalNav('https://evil-meta.com/x'), false);
assert.strictEqual(isInternalNav('https://evilmeta.com/x'), false);
assert.strictEqual(isInternalNav('http://muse.ai/'), false, 'http never internal');
assert.strictEqual(isInternalNav('file:///etc/passwd'), false);

// isAuthHost (auth-flow context detection)
assert.strictEqual(isAuthHost('https://auth.muse.ai/aymh/?origin=https%3A%2F%2Fmuse.ai'), true);
assert.strictEqual(isAuthHost('https://auth.meta.com/login'), true);
assert.strictEqual(isAuthHost('https://secure.auth.meta.com/x'), true);
assert.strictEqual(isAuthHost('https://accountscenter.meta.com/'), true);
assert.strictEqual(isAuthHost('https://www.meta.com/account/'), true);
assert.strictEqual(isAuthHost('https://www.facebook.com/login'), true);
assert.strictEqual(isAuthHost('https://m.facebook.com/login'), true);
assert.strictEqual(isAuthHost('https://static.xx.fbcdn.net/x'), true);
assert.strictEqual(isAuthHost('https://muse.ai/'), false);
assert.strictEqual(isAuthHost('https://example.com/x'), false);
assert.strictEqual(isAuthHost('https://evil-facebook.com/x'), false);
assert.strictEqual(isAuthHost('https://evilmeta.com/x'), false);
assert.strictEqual(isAuthHost('http://auth.meta.com/'), false);

// isOpenableExternal — only http/https/mailto ever forwarded to OS
assert.strictEqual(isOpenableExternal('https://example.com/a?b=c'), true);
assert.strictEqual(isOpenableExternal('http://example.com/a'), true);
assert.strictEqual(isOpenableExternal('mailto:a@b.c'), true);
assert.strictEqual(isOpenableExternal('javascript:alert(1)'), false);
assert.strictEqual(isOpenableExternal('file:///etc/passwd'), false);
assert.strictEqual(isOpenableExternal('data:text/html,hi'), false);

console.log('url-policy: all assertions passed');
