;
function Random(min, max) {
    return Math.random() * (max - min) + min;
}

function Ravnomernoe_func(x, a, b) {
    if (x < a)
        return 0;
    else if (x >= b)
        return 1;
    else
        return (x - a) / (b - a);
}

function Ravnomernoe_plotn(x, a, b) {
    if (x < a)
        return 0;
    else if (x > b)
        return 0;
    else
        return 1 / (b - a);
}

function Normal_func(x, mu, sigma) {
    var erfc = function (x) {
        var z = Math.abs(x);
        var t = 1 / (1 + z / 2);
        var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
                t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
                t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
                t * (-0.82215223 + t * 0.17087277)))))))));
        return x >= 0 ? r : 2 - r;
    };
    return 0.5 * erfc(-(x - mu) / (Math.sqrt(sigma) * Math.sqrt(2)));
}

function Normal_plotn(x, mu, sigma) {
    return (1 / Math.sqrt(sigma * 2 * Math.PI)) * Math.exp(-Math.pow((x - mu), 2) / (2 * sigma));
}

function Exp_func(x, lamda) {
    if (x >= 0)
        return (1 - Math.exp(-lamda * x));
    else return 0;
}

function Exp_plotn(x, lamda) {
    if (x >= 0)
        return lamda * Math.exp(-lamda * x);
    else return 0;
}

function Exp_raspredelenie(lamda) {
    return Math.log(1 - Math.random()) / (-lamda);
}

function GaussMethod(mu, sigma) {
    var dSumm = 0, R, i;
    for (i = 0; i < 12; i++) {
        R = Math.random();
        dSumm = dSumm + R;
    }
    return mu + Math.sqrt(sigma) * (dSumm - 6);
}

function Ravnomernoe_delta_function(x, a, b) {
    var i, mass = [], n = x.length;
    for (i = 0; i < n; i++) {
        mass[i] = Math.abs((i + 1) / n - Ravnomernoe_func(x[i], a, b));
    }
    return Math.max.apply(null, mass);
}

function Exp_delta_function(x, lamda) {
    var i, mass = [], n = x.length;
    for (i = 0; i < n; i++) {
        mass[i] = Math.abs((i + 1) / n - Exp_func(x[i], lamda));
    }
    return Math.max.apply(null, mass);
}

function Normal_delta_function(x, mu, sigma) {
    var i, mass = [], n = x.length;
    for (i = 0; i < n; i++) {
        mass[i] = Math.abs((i + 1) / n - Normal_func(x[i], mu, sigma));
    }
    console.log(mass);
    return Math.max.apply(null, mass);
}

function Ravnomernoe_delta_plotn(q, x, a, b) {
    var i, mass = [];
    for (i = 0; i < q; i++) {
        mass[i] = Math.abs(x[i + 1][1] - Ravnomernoe_plotn(x[i + 1][0], a, b));
    }
    return Math.max.apply(null, mass);
}

function Exp_delta_plotn(q, x, lamda) {
    var i, step = x[q][0] - x[q - 1][0], start = x[1][0] - step / 2, mass = [], q_arr = [];

    for (i = 0; i <= q; i++) {
        q_arr[i] = start + step * i;
    }
    for (i = 0; i < q; i++) {
        mass[i] = Math.max(
            Math.abs(x[i + 1][1] - Exp_plotn(q_arr[i], lamda)),
            Math.abs(x[i + 1][1] - Exp_plotn(q_arr[i + 1], lamda)));
    }
    return Math.max.apply(null, mass);
}

function Normal_delta_plotn(q, x, mu, sigma) {
    var i, step = x[q][0] - x[q - 1][0], start = x[1][0] - step / 2, mass = [], q_arr = [];

    for (i = 0; i <= q; i++) {
        q_arr[i] = start + step * i;
    }
    for (i = 0; i < q; i++) {
        mass[i] = Math.max(
            Math.abs(x[i + 1][1] - Normal_plotn(q_arr[i], mu, sigma)),
            Math.abs(x[i + 1][1] - Normal_plotn(x[i + 1][0], mu, sigma)),
            Math.abs(x[i + 1][1] - Normal_plotn(q_arr[i + 1], mu, sigma)));
    }
    return Math.max.apply(null, mass);
}

