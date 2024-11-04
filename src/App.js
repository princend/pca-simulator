// src/App.js
import React, { useState } from "react";
import { calculatePCA } from "./pca";

function App() {
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);

    // 隨機生成數據矩陣
    const generateRandomData = () => {
        const rows = 10; // 可以調整行數
        const columns = 3; // 可以調整維度數量
        const randomData = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => Math.random())
        );
        setData(randomData);
        setResult(null); // 重置結果
    };

    const handleCalculate = () => {
        if (data.length === 0) return;
        const pcaResult = calculatePCA(data);
        setResult(pcaResult);
    };

    return (
        <div>
            <h1>PCA Simulator</h1>
            <button onClick={generateRandomData}>Generate Random Data</button>
            <button onClick={handleCalculate} disabled={data.length === 0}>
                Calculate PCA
            </button>

            {data.length > 0 && (
                <div>
                    <h2>Generated Data</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            {result && (
                <div>
                    <h2>Results</h2>
                    <p>First Component: {JSON.stringify(result.firstComponent)}</p>
                    <p>Second Component: {JSON.stringify(result.secondComponent)}</p>
                </div>
            )}
        </div>
    );
}

export default App;
