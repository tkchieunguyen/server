<<<<<<< HEAD

// Chart.register(ChartDataLabels);
=======
//Chart.register(ChartDataLabels);
>>>>>>> ed32ac58f3d36e1ef9585e76d1637d96ded7372f
var bt_on1 = document.querySelector('.btn-on1');
var bt_on2 = document.querySelector('.btn_on2');
var bt_on3 = document.querySelector('.btn_on3');
var bt_on4 = document.querySelector('.btn_on4');
var bt_on5 = document.querySelector('.btn_on5');
var bt_on6 = document.querySelector('.btn_on6');
var giatri = document.querySelector('.val');
var dis_auto = document.querySelector('.dis_auto');
var dis_manual = document.querySelector('.dis_manual');
var dis_auto2 = document.querySelector('.dis_auto2');
var dis_manual2 = document.querySelector('.dis_manual2');
var box_on = document.querySelector('.box');
var btn_on = document.querySelector('.box1');
var box_on1 = document.querySelector('.box2');
var btn_on1 = document.querySelector('.box3');
// BIEU DO 1
// var val5 = document.querySelector('.giatri1');
// const ctx = document.getElementById('myChart')
// var clock2 = [];
// // BIEU DO 2
// var val6 = document.querySelector('.giatri2');
// const ctx1 = document.getElementById('myChart1')
// var clock3 = [];

// DONG HO
setInterval(() => {
  let date = new Date()
  let clock = document.getElementById('curClock')
  clock.innerHTML =
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
  clock2 =
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
  clock3 =
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
}, 1000)



// btn active
function addactive() {
  box_on.classList.toggle('boxactive');
  btn_on.classList.toggle('btnactive');
  dis_auto.classList.toggle('light');
  dis_manual.classList.toggle('light');
  bt_on1.classList.toggle('display-none');
  document.querySelector('.element1').classList.toggle('display-none');
  bt_on2.classList.toggle('display-none');
  document.querySelector('.element2').classList.toggle('display-none');
  bt_on3.classList.toggle('display-none');
  document.querySelector('.element3').classList.toggle('display-none');
  // document.querySelector('.element10').classList.toggle('display-none');
  // document.querySelector('.btn_on20').classList.toggle('display-none');
  // document.querySelector('.element11').classList.toggle('display-none');
  // document.querySelector('.btn_on21').classList.toggle('display-none');
  // document.querySelector('.element12').classList.toggle('display-none');
  // document.querySelector('.btn_on22').classList.toggle('display-none');
  bt_on4.classList.toggle('display-none');
  document.querySelector('.element4').classList.toggle('display-none');
  bt_on5.classList.toggle('display-none');
  document.querySelector('.element5').classList.toggle('display-none');
  bt_on6.classList.toggle('display-none');
  document.querySelector('.element6').classList.toggle('display-none');

}
box_on.addEventListener('click', addactive)

function addactive1() {
  box_on1.classList.toggle('boxactive');
  btn_on1.classList.toggle('btnactive');
  dis_auto2.classList.toggle('light');
  dis_manual2.classList.toggle('light');
  document.querySelector('.element21').classList.toggle('display-none');
  document.querySelector('.btn_on21').classList.toggle('display-none');
  document.querySelector('.element22').classList.toggle('display-none');
  document.querySelector('.btn_on22').classList.toggle('display-none');
  document.querySelector('.element23').classList.toggle('display-none');
  document.querySelector('.btn_on23').classList.toggle('display-none');
  document.querySelector('.element24').classList.toggle('display-none');
  document.querySelector('.btn_on24').classList.toggle('display-none');
  document.querySelector('.element25').classList.toggle('display-none');
  document.querySelector('.btn_on25').classList.toggle('display-none');
  document.querySelector('.element26').classList.toggle('display-none');
  document.querySelector('.btn_on26').classList.toggle('display-none');

}
box_on1.addEventListener('click', addactive1)


// if (luutru1 = 1){

// }
// else{



// bt_on2.addEventListener('click', addlight2);
// function addlight2() {
//   bt_on2.classList.toggle('light');
// }

// bt_on3.addEventListener('click', addlight3);
// function addlight3() {
//   bt_on3.classList.toggle('light');
// }

// bt_on4.addEventListener('click', addlight4);
// function addlight4() {
//   bt_on4.classList.toggle('light');
// }

// bt_on5.addEventListener('click', addlight5);
// function addlight5() {
//   bt_on5.classList.toggle('light');
// }

// bt_on6.addEventListener('click', addlight6);
// function addlight6() {
//   bt_on6.classList.toggle('light');
// }


