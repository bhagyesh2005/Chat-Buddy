const log = document.getElementById('log1');
const res = document.getElementById('Res');
const cl = document.getElementById('cl');
const rl = document.getElementById('rl');
const RegisterBtn = document.getElementById('Register-btn');
const idotp = document.getElementById('id-otp');
const getOTP = document.getElementById('getOTP');
const popup = document.querySelector('.pop-up');

cl.addEventListener('click', () => {
    log.classList.add('isactive');
    res.classList.remove('isactive');
});

rl.addEventListener('click', () => {
    log.classList.remove('isactive');
    res.classList.add('isactive');
});

// OTP verification 

idotp.addEventListener('click', async () => {
    event.preventDefault();
    var eid = document.getElementById('emailID');
    if (eid.value === '') {
        popup.classList.remove('ispop'); // Show the popup initially
        if (popup.timeoutId) {
            clearTimeout(popup.timeoutId);
        }
        popup.timeoutId = setTimeout(() => {
            popup.classList.add('ispop');
        }, 2000);
        return;
    }

    const op = await fetch('http://localhost:5500/api/getverified', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailID: eid.value,
        }),
    });
});


// export default getOTP;