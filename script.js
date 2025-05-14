const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");

let voices = [];

// Load available voices
function loadVoices() {
    voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Initial voice load (some browsers need this)
window.speechSynthesis.onvoiceschanged = loadVoices;

// Button click
convertBtn.addEventListener('click', () => {
    const enteredText = text.value.trim();
    if (!enteredText) {
        alert("Please enter some text to convert.");
        return;
    }

    const utter = new SpeechSynthesisUtterance(enteredText);
    const selectedVoice = voices.find(v => v.name === voiceSelect.value);
    if (selectedVoice) {
        utter.voice = selectedVoice;
    }

    speechSynthesis.speak(utter);
});