// // BIEU DO 1
// var valdata = [];
// var val2 = {
//   type: 'line',
//   data: {
//     labels: [],
//     datasets: [{
//       label: 'Temperate',
//       data: valdata,
//       borderWidth: 4
//     }]
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }

// }
// // event listener có thể sẽ sửa đổi thành 'input' nếu  input auto từ server
// myChart1 = new Chart(ctx, val2);
// val5.addEventListener('input', function (e) {
//   //if (e.key === 'Enter') {
//   console.log(e.target.value)
//   if (valdata.length < 6) {
//     myChart1.data.datasets.data = valdata.push(e.target.value);
//     myChart1.data.labels.push(clock2);
//     // console.log(myChart1);
//     myChart1.update();
//   }
//   else {
//     myChart1.data.datasets.data = valdata.push(e.target.value);
//     myChart1.data.datasets.data = valdata.shift(e.target.value);
//     myChart1.update();
//   }
//   //}
// })


// // BIEU DO 2
// var valdata1 = [];
// var val4 = {
//   type: 'line',
//   data: {
//     labels: [],
//     datasets: [{
//       label: 'Temperate',
//       data: valdata1,
//       borderWidth: 4
//     }]
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// }

// myChart2 = new Chart(ctx1, val4);
// val6.addEventListener('input', function (e) {
//   //if (e.key === 'Enter') {
//   console.log(e.target.value)
//   if (valdata1.length < 6) {
//     myChart2.data.datasets.data = valdata1.push(e.target.value);
//     myChart2.data.labels.push(clock3);
//     // console.log(myChart2);
//     myChart2.update();
//   }
//   else {
//     myChart2.data.datasets.data = valdata1.push(e.target.value);
//     myChart2.data.datasets.data = valdata1.shift(e.target.value);
//     myChart2.update();
//   }
//   //}
// })
// val5.addEventListener('onchange', (e) => {
//   console.log(val5.value);
// })

// NPK
// document.querySelector('.NPK1').addEventListener('click', chartNPK1);
// function chartNPK1() {
//   myChart1.data.datasets[0].label = '#NPK';
//   myChart1.update();
// }
// PH
document.querySelector('.PH1').addEventListener('click', chartPH1);
function chartPH1() {
  myChart1.data.datasets[0].label = '#PH';
  myChart1.update();
}
// Temperrature1
document.querySelector('.Temperature1').addEventListener('click', chartTemperature1);
function chartTemperature1() {
  myChart1.data.datasets[0].label = '#Temperature';
  myChart1.update();
}

// DO AM1
// document.querySelector('.Do-am1').addEventListener('click', chartDoAm1);
// function chartDoAm1() {
//   myChart1.data.datasets[0].label = '#Do Am';
//   myChart1.update();
// }
// Anh Sang1
// document.querySelector('.AnhSang1').addEventListener('click', chartAnhSang1);
// function chartAnhSang1() {
//   myChart1.data.datasets[0].label = '#Light Intensity';
//   myChart1.update();
// }
// Bieu Do
// const ctx = document.getElementById('myChart')
const ctx1 = document.getElementById('myChart1')
var valdata = [];
// var val2 = {
//   type: 'line',
//   data: {
//     labels: [],
//     datasets: [{
//       label: '# Temperate',
//       data: valdata,
//       borderWidth: 4
//     }]
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }

// }

// myChart1 = new Chart(ctx, val2);

// XOA PHAN CMT NAY BEN FILE JS
// XOA PHAN CMT NAY BEN FILE JS
// XOA PHAN CMT NAY BEN FILE JS
// cái gì quan trọng nói lại 3 lần

// val5.onchange=function(e){
//     if (valdata.length<6){
//         myChart1.data.datasets.data=valdata.push(Number(e.target.value));
//         myChart1.data.labels.push(clock2);
//         myChart1.update();
//     }
//     else {
//         myChart1.data.datasets.data=valdata.push(Number(e.target.value));
//         myChart1.data.datasets.data=valdata.shift(Number(e.target.value));
//         myChart1.update();
//     }
// }

// setInterval(function (e) {
//   const randomvalue = Math.floor(Math.random(39) * 100)
//   // if (randomvalue>=50){
//   //   bt_on1.classList.add('light')
//   // }
//   // else {bt_on1.classList.remove('light')}
//   if (valdata.length < 6) {
//     myChart1.data.datasets.data = valdata.push(randomvalue);
//     myChart1.data.labels.push(clock2);
//     myChart1.update();
//   }
//   else {
//     myChart1.data.datasets.data = valdata.push(randomvalue);
//     myChart1.data.datasets.data = valdata.shift();
//     myChart1.update();
//   }
// }, 5000)

