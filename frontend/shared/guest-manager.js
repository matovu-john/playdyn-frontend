function getGuestId() {
    let guestId = localStorage.getItem('guestId');

    if (guestId === null) {
        guestId = `guest_${Date.now().toString(36)}${Math.floor(Math.random() * 10000)}`;
        localStorage.setItem('guestId', guestId);
    }
    return guestId;
}

export const guestId = getGuestId();