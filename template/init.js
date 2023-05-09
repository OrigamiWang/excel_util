let path1 = document.getElementById('drop_area1_in_hidden')
let path2 = document.getElementById('drop_area2_in_hidden')
let setting = document.getElementById('setting')
let combineBtn = document.getElementById('combine_btn')
let file_btn1 = document.getElementById('file_btn1')
let file_btn2 = document.getElementById('file_btn2')
let file_btn_arr = [file_btn1, file_btn2]
let file_btn_id = ['file_btn1', 'file_btn2']
let sub_file_btn = [
    document.getElementById('drop_area1'),
    document.getElementById('drop_area2')
]
let dst_file_btn = [
    document.getElementById('file_btn1'),
    document.getElementById('file_btn2')
]

let dragDiv = [
    document.getElementById('drop_area1'),
    document.getElementById('drop_area2')
]
let dragInHiddenDiv = [
    document.getElementById('drop_area1_in_hidden'),
    document.getElementById('drop_area2_in_hidden')
]
let title = [
    document.getElementById('title1'),
    document.getElementById('title2')
]
let btn = [
    document.getElementById('file_btn1'),
    document.getElementById('file_btn2')
]


function message_box(words, color, time) {
    let messageBox = document.getElementById("message-box");
    messageBox.innerText = words
    messageBox.style.display = "block";
    messageBox.style.backgroundColor = color;
    setTimeout(function () {
        messageBox.style.display = "none";
    }, time);
}