// BIEU DO 2
var valdata1 = [];
var val3 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# Temperate',
      data: [],
      borderWidth: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }

}

myChart2 = new Chart(ctx1, val3);
// Bieu Do 1


var values = []
var times = []
const ctx = document.getElementById('myChart')
var val2 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# Temperate',
      data: [],
      borderWidth: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
}
myChart1 = new Chart(ctx, val2);
fetch('/api/adc1Start')
  .then(response => response.json())
  .then(data => {
    data.forEach((item) => {
      let localTime = moment.utc(item.time).utcOffset("+07:00").format("HH:mm:ss");
      //console.log(localTime);
      //console.log(item.value);
      values.unshift(item.value);
      times.unshift(localTime);
      myChart1.update();
    });
  })
  .catch(error => {
    console.error(error)
  })
function fetchADC() {
  fetch('/api/adc1Active')
    .then(response => response.json())
    .then(data => {
      let data1 = data;
      data.map(function (data1) {
        let localTime = moment.utc(data1.time).utcOffset("+07:00").format("HH:mm:ss");
        //console.log(data1.value);
        //console.log(localTime);
        values.shift();
        values.push(data1.value);
        times.shift();
        times.push(localTime);
        myChart1.update();
      })
    });
}
setInterval(fetchADC, 5000)
var valuesN = []
var valuesP = []
var valuesK = []
var valuespH = []
var valuesHumdity = []
var times1 = []
fetch('/api/Rs485Start')
  .then(response => response.json())
  .then(data => {
    data.forEach((item) => {
      let localTime = moment.utc(item.time).utcOffset("+07:00").format("HH:mm:ss");
      //console.log(localTime);
      //console.log(item.value);
      valuesN.unshift(item.N);
      valuesP.unshift(item.P);
      valuesK.unshift(item.K);
      valuespH.unshift(item.pH);
      valuesHumdity.unshift(item.humdity);
      times1.unshift(localTime);
      myChart2.update();
    });
  })
  .catch(error => {
    console.error(error)
  })
function fetchRS485() {
  fetch('/api/Rs485Active')
    .then(response => response.json())
    .then(data => {
      let data1 = data;
      data.map(function (data1) {
        let localTime = moment.utc(data1.time).utcOffset("+07:00").format("HH:mm:ss");
        //console.log(data1.value);
        //console.log(localTime);
        valuesN.shift();
        valuesN.push(data1.N);
        valuesP.shift();
        valuesP.push(data1.P);
        valuesK.shift();
        valuesK.push(data1.K);
        valuespH.shift();
        valuespH.push(data1.pH);
        valuesHumdity.shift();
        valuesHumdity.push(data1.humdity);
        times1.shift();
        times1.push(localTime);
        myChart2.update();
      })
    });
}
setInterval(fetchRS485, 5000)
// DO AM1
document.querySelector('.Do-am1').addEventListener('click', chartDoAm1);
function chartDoAm1() {
  myChart1.data.datasets[0].label = '#Do Am';
  myChart1.data.datasets[0].data = values;
  myChart1.data.labels = times
  myChart1.update();
}
// N2
document.querySelector('.valueN2').addEventListener('click', chartvalueN2);
function chartvalueN2() {
  myChart2.data.datasets[0].label = '#N';
  myChart2.data.datasets[0].data = valuesN;
  myChart2.data.labels = times1
  myChart2.update();
}
// P2
document.querySelector('.valueP2').addEventListener('click', chartvalueP2);
function chartvalueP2() {
  myChart2.data.datasets[0].label = '#P';
  myChart2.data.datasets[0].data = valuesP;
  myChart2.data.labels = times1
  myChart2.update();
}
// K2
document.querySelector('.valueK2').addEventListener('click', chartvalueK2);
function chartvalueK2() {
  myChart2.data.datasets[0].label = '#K';
  myChart2.data.datasets[0].data = valuesK;
  myChart2.data.labels = times1
  myChart2.update();
}
// K2
document.querySelector('.valuepH2').addEventListener('click', chartvaluepH2);
function chartvaluepH2() {
  myChart2.data.datasets[0].label = '#pH';
  myChart2.data.datasets[0].data = valuespH;
  myChart2.data.labels = times1
  myChart2.update();
}
// K2
document.querySelector('.valueHumdity2').addEventListener('click', chartvalueHumdity2);
function chartvalueHumdity2() {
  myChart2.data.datasets[0].label = '#Humdity';
  myChart2.data.datasets[0].data = valuesHumdity;
  myChart2.data.labels = times1
  myChart2.update();
}