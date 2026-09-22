'use strict';

// URL policy for muse-for-linux: pure module, runs under bare node (no Electron).
//
// Hard rule: every clicked link (http/https/mailto) opens in the system
// default browser — never inside the app. Only https: on known Muse / Meta
// auth hosts renders in-app.

const ALLOWED_NAV_HOSTS = [
  'muse.ai',
  'www.muse.ai',
  'auth.muse.ai',
  'auth.meta.com',
  'accountscenter.meta.com',
  'meta.com',
  'www.meta.com',
];

// *.meta.com covers per-region / per-tenant auth endpoints
// (auth.meta.com, secure.*.meta.com, etc.).
// *.muse.ai covers future app shells on the same product domain.
const ALLOWED_NAV_HOST_SUFFIXES = ['.meta.com', '.muse.ai'];

const OPENABLE_PROTOCOLS = new Set(['https:', 'http:', 'mailto:']);

// Identity-provider infrastructure. No static list can enumerate every host an
// auth flow touches (Continue with Facebook, device login, per-tenant
// endpoints), so instead of allowlisting targets we detect being INSIDE an
// auth flow: main.js allows any https navigation/popups while the current
// page is an auth host, and routes links out everywhere else (chatting).
const AUTH_HOSTS = [
  'auth.muse.ai',
  'auth.meta.com',
  'accountscenter.meta.com',
  'www.meta.com',
  'meta.com',
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
];
const AUTH_HOST_SUFFIXES = [
  '.meta.com',
  '.facebook.com',
  '.fbcdn.net',
  '.fbsbx.com',
];

function isAuthHost(urlStr) {
  try {
    const u = new URL(urlStr);
    return (
      u.protocol === 'https:' &&
      (AUTH_HOSTS.includes(u.hostname) ||
        AUTH_HOST_SUFFIXES.some((s) => u.hostname.endsWith(s)))
    );
  } catch {
    return false;
  }
}

function isInternalNav(urlStr) {
  try {
    const u = new URL(urlStr);
    return (
      u.protocol === 'https:' &&
      (ALLOWED_NAV_HOSTS.includes(u.hostname) ||
        ALLOWED_NAV_HOST_SUFFIXES.some((s) => u.hostname.endsWith(s)))
    );
  } catch {
    return false;
  }
}

function isOpenableExternal(urlStr) {
  try {
    const u = new URL(urlStr);
    return OPENABLE_PROTOCOLS.has(u.protocol);
  } catch { return false; }
}

module.exports = { isInternalNav, isOpenableExternal, isAuthHost };
