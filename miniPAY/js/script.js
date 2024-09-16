'use strict'

let flag = 0;
let prevAcc;
let withdrawImg;
let ATMtime;
let ATMtimeOut;
let accounts = [];
let oldData = '';

// this variable show total number of present accounts
let lastAccSl = 11;   // change this value whenever new account is added

let getLastAcc = Number(localStorage.getItem('lastAccSl'));

const timer = document.getElementById('time-box');

const settingContainer = document.getElementById('setting-container');
const setting = document.getElementById('setting');
const settingClose = document.getElementById('setting-close');
const save = document.getElementById('save');
const chngeAcc = document.getElementById('chng-acc');
const chngFname = document.getElementById('chng-fname');
const chngLname = document.getElementById('chng-lname');
const chngUserName = document.getElementById('chng-user-name');
const chngEaccPw = document.getElementById('chng-e-acc-pw');
const chngATMPin = document.getElementById('chng-ATM-pin');

const header = document.getElementById('header');
const userNameLabel = document.getElementById('user-name');
const body = document.getElementById('body');

const passbook = document.getElementById('passbook');
const bal = document.getElementById('bal');

const userId = document.getElementById('userId');
const userPw = document.getElementById('userPw');
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');
const welcome = document.getElementById('welcome');
const dashboard = document.getElementById('dashboard');

const transTo = document.getElementById('acc');
const transAmount = document.getElementById('amount');
const transBtn = document.getElementById('pay');
const transMsg = document.getElementById('msg');

const closePin1 = document.getElementById('close-acc1');
const closePin2 = document.getElementById('close-acc2');
const closeBtn = document.getElementById('closeBtn');
const closeMsg = document.getElementById('closeMsg');

const loanReason = document.getElementById('loan-reason');
const loanAmount = document.getElementById('loan-amount');
const loanBtn = document.getElementById('loanBtn');

const overlay = document.getElementById('overlay');
const overlayCloseBtn = document.getElementById('overlay-close');
const oluser = document.getElementById('oluser');
const olBal = document.getElementById('olBal');
const cAcc = document.getElementById('cAcc');
const cAmount = document.getElementById('cAmount');
const Cpay = document.getElementById('Cpay');

const atm = document.getElementById('atm-img');
const atmScreen = document.getElementById('atm-screen');
const atmclose = document.getElementById('atmclose');
const atmAcc = document.getElementById('atm-acc');
const atmPin = document.getElementById('atm-pw');
const atmMsg = document.getElementById('atm-msg');
const atmLoginInput = document.getElementById('atm-login');
const screenBox = document.getElementById('screen-box');
const screens = document.getElementById('screen');
const atmWithdraw = document.getElementById('atm-withdraw');
const atmMini = document.getElementById('atm-mini');
const atmBal = document.getElementById('atm-bal');
const withdrawSound = document.getElementById('withdraw-sound');

const createAcc = document.getElementById('createAcc');
const newAccBox = document.getElementById('new-acc-box');
const newName = document.getElementById('new-name');
const newLname = document.getElementById('new-lname');
const newAcc = document.getElementById('new-acc');
const newUserid = document.getElementById('new-userid');
const newEpw = document.getElementById('new-epw');
const newATMpin = document.getElementById('new-atm-pin');
const openAcc = document.getElementById('open-acc');
const newClose = document.getElementById('open-acc-close');
const newMsg = document.getElementById('new-msg');
const newInput = document.querySelectorAll('.new-input');



const dd = new Date().getDate();
const mm = new Date().getMonth();
const yy = new Date().getFullYear();
const todayDate = `${dd < 10 ? '0' + dd : dd}.${(mm + 1) < 10 ? '0' + (mm + 1) : mm + 1}.${yy}`;

const setDataToLocal = function(){
    accounts.forEach(function(acc, i){
        localStorage.setItem(`acc${i + 1}`, JSON.stringify(acc));
    });
};

const fetchLocalData = function(){
    const x = Number(localStorage.getItem('x'));
    for(let i = 0; i < x; i++){
            accounts.push(JSON.parse(localStorage.getItem(`acc${i + 1}`)));
    }
}

