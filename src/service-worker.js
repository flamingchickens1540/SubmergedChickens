// @ts-nocheck
self.addEventListener("push", event => {
    let pushData = event.data.json()

    self.registration.showNotification(pushData.title, pushData).then(() => {
        console.log("Notification shown")
    })
})

self.addEventListener("notificationclick", event => {
    event.notification.close()

    event.waitUntil(
        clients.openWindow(`/`).then(windowClient => {
            windowClient?.focus()
        })
    )
})