function compareNumeric(a, b) {
    return a - b;
}

function RemoveMistakes(input_data_array, gamma) {
    var n = input_data_array.length,
        x_min, x_max, x_min_compare, x_max_compare, flag;

    while (n >= 4) {
        flag = 0;
        x_min = input_data_array[0];
        x_max = input_data_array[n - 1];
        x_min_compare = input_data_array[1] - gamma * (input_data_array[n - 2] - input_data_array[1]);
        x_max_compare = input_data_array[n - 2] + gamma * (input_data_array[n - 2] - input_data_array[1]);

        if (x_min <= x_min_compare) {
            input_data_array.shift();
            flag = 1;
        }
        if (x_max >= x_max_compare) {
            input_data_array.pop();
            flag = 1;
        }
        if (flag == 0) {
            return input_data_array;
        }
    }
}

function first(input_data_array) {
    var draw = [], i, k, n = input_data_array.length;

    draw[0] = [input_data_array[0] - (input_data_array[1] - input_data_array[0]) / 2, 0];
    for (i = 1, k = 1; i < n * 2; i = i + 2, k++) {
        draw[i] = [input_data_array[i - k], (i - k) / n];
        draw[i + 1] = [input_data_array[i - k], (i - k + 1) / n];
    }
    draw[n * 2 + 1] = [input_data_array[n - 1] + (input_data_array[n - 1] - input_data_array[n - 2]) / 2, 1];
    return draw;
}

function loman(q, input_data_array) {
    var mass = [], z = [], i, j, n = input_data_array.length;
    var step = (input_data_array[n - 1] - input_data_array[0]) / q;

    mass[0] = [input_data_array[0], 0];

    for (i = 0; i < q - 1; i++) {
        z[i] = input_data_array[0] + (i + 1) * step;
    }

    for (i = 0; i < q; i++) {
        for (j = 0; j < n - 1; j++) {
            if ((z[i] >= input_data_array[j]) && (z[i] < input_data_array[j + 1])) {
                mass[i + 1] = [z[i], (j + 1) / n];
            }
        }
    }
    mass[q] = [input_data_array[n - 1], 1];
    return mass;
}

