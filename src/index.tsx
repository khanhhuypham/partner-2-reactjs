import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  } from "chart.js";
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import ChartDataLabels from 'chartjs-plugin-datalabels';



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// Đăng ký các thành phần của ChartJS
ChartJS.register(
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    FunnelController,
    TrapezoidElement,
    LinearScale,
    ChartDataLabels
);



root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
