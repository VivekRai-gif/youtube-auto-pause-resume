let video;

function getVideo() {
  video = document.querySelector('video');
}

// Pause video safely
function pauseVideo() {
  getVideo();
  if (video && !video.paused && !video.ended) {
    video.pause();
    console.log("⏸️ Paused: You switched tab/app or minimized.");
  }
}

// Resume video safely
function resumeVideo() {
  getVideo();
  if (video && video.paused && !video.ended) {
    // Auto mute if not already muted to bypass autoplay block
    if (!video.muted) {
      video.muted = true;
      console.log("🔇 Muted: Video was unmuted, auto-muted to bypass autoplay block.");
    }

    video.play().then(() => {
      console.log("▶️ Resumed: You returned to Edge + YouTube.");
    }).catch((err) => {
      console.warn("❌ Resume failed (autoplay blocked?):", err);
    });
  }
}

// Handle tab visibility change
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseVideo();
  } else {
    resumeVideo();
  }
});

// Handle app switch or window blur/focus
window.addEventListener("blur", pauseVideo);
window.addEventListener("focus", resumeVideo);

// Optional: Log status every few seconds (for debugging)
setInterval(() => {
  getVideo();
  if (video) {
    console.log(`[Status] Playing: ${!video.paused}, Muted: ${video.muted}, Ended: ${video.ended}`);
  }
}, 15000); // logs every 15s
