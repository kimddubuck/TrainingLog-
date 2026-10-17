// 알림 전용 서비스 워커 — 파일을 저장(캐시)하지 않는다. 스트레칭 미션 알림을 띄우고, 누르면 앱의 미션 카드로 연다.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL('./?mission=1', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) { c.navigate(url); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
