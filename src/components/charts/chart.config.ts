import { ApexOptions } from "apexcharts";

//informatii pentru grafice

export const TotalRevenueSeries = [
    {
        name: "Luna trecută",
        data: [183, 124, 115, 85, 143, 143, 96],
    },
    {
        name: "Luna curentă",
        data: [95, 84, 72, 44, 108, 108, 47],
    },
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ["#7b231b", "#cecece"],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul"],
    },
    yaxis: {
        title: {
            text: "$ (mii)",
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
    },
    tooltip: {
        y: {
            formatter(val: number) {
                return `$ ${val} mii`;
            },
        },
    },
};
