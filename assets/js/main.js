const radioBtn = document.querySelectorAll('input[type="radio"]'),
      inputs = document.querySelectorAll('input[type="tel"]'),
      inputTotal = document.querySelector('#number'),
      inputPercent = document.querySelector('#percent'),
      inputPeople = document.querySelector('#numberOfPeople'),
      numPercent = document.querySelectorAll('[data-num]'),
      amountWrapper = document.querySelector('.tip-amount-sum span'),
      totalWrapper = document.querySelector('.total-sum span');

      calculateTip();

radioBtn.forEach(radio => {
    radio.addEventListener('click', (e) => {
        checkDataAttributes(e);
        isRadioClicked = true; // устанавливаем флаг после первого нажатия на radio
        checkIfRadioClicked();
    });
});

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        calculateTip();
        validateInput(e.target);
        checkRadioToChecked(e);
        checkDataAttributes(e);
    })
});



let isRadioClicked = true;

function checkIfRadioClicked() {
    if (isRadioClicked) {
        calculateTip();
    }
}


function validateInput(input) {
    input.value = input.value.replace(/[^0-9\.]/g, ''); // удаляем все, кроме цифр

    // Проверяем кол-во введенных символов для инпутов
    if (inputPeople.value > 10) {
      inputPeople.value = inputPeople.value.slice(0, 2); 
    } 
    if (inputPercent.value.length > 2){
        inputPercent.value = inputPercent.value.slice(0, 2); 
    }
    if (inputTotal.value.length > 6){
        inputTotal.value = inputTotal.value.slice(0, 5); 
    }
}  


function checkRadioToChecked(event){
    let target = event.target;
    if (target === inputs[1]){
        radioBtn.forEach(btn => {
            btn.checked = false;
        });
    }
}

let percent = 0;

function checkDataAttributes(event){

    if (event.target.checked === false){
        percent = inputPercent.value;
    } else {
        inputPercent.value = '';

        let dataNumber = event.target.value;
        switch (dataNumber) {
            case '5':
                percent = parseInt(dataNumber);
                break;
            case '10':
                percent = parseInt(dataNumber);
                break;
            case '15':
                percent = parseInt(dataNumber);
                break;
            case '25':
                percent = parseInt(dataNumber);
                break;
            case '50':
                percent = parseInt(dataNumber);
                break;
        }
    }
}

function calculateTip() {
    let total = inputTotal.value,
        people = inputPeople.value;

    // Проверяем наличие данных и их корректность, а также флаг isRadioClicked
    if (total && people && percent > 0 && isRadioClicked) {
        // чаевые на человека
        let percentNum = (total * percent) / 100;
        let tipAmount = percentNum / people;
        tipAmount = tipAmount.toFixed(2);
        // общая сумма на людей
        let perPerson = (percentNum + +total) / people;
        perPerson = perPerson.toFixed(2);

        amountWrapper.textContent = '$' + tipAmount;
        totalWrapper.textContent = '$' + perPerson;
    } else {
        // Если данные некорректны, очищаем результаты
        amountWrapper.textContent = '$0.00';
        totalWrapper.textContent = '$0.00';
    }
}

// TODO: Решить как можно исправить проблему с расчетом чаевых и общей суммы;


new JustValidate('form', {
    rules: {
        number: {
            required: true
        },
        radio: {
            required: true
        }
    },
    messages: {
        number: {
            required: "Can't be zero"
        },
        radio: {
            required: "Can't be zero"
        }
    },
    submitHandler: function () {
        location.reload();
        
    }
});