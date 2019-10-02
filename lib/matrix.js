class Matrix {
    constructor (rows = 1, cols = 1) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];  
        for (let i = 0; i < rows; i++)
            this.data[i] = new Array(cols).fill(0);
        return this;
    }

    /*
    * This function is the heart of this library. MAP FUNCTION.
    */
   map(func) {
       this.data.forEach((rows, i) => rows.forEach((el, j) => this.data[i][j] = func(el, i, j)));
       return this;
   }
   static map(matrix, func) {
       let result = new Matrix(matrix.rows, matrix.cols);   // Filled with zero's[see constructor]
       result.data.forEach((rows, i) => rows.forEach((el, j) => result.data[i][j] = func(matrix.data[i][j], i, j)));
       return result;       
   }

   /**
    *  FROM ARRAY. CONVERT ARRAY TO MATRIX.
    */
   static fromArray(arr) {
       return Matrix.map(new Matrix(arr.length, 1), (_, i) => arr[i]);
   }
   /**
    * TO ARRAY. CONVERT MATRIX TO ARRAY ROW-WISE.
    */
   toArray() {
       let arr = [];
       this.map((data) => { arr.push(data); return data});
       return arr;
   }

   /**  SUBTRACT SUBTRACT SUBTRACT SUBTRACT SUBTRACT    
    * SUBTRACT TWO MATRICES. RETURN NEW ONE.
    */
   static subtract(a, b) {
       return Matrix.map(new Matrix(a.rows, a.cols), (_, i, j) => a.data[i][j] - b.data[i][j]);
   }

   /** TRANSPOSE TRANSPOSE TRANSPOSE TRANSPOSE TRANSPOSE
    *  TRANSPOSE FUNCTIONALITY
    */
   static transpose(matrix) {
       let r = Matrix.map(new Matrix(matrix.cols, matrix.rows), (_, i, j) => matrix.data[j][i]);
       return r;
   }

   /**      MULTIPLY MULTIPLY MULTIPLY MULTIPLY MULTIPLY
    *  MULTIPLY FUNCTIONALITY.
    */
   multiply(n) {
       // PERFORMING HADAMARD MULTIPLICATION.
       if(n instanceof Matrix) {
            this.map((data, i, j) => data * n.data[i][j]);
       } else if(typeof n === 'number') {
            this.map((data) => data * n);
       }
       return this;
   }
   static multiply(a, b) {
        if(!(a instanceof Matrix && b instanceof Matrix)) 
            throw new Error("Matrix.multiply : Arguments must be of Matrix object")
        if(a.cols !== b.rows)
            throw new Error("Matrix.multiply : Columns and rows not matching.")
        let result = new Matrix(a.rows, b.cols);
        result.map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++)
                sum += a.data[i][k] * b.data[k][j];
            return sum;
        });
        return result;       
   }


   /**      RANDOMZIME RANDOMZIME RANDOMZIME RANDOMZIME RANDOMZIME
    *  RANDOMZIME THE VALUES OF THE MATRIX
    */
   randomize() {
       this.map(() => Math.random()*2 - 1);
       return this;
   }

   /**          ADD ADD ADD ADD ADD ADD ADDs
    *  ADD FUNCTIONALITY. ADDS TWO MATRICES. 
    */
   add(n) {
       if(n instanceof Matrix) {
            this.map((data, i, j) => data + n.data[i][j]);
       } else if(typeof n === 'number') {
            this.map((data) => data + n);
       }
       return this;
   }

    print() {
        console.table(this.data);
        return this;
    }
}

if(typeof module !== 'undefined') {
    module.exports = Matrix;
}