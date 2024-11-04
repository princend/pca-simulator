// src/PCA.js
import PCA from "pca-js";

export function calculatePCA(data) {
    const dataset = PCA.getEigenVectors(data);
    const firstComponent = dataset[0].vector;
    const secondComponent = dataset[1].vector;

    return {
        firstComponent,
        secondComponent,
    };
}