if(!localStorage.getItem('x') || !getLastAcc){
    const acc1 = {
        firstName: 'JCL',
        lastName: '',
        accountNo: 12345,
        userName: 'jcl',
        pin: 1111,
        atmPin: 1111,
        amounts: [12000, -4000, 2000,-7000, 10000, -5000, 2000],
        transType: ['deposit', 'withdraw', 'received from chote', 'withdraw', 'deposit', 'transfer to laddan', 'deposit'],
        dates: ['02.02.2022', '16.02.2022', '11.03.2022', '29.03.2022', '15.09.2022', '13.10.2022', '15.11.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0,
        no: 'acc1'
    };
    
    const acc2 = {
        firstName: 'Chote',
        lastName: 'Dost',
        accountNo: 67890,
        userName: 'chote',
        pin: 1111,
        atmPin: 1111,
        amounts: [1200, -400, 200,-700, 1000, -500, 44000, 2000, -1000, 50000, -14000],
        transType: ['deposit', 'withdraw', 'received from JCL', 'withdraw', 'deposit', 'transfer to laddan', 'deposit', 'deposit', 'withdraw', 'deposit', 'withdraw'],
        dates: ['02.02.2022', '16.02.2022', '11.03.2022', '29.03.2022', '15.09.2022', '13.10.2022', '15.10.2022', '15.10.2022', '15.10.2022', '15.10.2022', '15.10.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0,
        no: 'acc2'
    };
    
    const acc3 = {
        firstName: 'Laddan',
        lastName: 'Ansari',
        accountNo: 98765,
        userName: 'laddan',
        pin: 2222,
        atmPin: 2222,
        amounts: [1200, -400, 200,-700, 1000, -500, 8000, 30000],
        transType: ['deposit', 'withdraw', 'received from chote', 'withdraw', 'deposit', 'transfer to chote', 'deposit', 'deposit'],
        dates: ['02.02.2022', '16.02.2022', '11.03.2022', '29.03.2022', '15.09.2022', '13.10.2022', '27.11.2022', '02.12.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0,
        no: 'acc3'
    };
    
    const acc4 = {
        firstName: 'Partha',
        lastName: 'Maity',
        accountNo: 1111,
        userName: 'panda',
        pin: 7667,
        atmPin: 7667,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };
    
    const acc5 = {
        firstName: 'Black',
        lastName: 'Hole',
        accountNo: 9305814247,
        userName: 'abhi',
        pin: 9305,
        atmPin: 9305,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };
    
    const acc6 = {
        firstName: 'Rahul',
        lastName: 'Buddy',
        accountNo: 9839077259,
        userName: 'sahani',
        pin: 9839,
        atmPin: 9839,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };
    
    const acc7 = {
        firstName: 'Asad',
        lastName: 'Dude',
        accountNo: 7004765527,
        userName: 'asad',
        pin: 7004,
        atmPin: 7004,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };

    const acc8 = {
        firstName: 'Sunny',
        lastName: 'dude',
        accountNo: 7980809321,
        userName: 'sunny',
        pin: 7980,
        atmPin: 7980,
        amounts: [10],
        transType: ['deposit by Partha'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };

    const acc9 = {
        firstName: 'Vikas',
        lastName: 'Kumar',
        accountNo: 7400255746,
        userName: 'vikku',
        pin: 7400,
        atmPin: 7400,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };

    const acc10 = {
        firstName: 'Utkarsh',
        lastName: 'Bro',
        accountNo: 8303046060,
        userName: 'utkar',
        pin: 8303,
        atmPin: 8303,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };

    const acc11 = {
        firstName: 'Shelza',
        lastName: 'ka Bhatar',
        accountNo: 7275714707,
        userName: 'bagha',
        pin: 7275,
        atmPin: 7275,
        amounts: [60000],
        transType: ['deposit by JCL'],
        dates: ['02.02.2022'],
        totalBal: 0,
        loan: 0,
        loanDate: 0
    };


    accounts = [acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9, acc10, acc11];

    setDataToLocal();
    localStorage.setItem('lastAccSl', lastAccSl);
    localStorage.setItem('x', lastAccSl);
    
}
else if(getLastAcc !== lastAccSl){
    
    // add new accounts here and put their variable in accounts array
    // and after adding account update the lastAccSl variable to work properly

    // accounts = [acc12];
    let x = Number(localStorage.getItem('x'));
    for(let i = 0; i < accounts.length; i++){
        x++;
        localStorage.setItem(`acc${x}`, JSON.stringify(accounts[i]));
    }
    localStorage.setItem('x', x);
    accounts = [];
    localStorage.setItem('lastAccSl', lastAccSl);
    fetchLocalData();
}
else{
    fetchLocalData();
}

let currentAcc;


// ----------------transaction card builder function ----------------

const transCardBuilder = function(type, date, amount, el, atmCall){
    const card = `<div class="trans-card ${type.split(' ')[0]}">
                      <p class="date">${date}</p>
                      <p class="trans-type">${type[0].toUpperCase() + type.slice(1)}</p>
                      <p class="money">Rs ${Math.abs(amount).toFixed(2)}</p>
                  </div>`;
    atmCall === 2 ? el.insertAdjacentHTML('beforeend', card) : el.insertAdjacentHTML('afterbegin', card);
};


// ----------------------- timer -----------------------

const timeClearFun = function(){
    timer.textContent = '0 : 00';
    clearInterval(clearTime);
    timer.style.animationName = '';
    timer.textContent = '';
}

const timerStart = function(service){
    time = 300;
    // countdown
    setTimeout(() => { 
        service === 'ATM' ? timer.style.animationName = 'changeColorBlack' : timer.style.animationName = 'changeColor';
        clearTime = setInterval(function(){
            countDown(service);
        }, 1000);
    }, 200);
}

let time;
let clearTime;
const countDown = function(service){
    if(time !== 0){
        let min = (Math.floor(time / 60));
        let sec = time % 60;
        timer.textContent = `${min} : ${sec < 10 ? '0' + sec : sec}`;
        time--;
    }
    else{
        timeClearFun();
        service === 'ATM' ? atmScreenHide() : logOutFun();
    }
};



// ---------------- login and logout function ----------------

const loginFun = function(){
    flag = 0;
    currentAcc = accounts.find(function(acc){
        if(acc.userName.toLowerCase() === userId.value.toLowerCase() && acc.pin === Number(userPw.value)){
            timerStart('e-acc');
            userId.classList.remove('login-wrong');
            userPw.classList.remove('login-wrong');
            userId.style.opacity = 0;
            userPw.style.opacity = 0;
            loginBtn.style.opacity = 0;
            welcome.style.opacity = 0;
            createAcc.style.opacity = 0;
            atm.style.opacity = 0;
            userNameLabel.style.opacity = 1;
            setTimeout(() => {
                atm.classList.add('hide');
                userId.classList.add('hide');
                userPw.classList.add('hide');
                loginBtn.classList.add('hide');
                createAcc.classList.add('hide');
                welcome.classList.add('hide');
            }, 300);
            dashboard.classList.remove('hide');
            logoutBtn.classList.remove('hide');
            setting.classList.remove('hide');
            setting.classList.remove('hide');
            setTimeout(() => {
                dashboard.style.opacity = 1;
            }, 10);
            acc.totalBal = acc?.amounts.reduce((accu, amt) => accu + amt);
            bal.textContent = acc?.totalBal.toFixed(2);
            userNameLabel.textContent = 'Welcome ' + acc.firstName + ' ' + acc.lastName;
            header.classList.remove('height50');
            body.classList.toggle('dark-bg');

            return acc;
        }
        else{
            userId.classList.add('login-wrong');
            userPw.classList.add('login-wrong');
        } 
    });
    userId.value = '';
    userPw.value = '';
    currentAcc?.amounts.forEach(function(amt, i){
        transCardBuilder(currentAcc?.transType[i], currentAcc?.dates[i], amt, passbook, 1);
    });
}

loginBtn.addEventListener('click', loginFun);

const logOutFun = function(){
    body.classList.toggle('dark-bg');
    userId.style.opacity = 1;
    userPw.style.opacity = 1;
    loginBtn.style.opacity = 1;
    atm.style.opacity = 1;
    createAcc.style.opacity = 1;
    userNameLabel.style.opacity = 0;
    welcome.classList.remove('hide');
    setTimeout(() => {
        welcome.style.opacity = 1;
        userId.classList.remove('hide');
        userPw.classList.remove('hide');
        loginBtn.classList.remove('hide');
        atm.classList.remove('hide');
        createAcc.classList.remove('hide');
    }, 300);

    logoutBtn.classList.add('hide');
    setting.classList.add('hide');
    dashboard.classList.add('hide');
    setTimeout(() => {
        dashboard.style.opacity = 0;
    }, 10);
    const transCards = document.querySelectorAll('.trans-card');
    transCards.forEach(function(card){
        card.remove();
    });
    header.classList.add('height50');
    userNameLabel.textContent = '';

    setTimeout(() => {
        setDataToLocal();
        localStorage.setItem('lastAccSl', lastAccSl);
    }, 1000);
    settingClosefun();
}

logoutBtn.addEventListener('click', function(){
    timer.textContent = '0 : 00';
    clearInterval(clearTime);
    timer.style.animationName = '';
    timer.textContent = '';
    logOutFun();
});


//------------------- transfer money --------------------

const clearTransferInput = function(){
    transTo.value = '';
    transAmount.value = '';
}

const transferTo = function(accNo, amt){
    accNo.amounts.push(amt);
    accNo.transType.push(`received from ${currentAcc.firstName}`);
    accNo.dates.push(todayDate);
};

const transferFun = function(){
    const transAcc = accounts.find(function(acc){
        if(currentAcc?.totalBal < Number(transAmount.value)){
            transMsg.textContent = 'Insufficient Balance';
        }
        else if(Number(transTo.value) === currentAcc.accountNo){
            transMsg.textContent = 'Same Account';
        }
        else if(Number(transAmount.value) < 0 || !Number(transAmount.value)){
            transMsg.textContent = 'no negative amount';
        }
        else if(Number(transTo.value) === acc?.accountNo && Number(transTo.value) !== currentAcc.accountNo){
            transMsg.textContent = 'Transfered';
            return Number(transTo.value);
        }
        else{
            transMsg.textContent = 'Account not found';
        }
        setTimeout(() => {
            transMsg.textContent = ''; 
        }, 4000);
    });

    if(currentAcc?.totalBal >= Number(transAmount.value) && currentAcc.accountNo !== Number(transTo.value) && Number(transAmount.value) > 0 && transAcc){
        transCardBuilder(`transfer to ${transAcc.firstName}`, todayDate, Number(transAmount.value), passbook, 1);
        currentAcc.totalBal -= Number(transAmount.value);
        bal.textContent = currentAcc?.totalBal.toFixed(2);
        currentAcc.amounts.push(-Number(transAmount.value));
        currentAcc.transType.push(`transfer to ${transAcc.firstName}`);
        currentAcc.dates.push(todayDate);
        transferTo(transAcc, Number(transAmount.value));
        setDataToLocal();
        clearTransferInput();
    }
    else{
        clearTransferInput();
    }
}


transBtn.addEventListener('click', transferFun);

//----------------- close account ------------------

const closingFun = function(){
    const accIndex = accounts.findIndex(acc => acc.accountNo === currentAcc.accountNo);
    
    let x = Number(localStorage.getItem('x'));
    localStorage.clear();

    userId.classList.remove('hide');
    userPw.classList.remove('hide');
    loginBtn.classList.remove('hide');
    logoutBtn.classList.add('hide');
    setting.classList.add('hide');
    welcome.classList.remove('hide');
    dashboard.classList.add('hide');
    const transCards = document.querySelectorAll('.trans-card');
    transCards.forEach(function(card){
        card.remove();
    });

    accounts.splice(accIndex, 1);

    setTimeout(() => {
        localStorage.setItem('x', `${x - 1}`);
    }, 1010);

    userNameLabel.textContent = '';
    timeClearFun();
    clearPinInput();
    logOutFun();

    setTimeout(function(){
        alert('Account successfully closed');
    }, 500);
}

const clearPinInput = function(){
    closePin1.value = '';
    closePin2.value = '';
}

closeBtn.addEventListener('click', function(){
    if(closePin1.value === null || closePin1.value.match(/^ *$/) !== null || closePin2.value === null || closePin2.value.match(/^ *$/) !== null){
        clearPinInput();
        alert('Enter your password');
    }
    else if(Number(closePin1.value) === Number(closePin2.value) && Number(closePin1.value) === currentAcc.pin){
        if(currentAcc.totalBal > 0){
            overlay.classList.remove('hide');
            oluser.textContent = currentAcc.firstName + ' ' + currentAcc.lastName;
            olBal.textContent = currentAcc.totalBal;
            document.querySelector('body').style.overflow = 'hidden';
            clearPinInput();
        }
        else{
            closingFun();
        }
    }
    else{
        closeMsg.textContent = `Wrong Password ${2 - flag} Attempt Left`;
        flag++;
        clearPinInput();
        setTimeout(() => {
            closeMsg.textContent = '';
        }, 5000);
    }

    if(flag === 3){
        currentAcc.pin = '';
        timeClearFun();
        clearPinInput();
        logOutFun();

        setTimeout(() => {
            alert('e-Account Locked! \n3 unsuccessfull Attempt. \nPlease contact your branch to unlock your e-Account');
        }, 400);
    }
});

overlayCloseBtn.addEventListener('click', function(){
    overlay.classList.add('hide');
    document.querySelector('body').style.overflow = 'auto';
});


//------------------- loan ----------------------

const clearLoanInput = function(){
    loanReason.value = '';
    loanAmount.value = '';
}

loanBtn.addEventListener('click', function(){
    if(currentAcc.loanDate !== todayDate){
        currentAcc.loan = 0;
        currentAcc.loanDate = todayDate;
    }
    const leftLoan = 100000 - currentAcc.loan;
    if(loanReason.value === null || loanReason.value.match(/^ *$/) !== null){
        clearLoanInput();
        alert('Must provide any reason');
    }    
    else if(  1 > Number(loanAmount.value) ||  Number(loanAmount.value) > 100000){
        clearLoanInput();
        alert('Amount range 1 to 1 lakh');
    }
    else if(leftLoan < Number(loanAmount.value)){
        clearLoanInput();
        alert(`You have ${leftLoan} loan out of 1 Lakh`);
    }
    else{
        transCardBuilder(`loan for ${loanReason.value}`, todayDate, Number(loanAmount.value), passbook, 1);
        currentAcc.transType.push(`loan for ${loanReason.value}`);
        currentAcc.dates.push(todayDate);
        currentAcc.amounts.push(Number(loanAmount.value));
        currentAcc.totalBal += Number(loanAmount.value);
        currentAcc.loan += Number(loanAmount.value);
        bal.textContent = currentAcc?.totalBal.toFixed(2);
        setDataToLocal();
        clearLoanInput();
    }
});


// ---------------------------- atm login -----------------------------

const setAtmMsg = function(word){
    atmMsg.textContent = word;
    setTimeout(() => {
        atmMsg.textContent = '';
    }, 3000);
}

const clearAtmInput = function(){
    atmAcc.value = '';
    atmPin.value = '';
}

const atmLogin = function(){
    currentAcc = accounts.find(acc => acc?.accountNo === Number(atmAcc.value));
    if(atmAcc.value === null || atmAcc.value.match(/^ *$/) !== null || atmPin.value === null || atmPin.value.match(/^ *$/) !== null){
        clearAtmInput();
        alert('Please enter Account Number and Pin');
    }
    else if(!currentAcc){
        setAtmMsg('Account not found');
        clearAtmInput();
    }
    else if(currentAcc.atmPin !== Number(atmPin.value)){
        if(prevAcc !== currentAcc.accountNo){
            prevAcc = currentAcc.accountNo;
            flag = 0;
        }
        setAtmMsg(`Wrong Pin! ${2 - flag} attempt left`);
        clearAtmInput();
        flag += 1;
        if(currentAcc.atmPin === ''){
            setAtmMsg('Your ATM card is blocked');
        }
        else if(flag === 3){
            alert(`ATM BLOCKED!! \n3 unsuccessful attempt \nContact your nearest branch to unblock your ATM card`);
            currentAcc.atmPin = '';
            clearAtmInput();
            flag = 0;
        }
    }
    else{
        flag = 0;
        const br = document.createElement('br');
        currentAcc = currentAcc;
        timerStart('ATM');
        currentAcc.totalBal = currentAcc?.amounts.reduce((accu, amt) => accu + amt, 0);
        atmLoginInput.style.opacity = 0;
        setTimeout(() => {
            atmLoginInput.classList.add('hide');
            screenBox.classList.remove('hide');
        }, 300);
        setTimeout(() => {
            screenBox.style.opacity = 1;
        }, 350);
        screens.classList.add('scr-bal');
        screens.innerHTML = `Hii <br> ${currentAcc.firstName + ' ' + currentAcc.lastName}`;
        clearAtmInput();
    }
};

atmPin.addEventListener('keyup', function(){
    ATMtime = 500;
    clearTimeout(ATMtimeOut)
    if(atmPin.value.length === 4){
        ATMtimeOut = setTimeout(() => {
            atmLogin();
        }, ATMtime);
    }
});


// ---------------- atm balance check ----------------

atmBal.addEventListener('click', function(){
    const bal = currentAcc?.amounts.reduce((accu, amt) => accu + amt, 0);
    screens.classList.add('scr-bal');
    atmMini.classList.remove('active-btn');
    atmBal.classList.add('active-btn');
    atmWithdraw.classList.remove('active-btn');
    screens.innerHTML = `Balance <br> Rs ${bal}`;
});


// ---------------- ATM Mini Statement ----------------

atmMini.addEventListener('click', function(){
    screens.classList.remove('scr-bal');
    atmMini.classList.add('active-btn');
    atmBal.classList.remove('active-btn');
    atmWithdraw.classList.remove('active-btn');
    screens.textContent = '';
    const amts = [...currentAcc?.amounts].reverse();
    const types = [...currentAcc?.transType].reverse();
    const dates = [...currentAcc?.dates].reverse();
    amts.forEach(function(amt, i){
        if(i + 1 <= 10){
            transCardBuilder(types[i], dates[i], amt, screens, 2);
        }
    });    
});


// ---------------- ATM Withdrawal screen handler ----------------

const withScreenCard = `<div class="withdraw-screen">
                           <!-- <img src="./assets/withdraw.gif" class="withdraw-img hide" id="withdraw-img"> -->
                            <div class="atm-amt-pay">
                                <input type="number" class="atm-amt" id="atm-amt" placeholder="Amount">
                                <button class="atm-pay" id="atm-pay">Withdraw</button>
                            </div>
                        </div>`;

atmWithdraw.addEventListener('click', function(){
    screens.textContent = '';
    screens.classList.add('scr-bal');
    atmMini.classList.remove('active-btn');
    atmBal.classList.remove('active-btn');
    atmWithdraw.classList.add('active-btn');
    screens.insertAdjacentHTML('afterbegin', withScreenCard);

    const atmAmt = document.getElementById('atm-amt');
    const atmPay = document.getElementById('atm-pay');
    withdrawImg = document.getElementById('withdraw-img');

    atmPay.addEventListener('click', function(){
        const amt = Number(atmAmt.value);
        if(amt <= 0 || amt > currentAcc.totalBal){
            atmAmt.value = '';
            alert(`Amount should be greater than 0 and less than ${currentAcc.totalBal + 1}`);
        }
        else if((amt % 100) !== 0){
            atmAmt.value = '';
            alert('Enter amount in multiple of 100');
        }
        else if(amt > 10000){
            alert('Max amount = 10000');
        }
        else{
            const withImg = `<img src="./assets/moneyCount.gif" class="withdraw-img" id="withdraw-img">`;
            screens.insertAdjacentHTML('afterbegin', withImg);
            withdrawSound.play();
            atmMini.disabled = atmBal.disabled = atmWithdraw.disabled = true;
            atmclose.classList.add('hide');
            atmPay.classList.add('hide');
            atmAmt.classList.add('hide');
            atmMini.classList.toggle('atm-pay-disable');
            atmBal.classList.toggle('atm-pay-disable');
            atmWithdraw.classList.toggle('atm-pay-disable');
       
            currentAcc.amounts.push(-(amt));
            currentAcc.transType.push('withdraw');
            currentAcc.dates.push(todayDate);
            currentAcc.totalBal -= amt;
            atmAmt.value = '';

            setDataToLocal();
            
            setTimeout(() => {
                document.getElementById('withdraw-img').src = "./assets/withdraw.gif";
            }, 10000);
            
            setTimeout(() => {
                document.getElementById('withdraw-img').remove();
                atmMini.disabled = atmBal.disabled = atmWithdraw.disabled = false;
                atmclose.classList.remove('hide');
                atmAmt.classList.remove('hide');
                atmPay.classList.remove('hide');
                atmMini.classList.toggle('atm-pay-disable');
                atmBal.classList.toggle('atm-pay-disable');
                atmWithdraw.classList.toggle('atm-pay-disable');
            }, 18500);
        }
    })
});



// ---------------- atm screen hide and show ----------------

const atmScreenHide = function(){
    currentAcc = undefined;
    timeClearFun();
    atmScreen.style.opacity = 0;
    atmMini.classList.remove('active-btn');
    atmBal.classList.remove('active-btn');
    atmWithdraw.classList.remove('active-btn');
    clearAtmInput();
    setTimeout(() => {
        atmScreen.classList.add('hide');
        atmLoginInput.style.opacity = 0;
        atmLoginInput.classList.remove('hide');
        screenBox.classList.add('hide');
    }, 300);
}

atm.addEventListener('click', function(){
    atmScreen.classList.remove('hide');
    atmLoginInput.classList.remove('hide');
    atmLoginInput.style.opacity = 1;
    setTimeout(() => {
        atmScreen.style.opacity = 1;
    }, 1);
});

atmclose.addEventListener('click', atmScreenHide);

window.addEventListener('beforeunload', function(){
    setDataToLocal();
});


//-------------------------- setting button logic -------------------------

const settingInputClear = function(){
    chngFname.value = '';
    chngLname.value = '';
    chngUserName.value = '';
    chngEaccPw.value = '';
    chngATMPin.value = '';
}

const settingClosefun = function(){
    settingContainer.style.opacity = 0;
    setTimeout(() => {
        settingContainer.classList.add('hide');
    }, 100);

    disableInput();
    oldData = '';
    settingInputClear();
}

const disableInput = function(){
    const changeInput = document.querySelectorAll('.change-inputs');
    for(let i = 0; i < changeInput.length; i++){
        changeInput[i].setAttribute('disabled', '');
    }
}

setting.addEventListener('click', function(){
    settingContainer.classList.remove('hide');
    setTimeout(() => {
        settingContainer.style.opacity = 1;
    }, 10);

    chngeAcc.value = currentAcc.accountNo;
    chngFname.value = currentAcc.firstName;
    chngLname.value = currentAcc.lastName;
    chngUserName.value = currentAcc.userName.toLowerCase().toLowerCase();
    chngEaccPw.value = currentAcc.pin;
    chngATMPin.value = 'o o o o';

    const editBtns = document.querySelectorAll('.edit-btn');
    const changeInput = document.querySelectorAll('.change-inputs');

    for(let i = 0; i < changeInput.length; i++){
        editBtns[i].addEventListener('click', function(){
            changeInput[i].removeAttribute('disabled');
            changeInput[i].value = '';
        });
    }

    oldData += currentAcc.firstName + currentAcc.lastName + currentAcc.userName + currentAcc.pin + currentAcc.atmPin;

});

settingClose.addEventListener('click', settingClosefun);

//---------------------- setting save button -----------------------

save.addEventListener('click', function(){
    let flag = true;
    let newData = '';
    let x = false;

    flag = accounts.find(acc => chngUserName.value.toLowerCase() === acc.userName);
    
    if(chngFname.value.match(/^ *$/) === null){
        currentAcc.firstName = chngFname.value;
        x = true;
    }
    
    if(chngLname.value.match(/^ *$/) === null){
        currentAcc.lastName = chngLname.value;
        x = true;
    }

    if(chngUserName.value.match(/^ *$/) === null && chngUserName.value.length < 4){
        alert('Atleast 4-characters');
        chngUserName.value = '';
        x = false;
    }
    else if(flag?.userName && chngUserName.value.toLowerCase() !== currentAcc.userName){
        alert('username already exist');
        chngUserName.value = '';
        x = false;
    }
    // e-account password logic
    else if(chngEaccPw.value[0] === '0'){   
        alert('First digit non-zero. No dot or negative ');
        chngEaccPw.value = '';
        x = false;
    }
    else if(!chngEaccPw.value.match(/^[0-9]+$/) && chngEaccPw.value.match(/^ *$/) === null){
        alert('Only digit');
        chngEaccPw.value = '';
        x = false;
    }
    else if(chngEaccPw.value.length < 4 && chngEaccPw.value.match(/^ *$/) === null){
        alert('Atleast 4-digit');
        chngEaccPw.value = '';
        x = false;
    }
    else{
        if(!flag && chngUserName.value.match(/^ *$/) === null){
                currentAcc.userName = chngUserName.value.toLowerCase();
                x = true;
        }

        if(chngEaccPw.value.match(/^ *$/) === null){
            currentAcc.pin = Number(chngEaccPw.value);
            x = true;
        }

        // atm pin logic
        if(chngATMPin.value === 'o o o o'){
        }
        else if(chngATMPin.value[0] === '0' || chngATMPin.value[0] === '.' || chngATMPin.value[0] === '-'){ 
            alert('First digit non-zero, dot or negative');
            chngATMPin.value = '';
            x = false;
        }
        else if(!chngATMPin.value.match(/^[0-9]+$/) && chngATMPin.value.match(/^ *$/) === null){
            alert('Only digit');
            chngATMPin.value = '';
            x = false;
        }
        else if(chngATMPin.value.length < 4 && chngATMPin.value.match(/^ *$/) === null){
            alert('Only 4-digit');
            chngATMPin.value = '';
            x = false;
        }
        else if(chngATMPin.value.match(/^ *$/) === null){
            currentAcc.atmPin = Number(chngATMPin.value);
            x = true;
        }
    }

    newData = currentAcc.firstName + currentAcc.lastName + currentAcc.userName + currentAcc.pin + currentAcc.atmPin;

    if(x && newData === oldData){
        disableInput();
        newData = '';
        settingClosefun();
    }
    else if(x && newData !== oldData){
        disableInput();
        settingClosefun();
        time = 0;
        setTimeout(() => {
            alert('Changes saved \nPlease login again.');
        }, 500);
    }
});


// ---------------- open new account logic ------------------

let accOk = 0;
let userOk = 0;
let epassOk = 0;
let atmPinOk = 0;
let newAccObj;

const newAccMsg = function(str){
    ATMtime = 2000;
    clearTimeout(ATMtimeOut)
    newMsg.classList.add('sticky');
    newMsg.textContent = str;
    ATMtimeOut = setTimeout(() => {
        newMsg.classList.remove('sticky');
        newMsg.innerHTML = '&nbsp;';
    }, ATMtime);
};

const disableOpenBtn = function(el){
    openAcc.setAttribute('disabled', '');
    el.classList.add('new-wrong');
};

const enableOpenBtn = function(el){
    openAcc.removeAttribute('disabled');
    el.classList.remove('new-wrong');
};

createAcc.addEventListener('click', function(){
    newAccBox.classList.remove('hide');
    setTimeout(() => {
        newAccBox.style.opacity = 1;
    }, 2);

    // checking account number whether it is exist or not
    newAcc.addEventListener('keyup', function(){
        
        if(Number(newAcc.value[0]) === 0){
            newAccMsg('First digit non-zero');
            disableInput(newAcc);
            accOk = 0;
        }
        else if(newAcc.value.match(/^[0-9]+$/) === null){
                newAccMsg('Only digit');
                disableOpenBtn(newAcc);
                accOk = 0;
        }
        else if(newAcc.value.length === 10){
            if(!accounts.find(acc => Number(newAcc.value) === acc.accountNo)){
                accOk = Number(newAcc.value);
                enableOpenBtn(newAcc);
            }
            else{
                newAccMsg('Account Number already exist');
                accOk = 0;
            }
        }
        else{
            disableOpenBtn(newAcc);
        }
    });

    // checking user name of atleast 4 char
    newUserid.addEventListener('keyup', function(){
        if(newUserid.value.length < 4){
            disableOpenBtn(newUserid);
            userOk = 0;
        }
        else{
            const x = accounts.find(acc => acc.userName === newUserid.value);
            if(x?.userName.toLowerCase() === newUserid.value.toLowerCase()){
                newAccMsg('user already exist');
                disableOpenBtn(newUserid);
                userOk = 0;
            }
            else{
                userOk = newUserid.value.toLowerCase();
                enableOpenBtn(newUserid);
            }
        }
    });

    // checking new e-acc password of atleast 4 char
    newEpw.addEventListener('keyup', function(){
        if(Number(newEpw.value[0]) === 0){
            newAccMsg('First digit non-zero');
            disableOpenBtn(newEpw);
            epassOk = 0;
        }
        else if(newEpw.value.match(/^[0-9]+$/) === null){
            newAccMsg('Only digit');
            disableOpenBtn(newEpw);
            epassOk = 0;
        }
        else if(newEpw.value.length < 4){
            disableOpenBtn(newEpw);
            epassOk = 0;
        }
        else{
            enableOpenBtn(newEpw);
            epassOk = Number(newEpw.value);
        }
    })

    // checking atm pin of atleast 4 char and should be number
    newATMpin.addEventListener('keyup', function(){
        if(Number(newATMpin.value[0]) === 0){
            disableOpenBtn(newATMpin);
            newAccMsg('First digit non-zero');
            atmPinOk = 0;
        }
        else if(newATMpin.value.match(/^[0-9]+$/) === null){
            newAccMsg('Only digit');
            disableOpenBtn(newATMpin);
            atmPinOk = 0;
        }
        else if(!(newATMpin.value.length === 4)){
            disableOpenBtn(newATMpin);
            atmPinOk = 0;
        }
        else{
            atmPinOk = Number(newATMpin.value);
            enableOpenBtn(newATMpin);
        }
    });
});

const closeCreateAcc = function(){
    newAccBox.style.opacity = 0;
    setTimeout(() => {
        newAccBox.classList.add('hide');
    }, 300);

    // clearing input field
    newInput.forEach(function(input){
        input.value = '';
        input.classList.remove('new-wrong');
    });

    openAcc.removeAttribute('disabled');

    accOk = 0;
    userOk = 0;
    epassOk = 0;
    atmPinOk = 0;
}

newClose.addEventListener('click', closeCreateAcc);

openAcc.addEventListener('click', function(){
    let flag = true;
    let m;
    newInput.forEach(function(inp){   // checking blank input
        if(inp.value.match(/^ *$/) !== null){
            inp.classList.add('new-wrong');
            flag = false;
        }
        else{
            inp.classList.remove('new-wrong');
        }
    });

    if(flag && accOk && userOk && epassOk && atmPinOk){
        newAccObj = {
            amounts: [],
            transType: [],
            dates: [],
            totalBal: 0,
            loan: 0,
            loanDate: 0,
            no: ''
        };
    
        m = Number(localStorage.getItem('x'));
        m++;

        newAccObj.firstName = newName.value;
        newAccObj.lastName = newLname.value;
        newAccObj.accountNo = accOk;
        newAccObj.userName = userOk;
        newAccObj.pin = epassOk;
        newAccObj.atmPin = atmPinOk;
        newAccObj.amounts.push(2000);
        newAccObj.transType.push('deposit');
        newAccObj.dates.push(`${todayDate}`);
        newAccObj.no = `acc${m}`;

        localStorage.setItem(`acc${m}`, JSON.stringify(newAccObj));
        localStorage.setItem('x', `${m}`);

        accounts.push(newAccObj);

        closeCreateAcc();
        setTimeout(() => {
            alert('Your account is successfully created');
        }, 100);
    }
    else{
        if(!accOk)
            disableOpenBtn(newAcc);
        if(!userOk)
            disableOpenBtn(newUserid);
        if(!epassOk)
            disableOpenBtn(newEpw);
        if(!atmPinOk)
            disableOpenBtn(newATMpin);        
    }
});



