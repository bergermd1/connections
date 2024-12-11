
        const xValues = ["0", "1", "2", "3", "4"];
        const yValues = [2,3,1,0,0];
        const barColors = ["red", "green","blue","orange","brown"];

        new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Solve stats"
            }
        }
        });
