if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Benjamin F. Green',
        artist: 'Audio Engineer',
        artwork: [
            {
                src: './assets/studiofavicon-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            },
            {
                src: './assets/studiofavicon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: './assets/studiofavicon-180x180.png',
                sizes: '180x180',
                type: 'image/png'
            }
        ]
    });

    // Optional: Handle media session actions
    navigator.mediaSession.setActionHandler('play', function() {
        // Handle play action if needed
    });
    navigator.mediaSession.setActionHandler('pause', function() {
        // Handle pause action if needed
    });
}
