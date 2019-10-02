let nn;
let slider;
let training_data = [
{
    inputs: [0, 0],
    targets: [0]
},{
    inputs: [0, 1],
    targets: [1]
},{
    inputs: [1, 0],
    targets: [1]
},{
    inputs: [1, 1],
    targets: [0]
}
];

function setup() {
   createCanvas(400, 400);
   nn = new NeuralNetwork(2,2,1);
   slider = createSlider(0.1, 1, 0.1, 0.1)  
}
function draw() {
    background(204)
    // nn.learning_rate = slider.value();

    for( let i = 0; i < 100; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.targets)
    }

    nn.learning_rate = slider.value();

    let resolution = 10;
    let cols = floor(width / resolution);
    let rows = floor(height / resolution);
    
    // USING THE 400,400 CANVAS IN 20 TIMES SMALLER RESOLUTION
    // TAKING THE TEST POINTS IN THE RESOLUTION.
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;  
            let x2 = j / rows;         

            let output = nn.feedForward([x1, x2]);
            fill(output * 255);
            noStroke();

            let x = i * resolution;
            let y = j * resolution;
            
            
            rect(x, y, resolution, resolution);
        }
    }
    

    
}