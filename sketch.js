let song;
let fft;
let amplitude;
let ampSlider;

function preload() {
  song = loadSound("audio/sample-visualisation.mp3");
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  fft = new p5.FFT(0.4, 128);
  song.connect(fft);

  amplitude = new p5.Amplitude();
  song.connect(amplitude);

  ampSlider = createSlider(0, 1, 0.5, 0.01);
  ampSlider.position(10, height - 30);
}

function draw() {
  background(0);
  colorMode(HSB);
  let spectrum = fft.analyze();

  let baseRadius = 80; 
  let step = 360 / spectrum.length;

  translate(width / 2, height / 2);
  noFill();
  strokeWeight(2);

  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, 360);
    let specValue = spectrum[i] * ampSlider.value();
    let r = baseRadius + map(specValue, 0, 255, 0, 60); 

    let x1 = baseRadius * cos(angle);
    let y1 = baseRadius * sin(angle);
    let x2 = r * cos(angle);
    let y2 = r * sin(angle);

    let hueValue = map(i, 0, spectrum.length, 0, 255); 
    stroke(hueValue, 255, 255);
    line(x1, y1, x2, y2);
    let offset = 15; 
    let xCircle = x2 + (x2 - x1) / baseRadius * offset; 
    let yCircle = y2 + (y2 - y1) / baseRadius * offset; 

    ellipse(xCircle, yCircle, 2, 2);

  }

  noStroke();
  fill(255);
  text('Amplitude multiplier:', -width / 2 + 10, height / 2 - 10);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
