/**
 * Advanced Speech Service leveraging Native Browser Web Speech Synthesis API
 * - Prioritizes Ultra-Realistic Neural / Natural voices (Edge Natural, Chrome Google voices, Apple Natural)
 * - Listens for async 'voiceschanged' event to guarantee voice is ready
 * - Human-like pacing (0.98 rate) and warm modulation
 */

class SpeechService {
  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    this.speaking = false;
    this.voices = [];

    if (this.isSupported) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.isSupported) return;
    this.voices = window.speechSynthesis.getVoices();
  }

  /**
   * Find the most natural, human-sounding voice available on the user's OS
   */
  getBestVoice() {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    const voices = this.voices;
    if (!voices || voices.length === 0) return null;

    // 1. High-priority: Microsoft Natural/Neural voices (available in Edge & Windows 10/11)
    const neuralVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online'))
    );
    if (neuralVoice) return neuralVoice;

    // 2. High-priority: Google realistic voices (Chrome / Android)
    const googleVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Google US English') || v.name.includes('Google UK English Male'))
    );
    if (googleVoice) return googleVoice;

    // 3. Apple natural voices (Safari / macOS / iOS)
    const appleVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Alex'))
    );
    if (appleVoice) return appleVoice;

    // 4. Any English voice
    const generalEnglish = voices.find((v) => v.lang === 'en-US' || v.lang === 'en-IN' || v.lang === 'en-GB' || v.lang.startsWith('en'));
    return generalEnglish || voices[0];
  }

  /**
   * Speak given text with natural, human cadence
   * @param {string} text - Message to speak
   * @param {Function} onStart - Callback when speech begins
   * @param {Function} onEnd - Callback when speech ends
   */
  speak(text, onStart = () => {}, onEnd = () => {}) {
    if (!this.isSupported) {
      console.warn("Speech Synthesis API not supported.");
      onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Human-sounding speech modulation
      utterance.rate = 0.96; // Slightly relaxed, natural human speaking speed
      utterance.pitch = 1.0;  // Natural human frequency
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.speaking = true;
        onStart();
      };

      utterance.onend = () => {
        this.speaking = false;
        onEnd();
      };

      utterance.onerror = (e) => {
        this.speaking = false;
        onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Speech playback error:", err);
      this.speaking = false;
      onEnd();
    }
  }

  stop() {
    if (this.isSupported) {
      window.speechSynthesis.cancel();
      this.speaking = false;
    }
  }
}

export const speechService = new SpeechService();
