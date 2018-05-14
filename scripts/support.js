
function hideChatBox () {
    document.getElementById("Support-chatBox").style.display = "none" ;
    document.getElementById("Support-chatBtn").style.display = "block" ;
}

function showChatBox () {
    if (document.getElementById("support-man-last").innerHTML == ""){
        get_support_inf();
    }
    chat_start();
    document.getElementById("Support-chatBox").style.display = "block" ;
    document.getElementById("Support-chatBtn").style.display = "none" ;
}

function create_a_received_msg(message_txt) {
    var msg = document.createElement('div');
    var paragraph_value = document.createElement('p');
    var profile = document.createElement('img');
    paragraph_value.className = 'supp_one_message_txt';
    msg.className = "supp_one_message_receive";
    profile.className = "profile";
    profile.src = document.getElementById("support-man-pic").src;
    paragraph_value.innerHTML = message_txt ;
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    div1.appendChild(paragraph_value);
    div3.appendChild(profile);
    msg.appendChild(div1);
    msg.appendChild(div2);
    msg.appendChild(div3);

    var content = document.getElementById("Support-chatBox-content");
    content.appendChild(msg);
}

function create_a_send_msg() {
    var inputTxt = document.getElementById("inputTextBox").value;
    if (inputTxt != '') {
        var msg = document.createElement('div');
        var paragraph_value = document.createElement('p');
        var profile = document.createElement('img');
        paragraph_value.className = 'supp_one_message_txt';
        msg.className = "supp_one_message_send";
        profile.className = "profile";
        profile.src = "icons/Ex-2.jpg";
        paragraph_value.innerHTML = inputTxt;
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        div1.appendChild(paragraph_value);
        div3.appendChild(profile);
        msg.appendChild(div3);
        msg.appendChild(div2);
        msg.appendChild(div1);

        var content = document.getElementById("Support-chatBox-content");
        content.appendChild(msg);

        send_msg();
        receive_msg();
    }
    else {
        alert("لطفا پیام خود را در کادر مربوطه وارد نمایید");
    }
}

function chat_start() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function chat_start_process(){
        if(this.readyState == 4){
            if(this.status == 200){
                return true ;
            }
            else {
                window.alert("Error: "+ this.statusText);
                return false ;
            }
        }
    };
    xmlhttp.open("GET","https://test-chat.fandogh.org/start",true);
    xmlhttp.send(null);
}

/*
function chat_start() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = chat_start_process;
    xmlhttp.open("GET","http://51.15.59.130:46260/start",true);
    xmlhttp.send(null);

    myVar = setTimeout(chat_start_process, 200);

    function chat_start_process(){
        if(this.readyState == 4){
            if(this.status == 200){
                window.alert("Sucses "+ this.statusText);
                return true ;
                clearTimeout(myVar);
            }
            else {
                window.alert("Error: "+ this.statusText);
                return false ;
            }
        }
    };
}
*/


function send_msg() {

    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function send_msg_process(){
        if(this.readyState == 4){
            if(this.status == 200){
                document.getElementById("inputTextBox").value = '';
                return true ;
            }
            else {
                window.alert("Error: "+ this.statusText);
                return false ;
            }
        }
    };
    xmlhttp.open("POST","https://test-chat.fandogh.org/send",true);
    var msg_body = '{"message" : "Salam"}';
    xmlhttp.send(msg_body);
}


function get_support_inf() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange =  function get_support_inf_process(){
        if(this.readyState == 4){
            if(this.status == 200){
                var response = this.responseText;
                console.log(JSON.parse(response));
                var Data = JSON.parse(response);
                var f_name = Data.support.first;
                var l_name = Data.support.last;
                var pic_addr = Data.support.picture;
                document.getElementById("support-man-last").innerHTML = l_name;
                document.getElementById("support-man-first").innerHTML = f_name;
                document.getElementById("support-man-pic").src = pic_addr ;
            }
            else {
                window.alert("Error: "+ this.statusText);
            }
        }
    };;
    xmlhttp.open("GET","https://test-chat.fandogh.org/support",true);
    xmlhttp.send(null);
}

function receive_msg() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange =  function receive_msg_process(){
        if(this.readyState == 4){
            if(this.status == 200){
                var response = this.responseText;
                console.log(JSON.parse(response));
                var Data = JSON.parse(response);
                create_a_received_msg(Data.responses[0].message)
            }
            else {
                window.alert("Error: "+ this.statusText);
            }
        }
    };;
    xmlhttp.open("GET","https://test-chat.fandogh.org/fetch",true);
    xmlhttp.send(null);
}
