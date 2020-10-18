function validate() {
    var userName = document.getElementById("userName");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var message = document.getElementById("massage");

    var expName = /[A-Za-z]+/;
    var expPhone = /\+\d\(\d{3}\)\d{3}-\d{4}/;
    var expEmail = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;

    if (!userName.value || !expName) {
        userName.style.border = "2px solid red";
        alert("Введите своё Имя");
        return false;
    }else{
        userName.style.border = "2px solid green";
    }
    if (!phone.value || !expPhone) {
        phone.style.border = "2px solid red";
        alert("Введите свой телефон");
        return false;
    }else{
        phone.style.border = "2px solid green";
    }
    if (!email.value || !expEmail) {
        email.style.border = "2px solid red";
        alert("Введите свой email");
        return false;
    }else{
        email.style.border = "2px solid green";
    }
    if (!message.value) {
        message.style.border = "2px solid red";
        alert("Введите текстовое сообщение");
        return false;
    }else{
        message.style.border = "2px solid green";
    }

    return true;

}