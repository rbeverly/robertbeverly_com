document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const powerButton = document.getElementById("power-button")
  const modeButton = document.getElementById("mode-button")
  const sliderThumb = document.getElementById("slider-thumb")
  const sliderFill = document.querySelector(".slider-fill")
  const statusLight = document.getElementById("status-light")

  // State
  let isPowerOn = false
  let currentMode = 0
  let isDragging = false
  let currentVolume = 40 // Default position (%)

  // Add some random wear to the panel
  addRandomWear()

  // Power button click
  powerButton.addEventListener("click", () => {
    isPowerOn = !isPowerOn
    powerButton.classList.toggle("active", isPowerOn)
    statusLight.classList.toggle("on", isPowerOn)

    // Play click sound
    playClickSound(isPowerOn ? 440 : 220)
  })

  // Mode button click
  modeButton.addEventListener("click", () => {
    if (!isPowerOn) return

    currentMode = (currentMode + 1) % 3
    modeButton.classList.toggle("active", currentMode > 0)

    // Play click sound
    playClickSound(330 + currentMode * 50)
  })

  // Slider functionality
  sliderThumb.addEventListener("mousedown", startDrag)
  sliderThumb.addEventListener("touchstart", startDrag)

  function startDrag(e) {
    if (!isPowerOn) return

    isDragging = true
    document.addEventListener("mousemove", drag)
    document.addEventListener("touchmove", drag)
    document.addEventListener("mouseup", stopDrag)
    document.addEventListener("touchend", stopDrag)

    // Prevent default for touch events
    if (e.type === "touchstart") {
      e.preventDefault()
    }

    // Initial drag
    drag(e)
  }

  function drag(e) {
    if (!isDragging) return

    const track = document.querySelector(".slider-track")
    const trackRect = track.getBoundingClientRect()

    // Get position (mouse or touch)
    let clientX
    if (e.type.includes("mouse")) {
      clientX = e.clientX
    } else {
      clientX = e.touches[0].clientX
    }

    // Calculate position percentage
    let position = (clientX - trackRect.left) / trackRect.width
    position = Math.max(0, Math.min(1, position))
    currentVolume = position * 100

    // Update slider position
    updateSliderPosition()
  }

  function stopDrag() {
    isDragging = false
    document.removeEventListener("mousemove", drag)
    document.removeEventListener("touchmove", drag)
    document.removeEventListener("mouseup", stopDrag)
    document.removeEventListener("touchend", stopDrag)
  }

  function updateSliderPosition() {
    sliderThumb.style.left = `${currentVolume}%`
    sliderFill.style.width = `${currentVolume}%`
  }

  // Add random wear marks to make it look more authentic
  function addRandomWear() {
    const panel = document.querySelector(".panel")

    // Add random scratches
    for (let i = 0; i < 5; i++) {
      const scratch = document.createElement("div")
      scratch.classList.add("scratch")

      const x = Math.random() * 100
      const y = Math.random() * 100
      const length = 10 + Math.random() * 30
      const angle = Math.random() * 360
      const opacity = 0.05 + Math.random() * 0.1

      scratch.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${length}px;
        height: 1px;
        background: rgba(0,0,0,${opacity});
        transform: rotate(${angle}deg);
        pointer-events: none;
      `

      panel.appendChild(scratch)
    }

    // Add some faded spots
    for (let i = 0; i < 3; i++) {
      const spot = document.createElement("div")
      spot.classList.add("worn-spot")

      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = 20 + Math.random() * 40
      const opacity = 0.05 + Math.random() * 0.1

      spot.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255,255,255,${opacity});
        border-radius: 50%;
        filter: blur(${size / 4}px);
        pointer-events: none;
      `

      panel.appendChild(spot)
    }
  }

  // Simple audio feedback
  function playClickSound(frequency) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.type = "square"
      oscillator.frequency.value = frequency
      gainNode.gain.value = 0.1

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.start()

      // Quick decay
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)

      // Stop after 100ms
      setTimeout(() => {
        oscillator.stop()
      }, 100)
    } catch (e) {
      console.log("Audio not supported")
    }
  }
})
