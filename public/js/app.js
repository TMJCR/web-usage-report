document.querySelectorAll('.downloadText').forEach((item) => {
  item.style.opacity = 1;
});

const monthList = document.getElementById('month-selection');
const dayList = document.getElementById('day-selection');

const febMonths = [30, 31];
const aprMonths = [31];

monthList.onchange = function () {
  const selectedMonth = document.querySelector('#month-selection')
    .selectedOptions[0].label;
  const daySelection = document.querySelector('#day-selection').options;
  dayList.options.selectedIndex = 0;
  if (selectedMonth === 'Feb') {
    febMonths.forEach((month) => {
      daySelection[month - 1].disabled = true;
    });
  } else if (selectedMonth === 'Apr') {
    aprMonths.forEach((month) => {
      daySelection[month - 1].disabled = true;
    });
  } else {
    febMonths.forEach((month) => {
      daySelection[month - 1].disabled = false;
    });
  }
};

const dateForm = document.querySelector('#date-form');
dateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = document.querySelector('#day-selection').selectedOptions[0].value;
  const month = document.querySelector('#month-selection').selectedOptions[0]
    .value;
  const year = document.querySelector('#year-selection').selectedOptions[0]
    .value;
  fetch(
    `http://localhost:3000/data/?month=${month}&day=${day}+&year=${year}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
      } else {
        updateReport(data);
      }
    });
  });
});

const updateDownloadText = (data) => {
  document.querySelectorAll('.downloadText').forEach((item) => {
    const classToRemove = item.classList.value.split(' ').pop();
    item.classList.remove(classToRemove);
    item.classList.add(data.data.downloadColor);
    item.innerHTML = data.data.downloads[item.id];
  });
};

const updateValues = (data) => {
  const updates = document.querySelectorAll('.update');
  for (update of updates) {
    const item = update.id.split('-')[0];
    update.innerText = data.data[item];
  }
};

const updateTop5List = (data, listClass, variableName) => {
  let resultIndex;
  if (listClass.split('-')[1] === 'page') {
    resultIndex = 0;
  } else {
    resultIndex = 1;
  }
  const item = document.querySelectorAll(listClass);
  item.forEach((item, index) => {
    item.innerHTML = data.data[variableName][index][resultIndex];
  });
};

const updateTop5Image = (data) => {
  const item = document.querySelectorAll('.company-image');
  item.forEach((item, index) => {
    item.src = `../../public/img/${data.data.top5Companies[index][0]}.png`;
  });
};

const updateDisplayDate = (data) => {
  const date = document.querySelector('#displayDate-update');
  date.innerHTML = data.displayDate;
};

const updateChartDataAndCharts = (data) => {
  weeklyData = data.chartData.weeklyData;
  monthlyData = data.chartData.weeklyData;
  weeklyLabels = data.chartData.weeklyLabels;
  monthlyLabels = data.chartData.weeklyLabels;
  removeAndUpdateCharts();
};

const updateAnimation = () => {
  document.querySelectorAll('.shake').forEach((d) => {
    d.classList.add('shaker');
    setTimeout(() => {
      d.classList.remove('shaker');
    }, 1000);
  });
  document.querySelectorAll('.shakeSide').forEach((d) => {
    d.classList.add('shakerSide');
    setTimeout(() => {
      d.classList.remove('shakerSide');
    }, 1000);
  });
};

const updateReport = (data) => {
  updateValues(data);
  updateDownloadText(data);
  updateTop5List(data, '.popular-page', 'top5Pages');
  updateTop5List(data, '.popular-value', 'top5Pages');
  updateTop5List(data, '.company-page', 'top5Companies');
  updateTop5List(data, '.company-value', 'top5Companies');
  updateTop5Image(data);
  updateDisplayDate(data);
  updateChartDataAndCharts(data);
  updateAnimation();
};
