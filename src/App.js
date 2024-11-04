// src/App.js
import React, { useState } from "react";
import { calculatePCA } from "./pca";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, ScatterController, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ScatterController, LinearScale, PointElement, Tooltip, Legend);

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
        const transformedData = data.map((row, index) => ({
            x: row[0] * pcaResult.firstComponent[0] + row[1] * pcaResult.secondComponent[0],
            y: row[0] * pcaResult.firstComponent[1] + row[1] * pcaResult.secondComponent[1],
        }));
        setResult(transformedData);
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
                    <h2>PCA Results (2D Projection)</h2>
                    <Scatter
                        data={{
                            datasets: [
                                {
                                    label: "PCA Projection",
                                    data: result,
                                    backgroundColor: "rgba(75,192,192,1)",
                                },
                            ],
                        }}
                        options={{
                            scales: {
                                x: { type: "linear", position: "bottom" },
                                y: { type: "linear" },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