function gist(q, input_data_array) {
    var mass = [], z = [], n = input_data_array.length;
    var i, j, count = 1;
    var step = (input_data_array[n - 1] - input_data_array[0]) / q;

    for (i = 0; i <= q; i++) {
        z[i] = input_data_array[0] + i * step;
    }

    mass[0] = [z[0] - (z[1] - z[0]) / 2, 0];

    for (i = 0; i < q - 1; i++) {
        for (j = 1; j < n; j++) {
            if ((input_data_array[j] > z[i]) && (input_data_array[j] <= z[i + 1])) {
                count++;
            }
        }
        mass[i + 1] = [(z[i + 1] + z[i]) / 2, count / (step * n)];
        count = 0;
    }
    count = 1;
    for (j = 0; j < n - 1; j++) {
        if ((input_data_array[j] > z[q - 1]) && (input_data_array[j] <= z[q])) {
            count++;
        }
    }
    mass[q] = [(z[q] + z[q - 1]) / 2, count / (step * n)];

    mass[q + 1] = [z[q] + (z[q] - z[q - 1]) / 2, 0];

    return mass;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////∈
var n, q, a, b, lamda, mu, sigma,
    flag = 0, abs = [];

$(function () {
    $('#chart1').highcharts({
        title: {text: 'График функции и плотности распределения'},
        subtitle: {text: 'Параметры:'}
    });
});

$(function () {
    $('#chart2').highcharts({
        title: {text: 'График оценки функции распределения F(x)'},
        subtitle: {text: 'F*(x) и F**(x) - оценки функции распределеня F(x)'}
    });
});

$(function () {
    $('#chart3').highcharts({
        title: {text: 'График оценки плотности распределения f(x)'},
        subtitle: {text: 'f*(x) и f**(x) - оценки плотности распределеня f(x)'}
    });
});

$(function () {
    $('#chart4').highcharts({
        title: {text: 'Зависимость точность оценивания F(x) от n'},
        subtitle: {text: 'При n = 30, 60, 90'}
    });
});

$(function () {
    $('#chart5').highcharts({
        title: {text: 'Зависимость точность оценивания f(x) от n'},
        subtitle: {text: 'При n = 30, 60, 90'}
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////∈γ

function CreateMass() {

    var i, mass_output_data = [], start, step, graph_name, parametrs_name;

    var _n = +document.getElementById("n").value;
    var _q = +document.getElementById("q").value;
    //var gamma = +document.querySelector('input[name="gammacheck"]:checked').value;

    if (_n > 4 && _n <= 1000) {
        if (_q > 4 && _q <= 25) {
            n = _n.toFixed();
            q = _q.toFixed();
        } else {
            alert("q должно быть в диапазоне [5, 25]");
            return;
        }
    } else {
        alert("n должно быть в диапазоне [5, 1000]");
        return;
    }

    if (document.getElementById('ravnomernoe').checked) {
        var _a = +document.getElementById("a").value;
        var _b = +document.getElementById("b").value;
        if (_a > -101 && _a < 101) {
            if (_b > _a && _b < 201) {
                flag = 0;
                a = _a;
                b = _b;
                graph_name = "равномерного";
                parametrs_name = "Параметры: a = " + a + ", b = " + b;
            }
            else {
                alert("b должно быть в диапазоне (a, 200]");
                return;
            }
        }
        else {
            alert("a должно быть в диапазоне [-100, 100]");
            return;
        }
    }
    else if (document.getElementById('exp').checked) {
        var _lamda = +document.getElementById("lamda").value;
        if (_lamda > 0 && _lamda < 11) {
            flag = 1;
            lamda = _lamda;
            graph_name = "показательного";
            parametrs_name = "Параметр λ = " + lamda;
        }
        else {
            alert("λ должна быть в диапазоне (0, 10]");
            return;
        }
    }
    else if (document.getElementById('normal').checked) {
        var _mu = +document.getElementById("mu").value;
        var _sigma = +document.getElementById("sigma").value;
        if (_mu > -101 && _mu < 101) {
            if (_sigma > 0 && _sigma < 11) {
                flag = 2;
                mu = _mu;
                sigma = _sigma;
                graph_name = "нормального";
                parametrs_name = "Параметры: m = " + mu + ", σ ² = " + sigma;
            }
            else {
                alert("σ ² должна быть в диапазоне (0, 10]");
                return;
            }
        }
        else {
            alert("m должна быть в диапазоне [-100, 100]");
            return;
        }
    }
    else if (document.getElementById('youself').checked) {
        var str = document.getElementById('textar').value;
        mass_output_data = str.split(' ', 100);
        n = mass_output_data.length;
        for (i = 0; i < n; i++) {
            mass_output_data[i] = +mass_output_data[i];
            if (isNaN(mass_output_data[i])) {
                alert("Введите корректные данные");
                return;
            }
        }
        flag = 3;
        graph_name = "Вывод введенных величин";
        parametrs_name = "Параметры: n = " + n + "";
    }

    if (flag == 0) {
        for (i = 0; i < n; i++) {
            mass_output_data[i] = Random(a, b);
        }
    }
    else if (flag == 1) {
        for (i = 0; i < n; i++) {
            mass_output_data[i] = Exp_raspredelenie(lamda);
        }
    }
    else if (flag == 2) {
        for (i = 0; i < n; i++) {
            mass_output_data[i] = GaussMethod(mu, sigma);
        }
    }
    mass_output_data.sort(compareNumeric);

    //mass_output_data = RemoveMistakes(mass_output_data, gamma);
    //n = mass_output_data.length;

    var real_func = [], real_plotn = [], x;

    if (flag == 0) {
        start = a - (b - a) / 4;
        step = (b + (b - a) / 4 - start) / 24;
        for (i = 0; i <= 3; i++) {
            x = start + (step) * i;
            real_plotn[i] = [x, 0];
        }
        real_plotn[4] = [a, 0];
        real_plotn[5] = null;
        real_plotn[6] = [a, Ravnomernoe_plotn(a, a, b)];
        for (i = 7; i <= 21; i++) {
            x = start + (step) * (i - 2);
            real_plotn[i] = [x, Ravnomernoe_plotn(x, a, b)];
        }
        real_plotn[22] = [b, Ravnomernoe_plotn(b, a, b)];
        real_plotn[23] = null;
        real_plotn[24] = [b, 0];
        for (i = 25; i <= 28; i++) {
            x = start + (step) * (i - 4);
            real_plotn[i] = [x, 0];
        }
        for (i = 0; i <= 24; i++) {
            x = start + (step) * (i);
            real_func[i] = [x, Ravnomernoe_func(x, a, b)];
        }
    }
    else if (flag == 1) {
        step = (mass_output_data[mass_output_data.length - 1] +
            (mass_output_data[mass_output_data.length - 1] - mass_output_data[0]) / 8) / 100;

        for (i = 0; i <= 100; i++) {
            x = (step) * i;
            real_func[i] = [x, Exp_func(x, lamda)];
            real_plotn[i] = [x, Exp_plotn(x, lamda)];
        }
    }
    else if (flag == 2) {
        start = mass_output_data[0] - Math.abs((mass_output_data[mass_output_data.length - 1] - mass_output_data[0]) / 4);
        step = (mass_output_data[mass_output_data.length - 1] +
            Math.abs((mass_output_data[mass_output_data.length - 1] - mass_output_data[0]) / 4) - start) / 100;

        for (i = 0; i <= 100; i++) {
            x = start + (step) * i;
            real_func[i] = [x, Normal_func(x, mu, sigma)];
            real_plotn[i] = [x, Normal_plotn(x, mu, sigma)];
        }
    }
    var arr = [];
    for (i = 0; i < mass_output_data.length; i++) {
        arr[i] = [mass_output_data[i], 0];
    }

    if (flag !== 3) {
        $(function () {
            $('#chart1').highcharts({
                title: {
                    text: 'График функции и плотности ' + graph_name + ' распределения'
                },
                subtitle: {
                    text: parametrs_name
                },
                tooltip: {
                    formatter: function () {
                        var s;
                        if (this.series.name == 'x') {
                            s = '<b>Сгенерированное значение</b> = ' + this.x.toFixed(4);
                        }
                        else s = '<b>' + this.series.name + '</b>' + ' = ' +
                            this.y.toFixed(4) + ', x = ' + this.x.toFixed(4);
                        return s;
                    }
                },
                plotOptions: {
                    line: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                xAxis: {
                    min: real_plotn[0][0],
                    max: real_plotn[real_plotn.length - 1][0]
                },
                yAxis: [{
                    title: {
                        text: 'F(x)'
                    }
                }, {
                    title: {
                        text: 'f(x)'
                    },
                    opposite: true
                }],
                series: [
                    {
                        type: 'line',
                        name: 'F(x)',
                        data: real_func
                    },
                    {
                        type: 'scatter',
                        name: 'f(x)',
                        data: real_plotn,
                        lineWidth: 2,
                        marker: {
                            enabled: false
                        },
                        yAxis: 1,
                        color: '#f45b5b'
                    },
                    {
                        type: 'scatter',
                        name: 'x',
                        data: arr,
                        marker: {
                            symbol: 'triangle'
                        },
                        color: '#f7a35c'
                    }]
            });
        });


        $(function () {
            $('#chart2').highcharts({
                title: {text: 'График оценки функции распределения F(x)'},
                subtitle: {text: 'F*(x) и F**(x) - оценки функции распределеня F(x)'}
            });
        });

        $(function () {
            $('#chart3').highcharts({
                title: {text: 'График оценки плотности распределения f(x)'},
                subtitle: {text: 'f*(x) и f**(x) - оценки плотности распределеня f(x)'}
            });
        });

        $(function () {
            $('#chart4').highcharts({
                title: {text: 'Зависимость точность оценивания F(x) от n'},
                subtitle: {text: 'При n = 30, 60, 90'}
            });
        });

        $(function () {
            $('#chart5').highcharts({
                title: {text: 'Зависимость точность оценивания f(x) от n'},
                subtitle: {text: 'При n = 30, 60, 90'}
            });
        });
    }
    else if (flag == 3) {
        $(function () {
            $('#chart1').highcharts({
                title: {
                    text: 'Сгенерированные значения'
                },
                subtitle: {
                    text: parametrs_name
                },
                tooltip: {
                    formatter: function () {
                        var s;
                        s = '<b>Сгенерированное значение</b> = ' + this.x.toFixed(4);
                        return s;
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        name: 'x',
                        data: arr,
                        marker: {
                            symbol: 'triangle'
                        },
                        color: '#f7a35c'
                    }]
            });
        });


        $(function () {
            $('#chart2').highcharts({
                title: {text: 'График оценки функции распределения F(x)'},
                subtitle: {text: 'F*(x) и F**(x) - оценки функции распределеня F(x)'}
            });
        });

        $(function () {
            $('#chart3').highcharts({
                title: {text: 'График оценки плотности распределения f(x)'},
                subtitle: {text: 'f*(x) и f**(x) - оценки плотности распределеня f(x)'}
            });
        });
    }
    return mass_output_data;
}

function BuildFunctionGraph(mass_input_data) {

    var i, mass_lesenka = first(mass_input_data),
        mass_loman = loman(q, mass_input_data);

    var start, step, x, real_func = [];

    if (flag == 0) {
        start = a - Math.abs((b - a) / 4);
        step = (b + Math.abs((b - a) / 4) - start) / 100;

        for (i = 0; i <= 100; i++) {
            x = start + (step) * i;
            real_func[i] = [x, Ravnomernoe_func(x, a, b)];
        }
    }
    else if (flag == 1) {
        step = (mass_input_data[mass_input_data.length - 1] +
            (mass_input_data[mass_input_data.length - 1] - mass_input_data[0]) / 8) / 100;
        for (i = 0; i <= 100; i++) {
            x = (step) * i;
            real_func[i] = [x, Exp_func(x, lamda)];
        }
    }
    else if (flag == 2) {
        start = mass_input_data[0] - Math.abs((mass_input_data[mass_input_data.length - 1] - mass_input_data[0]) / 4);
        step = (mass_input_data[mass_input_data.length - 1] + Math.abs((mass_input_data[mass_input_data.length - 1] -
                mass_input_data[0]) / 4) - start) / 100;

        for (i = 0; i <= 100; i++) {
            x = start + (step) * i;
            real_func[i] = [x, Normal_func(x, mu, sigma)];
        }
    }
    else if (flag == 3) {

    }
    else alert("Укажите тип распределения");

    var arr = [];
    for (i = 0; i < mass_input_data.length; i++) {
        arr[i] = [mass_input_data[i], 0];
    }

    $(function () {
        $('#chart2').highcharts({
            title: {
                text: 'График оценки функции распределения F(x)'
            },
            subtitle: {
                text: 'F*(x) и F**(x) - оценки функции распределеня F(x)'
            },
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.series.name == 'x') {
                        s = '<b>Сгенерированное значение</b> = ' + this.x.toFixed(4);
                    }
                    else s = '<b>' + this.series.name + '</b>' + ' = ' +
                        this.y.toFixed(4) + ', x = ' + this.x.toFixed(4);
                    return s;
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [
                {
                    type: 'line',
                    name: 'F(x)',
                    data: real_func,
                    color: '#2d88e0'
                },
                {
                    type: 'scatter',
                    name: 'F*(x)',
                    data: mass_lesenka,
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    },
                    color: '#91e8e1'
                },
                {
                    type: 'line',
                    name: 'F**(x)',
                    data: mass_loman,
                    color: '#f45b5b'
                },
                {

                    type: 'scatter',
                    name: 'x',
                    data: arr,
                    marker: {
                        symbol: 'triangle'
                    },
                    color: '#f7a35c'
                }
            ]
        });
    });
}

function BuidRaspredGraph(mass_input_data) {
    var i, j, mass_gist = gist(q, mass_input_data),
        steps = [],
        step1 = (mass_input_data[n - 1] - mass_input_data[0]) / q,
        gistt = [], real_plotn = [],
        start_draw, stop_draw;

    for (i = 0; i <= q; i++) {
        steps[i] = mass_input_data[0] + i * step1;
    }

    for (i = 0, j = 0; i < 4 * q, j < q; i = i + 4, j++) {
        gistt[i] = [steps[j], 0];
        gistt[i + 1] = [steps[j], mass_gist[j + 1][1]];
        gistt[i + 2] = [steps[j + 1], mass_gist[j + 1][1]];
        gistt[i + 3] = [steps[j + 1], 0];
    }

    var start, step;
    var x;
    if (flag == 0) {
        start = a - (b - a) / 4;
        step = (b + (b - a) / 4 - start) / 24;
        for (i = 0; i <= 3; i++) {
            x = start + (step) * i;
            real_plotn[i] = [x, 0];
        }
        real_plotn[4] = [a, 0];
        real_plotn[5] = null;
        real_plotn[6] = [a, Ravnomernoe_plotn(a, a, b)];
        for (i = 7; i <= 21; i++) {
            x = start + (step) * (i - 2);
            real_plotn[i] = [x, Ravnomernoe_plotn(x, a, b)];
        }
        real_plotn[22] = [b, Ravnomernoe_plotn(b, a, b)];
        real_plotn[23] = null;
        real_plotn[24] = [b, 0];
        for (i = 25; i <= 28; i++) {
            x = start + (step) * (i - 4);
            real_plotn[i] = [x, 0];
        }
        //for (i = 0; i <= 100; i++) {
        //    x = a + (b - a) * i / 100;
        //    real_plotn[i] = [x, Ravnomernoe_plotn(x, a, b)];
        //}
        //mass_gist.shift();
        //mass_gist.pop();

        start_draw = real_plotn[0][0];
        stop_draw = real_plotn[real_plotn.length - 1][0];
    }
    else if (flag == 1) {
        step = (mass_gist[q + 1][0]) / 100;
        for (i = 0; i <= 100; i++) {
            x = step * i;
            real_plotn[i] = [x, Exp_plotn(x, lamda)];
        }
        //mass_gist.shift();

        //start_draw = 0;
        //stop_draw = step*100;
    }
    else if (flag == 2) {
        start = mass_gist[0][0];
        step = (mass_gist[q + 1][0] - mass_gist[0][0]) / 100;
        for (i = 0; i <= 100; i++) {
            x = start + step * i;
            real_plotn[i] = [x, Normal_plotn(x, mu, sigma)];
        }
    }
    else if (flag == 3) {

    }
    else alert("Укажите тип распределения");

    var arr = [];
    for (i = 0; i < mass_input_data.length; i++) {
        arr[i] = [mass_input_data[i], 0];
    }

    $(function () {
        $('#chart3').highcharts({
            title: {
                text: 'График оценки плотности распределения f(x)'
            },
            subtitle: {
                text: 'f*(x) и f**(x) - оценки плотности распределеня f(x)'
            },
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.series.name == 'x') {
                        s = '<b>Сгенерированное значение</b> = ' + this.x.toFixed(4);
                    }
                    else s = '<b>' + this.series.name + '</b>' + ' = ' +
                        this.y.toFixed(4) + ', x = ' + this.x.toFixed(4);
                    return s;
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            xAxis: {
                min: start_draw,
                max: stop_draw
            },
            series: [
                {
                    type: 'scatter',
                    name: 'f*(x)',
                    data: gistt,
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    },
                    color: '#91e8e1'
                },
                {
                    type: 'scatter',
                    name: 'f(x)',
                    data: real_plotn,
                    color: '#2d88e0',
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    }
                },
                {
                    type: 'line',
                    name: 'f**(x)',
                    data: mass_gist,
                    color: '#f45b5b'
                },
                {
                    type: 'scatter',
                    name: 'x',
                    data: arr,
                    marker: {
                        symbol: 'triangle'
                    },
                    color: '#f7a35c'
                }
            ]
        });
    });
}

function CreateTestArr(count, firstParametr, secondParametr, flag) {
    var i, mass_output_data = [];

    if ((flag == 0) || (flag == 3)) {
        if (a == undefined || b == undefined) {
            firstParametr = 0;
            secondParametr = 1;
        }
        else {
            firstParametr = a;
            secondParametr = b;
        }
        for (i = 0; i < count; i++) {
            mass_output_data[i] = Random(firstParametr, secondParametr);
        }
    }
    else if (flag == 1) {
        if (lamda == undefined) {
            firstParametr = 1;
        }
        else {
            firstParametr = lamda;
        }
        for (i = 0; i < count; i++) {
            mass_output_data[i] = Exp_raspredelenie(secondParametr);
        }
    }
    else if (flag == 2) {
        if (mu == undefined || sigma == undefined) {
            firstParametr = 0;
            secondParametr = 1;
        }
        else {
            firstParametr = mu;
            secondParametr = sigma;
        }
        for (i = 0; i < count; i++) {
            mass_output_data[i] = GaussMethod(firstParametr, secondParametr);
        }
    }
    mass_output_data.sort(compareNumeric);
    return mass_output_data;
}

function MiddleDeltaFunc() {

    var run_30 = [], run_60 = [], run_90 = [], i,
        count1 = 30, count2 = 60, count3 = 90,
        firstParametr = 0, secondParametr = 1;

    if (document.getElementById('ravnomernoe').checked) {
        flag = 0;
    }
    else if (document.getElementById('exp').checked) {
        flag = 1;
    }
    else if (document.getElementById('normal').checked) {
        flag = 2;
    }
    else if (document.getElementById('youself').checked) {
        flag = 3;
    }

    if ((flag == 0) || (flag == 3)) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Ravnomernoe_delta_function(CreateTestArr(count1, firstParametr, secondParametr, flag), firstParametr, secondParametr);
            run_60[i] = Ravnomernoe_delta_function(CreateTestArr(count2, firstParametr, secondParametr, flag), firstParametr, secondParametr);
            run_90[i] = Ravnomernoe_delta_function(CreateTestArr(count3, firstParametr, secondParametr, flag), firstParametr, secondParametr);
        }
    }
    else if (flag == 1) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Exp_delta_function(CreateTestArr(count1, null, secondParametr, flag), secondParametr);
            run_60[i] = Exp_delta_function(CreateTestArr(count2, null, secondParametr, flag), secondParametr);
            run_90[i] = Exp_delta_function(CreateTestArr(count3, null, secondParametr, flag), secondParametr);
        }
    }
    else if (flag == 2) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Normal_delta_function(CreateTestArr(count1, firstParametr, secondParametr, flag), firstParametr, secondParametr);
            run_60[i] = Normal_delta_function(CreateTestArr(count2, firstParametr, secondParametr, flag), firstParametr, secondParametr);
            run_90[i] = Normal_delta_function(CreateTestArr(count3, firstParametr, secondParametr, flag), firstParametr, secondParametr);
        }
    }
    else return;

    var delta30 = 0, delta60 = 0, delta90 = 0;
    for (i = 0; i < 100; i++) {
        delta30 += run_30[i];
        delta60 += run_60[i];
        delta90 += run_90[i];
    }
    var delta_F = [delta30 / 100, delta60 / 100, delta90 / 100];

    $(function () {
        $('#chart4').highcharts({
            title: {
                text: 'Зависимость точность оценивания F(x) от n'
            },
            subtitle: {
                text: 'При n = 30, 60, 90'
            },
            xAxis: {
                categories: ['30', '60', '90']
            },
            tooltip: {
                formatter: function () {
                    var s;
                    s = '<b>' + this.series.name + '</b>' + ' = ' +
                        this.y.toFixed(4);
                    return s;
                }
            },
            series: [
                {
                    type: 'line',
                    name: 'ΔF',
                    data: delta_F
                }]
        });
    });

    var myTable = document.getElementById('result_table');
    myTable.rows[1].cells[1].innerHTML = '' + delta_F[0].toFixed(4);
    myTable.rows[1].cells[2].innerHTML = '' + delta_F[1].toFixed(4);
    myTable.rows[1].cells[3].innerHTML = '' + delta_F[2].toFixed(4);
}

