class NeuralNetwork {
    constructor(...nodes) {
        this.weights = [];
        this.biases = [];
        this.layers = nodes.length - 1;
        this.learning_rate = 0.1;

        nodes.forEach((node, i, arr) => {
            if(i === 0)  return;  
            let weight = new Matrix(node, arr[i-1]).randomize();
            this.weights.push(weight);
            let bias = new Matrix(node, 1).randomize();
            this.biases.push(bias);
        });        
    }   

    feedForward(input_array) {
        let inputs = Matrix.fromArray(input_array);
        // Calculate output.
        let output;
        this.weights.forEach((weight, i, arr) => {
            output = Matrix.multiply(weight, (i == 0) ? inputs : output);
            output.add(this.biases[i]);
            output.map(sigmoid);
        });
        // Sending back to the caller..
        return output.toArray();
    }

    train(input_array, target_array) {
        let inputs = Matrix.fromArray(input_array)
        let targets = Matrix.fromArray(target_array)
        // Running the feedforward algorithm. [with small difference]
        let outputs = [];   // all layer outputs
        this.weights.forEach((weight, i, arr) => {
            let output = Matrix.multiply(weight, (i === 0) ? inputs : outputs[i-1]);
            output.add(this.biases[i])
            output.map(sigmoid);
            outputs.push(output);
        });          
        // Backpropagate and adjust the weights and biases.
        let error = Matrix.subtract(targets, outputs[outputs.length - 1]);
        for (let i = outputs.length - 1; i >= 0; i--) {
            if(i < outputs.length - 1) // Update the error for the hidden layer
                error = Matrix.multiply(Matrix.transpose(this.weights[i + 1]), error);
            let gradient = Matrix.map(outputs[i], dsigmoid);
            gradient.multiply(error);
            gradient.multiply(this.learning_rate);

            let delta_weights = Matrix.multiply(gradient, Matrix.transpose((i === 0) ? inputs : outputs[i - 1]));
            this.weights[i].add(delta_weights)
            this.biases[i].add(gradient);   // delta(bias) = gradient.
        }
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}