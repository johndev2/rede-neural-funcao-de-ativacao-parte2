function funcSum(arr=[]){
    return arr.reduce((a,b)=>a+b)
}

function gradientDescent(n=0){
    return n * (1 - n);
}

function feedForward(input=[], target=0, epochs=1, activation='sigmoid'){
    if(target<=0) {
        target = 0.1;
    }
    else if(target>1) {
        target = 1;
    } 
    let weights = [];
    for(let i=0; i<input.length; i++){
        weights.push(Math.random());
    }

    for(let i=1; i<=epochs; i++){
        let multiply = [];
        for(let j=0; j<input.length; j++){
            if(input[j]<=0) {
                input[j] = 0.1;
            }
            multiply.push(input[j] * weights[j]);
        }
        let sum = funcSum(multiply);
        let output = 0;
        switch(activation){
            case 'tanh': output = parseFloat(Math.tanh(sum).toFixed(4)); break;
            case 'sigmoid': output = parseFloat(sigmoid(sum).toFixed(4)); break;
            case 'relu': output = parseFloat(relu(sum).toFixed(4)); break;  
            case 'leakyRelu': output = parseFloat(leakyRelu(sum).toFixed(4)); break;
            case 'binaryStep': output = parseFloat(binaryStep(sum).toFixed(4)); break;
            default: output = parseFloat(sigmoid(sum).toFixed(4)); break;

            

        }


        let error = parseFloat((Math.abs(target - output)).toFixed(4));
        for(let j=0; j<input.length; j++){
            if(input[j]<=0) {
                input[j] = 0.1;
            }
            weights[j] += input[j] * gradientDescent(error);
        }
        let epoch = i.toString().padStart(7, '0');

        console.log(`época: ${epoch} | taxa de erro: ${error} | saída: ${output}`);
        //if(output== 0.1) process.exit(1); // para o programa quando a saída for 0.1 so de teste
    }
}


//tangente hiperbólica: retorna valores entre -1 e 1 // opinião: é mais rápida que a sigmóide
function tanh(n=0){
    return Math.sinh(n) / Math.cosh(n);
}
//função sigmóide: retorna valores entre 0 e 1 // opinião: é mais lenta que a tangente hiperbólica
function sigmoid(n=0){
    return 1 / (1 + Math.pow(Math.E, -n));
}
//unidade linear retificada (relu): retorna somente valores nulos e positivos // opinião: é mais rápida que a hiperbólica
function relu(n=0){
    return Math.max(n, 0);
}

//unidade linear retificada com vazamento (leaky relu): retorna somente valores maiores que zero // opinião: é semelhante a relu
function leakyRelu(n=0){
    return Math.max(n, 0.01);
}

//passo binário: retorna somente valores 0 e 1 // opinião: é não é adequada para esse tipo de problema
function binaryStep(n=0){
    return (n >=0) ? 1 : 0;
}


feedForward([0], 0.1, 800, 'relu');