function MiddleDeltaPlotn() {
    var run_30 = [], run_60 = [], run_90 = [], i,
        count1 = 30, count2 = 60, count3 = 90,
        firstParametr = 0, secondParametr = 1;

    if (document.getElementById('ravnomernoe').checked) {
        flag = 0;
    }
    else if (document.getElementById('exp').checked) {
        flag = 1;
    }
    else if (document.getElementById('normal').checked) {
        flag = 2;
    }
    else if (document.getElementById('youself').checked) {
        flag = 3;
    }

    if ((flag == 0) || (flag == 3)) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Ravnomernoe_delta_plotn(5, gist(5, CreateTestArr(count1, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
            run_60[i] = Ravnomernoe_delta_plotn(5, gist(5, CreateTestArr(count2, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
            run_90[i] = Ravnomernoe_delta_plotn(5, gist(5, CreateTestArr(count3, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
        }
    }
    else if (flag == 1) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Exp_delta_plotn(5, gist(5, CreateTestArr(count1, null, secondParametr, flag)), secondParametr);
            run_60[i] = Exp_delta_plotn(7, gist(7, CreateTestArr(count2, null, secondParametr, flag)), secondParametr);
            run_90[i] = Exp_delta_plotn(9, gist(9, CreateTestArr(count3, null, secondParametr, flag)), secondParametr);
        }
    }
    else if (flag == 2) {
        for (i = 0; i < 100; i++) {
            run_30[i] = Normal_delta_plotn(5, gist(5, CreateTestArr(count1, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
            run_60[i] = Normal_delta_plotn(7, gist(7, CreateTestArr(count2, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
            run_90[i] = Normal_delta_plotn(9, gist(9, CreateTestArr(count3, firstParametr, secondParametr, flag)), firstParametr, secondParametr);
        }
    }
    else return;

    var delta30 = 0, delta60 = 0, delta90 = 0;
    for (i = 0; i < 100; i++) {
        delta30 += run_30[i];
        delta60 += run_60[i];
        delta90 += run_90[i];
    }
    var delta_f = [delta30 / 100, delta60 / 100, delta90 / 100];

    $(function () {
        $('#chart5').highcharts({
            title: {
                text: 'Зависимость точность оценивания f(x) от n'
            },
            subtitle: {
                text: 'При n = 30, 60, 90'
            },
            xAxis: {
                categories: ['30', '60', '90']
            },
            tooltip: {
                formatter: function () {
                    var s;
                    s = '<b>' + this.series.name + '</b>' + ' = ' +
                        this.y.toFixed(4);
                    return s;
                }
            },
            series: [
                {
                    type: 'line',
                    name: 'Δf',
                    data: delta_f
                }]
        });
    });
    document.getElementById("vivod").removeAttribute("hidden");
    var myTable = document.getElementById('result_table');

    myTable.rows[2].cells[1].innerHTML = '' + delta_f[0].toFixed(4);
    myTable.rows[2].cells[2].innerHTML = '' + delta_f[1].toFixed(4);
    myTable.rows[2].cells[3].innerHTML = '' + delta_f[2].toFixed(4);
}