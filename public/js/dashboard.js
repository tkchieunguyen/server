// Chart.register(ChartDataLabels);
//var bt_on2 = document.querySelector('.btn_on2');
// var bt_on3 = document.querySelector('.btn_on3');
var bt_on4 = document.querySelector('.btn_on4');
var bt_on5 = document.querySelector('.btn_on5');
var bt_on6 = document.querySelector('.btn_on6');
var bt_on7 = document.querySelector('.btn_on7');
var bt_on8 = document.querySelector('.btn_on8');
var bt_on9 = document.querySelector('.btn_on9');
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
}
box_on.addEventListener('click', addactive)

function addactive1() {
  box_on1.classList.toggle('boxactive');
  btn_on1.classList.toggle('btnactive');
  dis_auto2.classList.toggle('light');
  dis_manual2.classList.toggle('light');
  bt_on4.classList.toggle('display-none');
  document.querySelector('.element4').classList.toggle('display-none');
  bt_on5.classList.toggle('display-none');
  document.querySelector('.element5').classList.toggle('display-none');
  bt_on6.classList.toggle('display-none');
  document.querySelector('.element6').classList.toggle('display-none');
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

bt_on4.addEventListener('click', addlight4);
function addlight4() {
  bt_on4.classList.toggle('light');
}

bt_on5.addEventListener('click', addlight5);
function addlight5() {
  bt_on5.classList.toggle('light');
}

bt_on6.addEventListener('click', addlight6);
function addlight6() {
  bt_on6.classList.toggle('light');
}


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
document.querySelector('.NPK1').addEventListener('click', chartNPK1);
function chartNPK1() {
  myChart1.data.datasets[0].label = '#NPK';
  // xóa cmt để sử dụng khi muốn thay đổi dữ liệu
  // myChart1.data.datasets[0].data=[mang gia tri tren sv gui ve]
  myChart1.update();
}

// DO AM
document.querySelector('.Do-am1').addEventListener('click', chartDoAm1);
function chartDoAm1() {
  myChart1.data.datasets[0].label = '#Do Am';
  myChart1.update();
}
// Luong Mua
document.querySelector('.Luong-mua1').addEventListener('click', chartLuongMua1);
function chartLuongMua1() {
  myChart1.data.datasets[0].label = '#Luong Mua';
  myChart1.update();
}
// Bieu Do
const ctx = document.getElementById('myChart')
const ctx1 = document.getElementById('myChart1')
var valdata = [];
var val2 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# Temperate',
      data: valdata,
      borderWidth: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

}

myChart1 = new Chart(ctx, val2);

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

setInterval(function (e) {
  if (valdata.length < 6) {
    myChart1.data.datasets.data = valdata.push(Math.floor(Math.random(39) * 100));
    myChart1.data.labels.push(clock2);
    myChart1.update();
  }
  else {
    myChart1.data.datasets.data = valdata.push(Math.floor(Math.random(39) * 100));
    myChart1.data.datasets.data = valdata.shift();
    myChart1.update();
  }
}, 5000)

// BIEU DO 2
var valdata1 = [];
var val3 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '# Temperate',
      data: valdata1,
      borderWidth: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

}

myChart2 = new Chart(ctx1, val3);

setInterval(function (e) {
  if (valdata1.length < 6) {
    myChart2.data.datasets.data = valdata1.push(Math.floor(Math.random(39) * 100));
    myChart2.data.labels.push(clock3);
    myChart2.update();
  }
  else {
    myChart2.data.datasets.data = valdata1.push(Math.floor(Math.random(39) * 100));
    myChart2.data.datasets.data = valdata1.shift();
    myChart2.update();
  }
}, 5000)


