combineBtn.addEventListener("mouseover", (e) => {
    // 阻止浏览器的默认行为！
    combineBtn.style.backgroundColor = 'orangered'
    document.body.style.cursor = "pointer"
}, false)
combineBtn.addEventListener("mouseout", (e) => {
    // 阻止浏览器的默认行为！
    document.body.style.cursor = ""
    combineBtn.style.backgroundColor = '#f5b59c'
}, false)

setting.addEventListener("mouseover", (e) => {
    // 阻止浏览器的默认行为！
    document.body.style.cursor = "pointer"
    setting.style.backgroundColor = 'orangered'
}, false)
setting.addEventListener("mouseout", (e) => {
    // 阻止浏览器的默认行为！
    document.body.style.cursor = ""
    setting.style.backgroundColor = '#f5b59c'
}, false)


for (let i = 0; i < 2; ++i) {
// 鼠标悬浮
    dragDiv[i].addEventListener("mouseover", (e) => {
        // 阻止浏览器的默认行为！
        document.body.style.cursor = "pointer"
    }, false)

// 鼠标离开
    dragDiv[i].addEventListener("mouseout", (e) => {
        // 阻止浏览器的默认行为！
        document.body.style.cursor = ""
    }, false)

// 拖拽悬浮
    dragDiv[i].addEventListener("dragover", (e) => {
        // 阻止浏览器的默认行为！
        e.preventDefault();
        drag_over_fun(dragDiv[i], title[i]);
    }, false)

// 释放
    dragDiv[i].addEventListener("drop", (e) => {
        e.preventDefault();
        //获取拖拽进来的文件
        let files = e.dataTransfer.files
        // 用于js之间传值
        drop_fun(files, dragInHiddenDiv[i], dragDiv[i], title[i], i);
    }, false)

// 拖拽进入
    dragDiv[i].addEventListener("dragenter", () => {
        // #c56fd5
        dragenter_fun(dragDiv[i], title[i]);
    })


// 拖拽离开
    dragDiv[i].addEventListener("dragleave", () => {
        dragleave_fun(dragDiv[i], title[i], dragInHiddenDiv[i])
    })



// 鼠标进入
    dragDiv[i].addEventListener("mouseover", () => {
        // #c56fd5
        dragenter_fun(dragDiv[i], title[i]);
    })

// 鼠标离开
    dragDiv[i].addEventListener("mouseout", () => {
        dragleave_fun(dragDiv[i], title[i], dragInHiddenDiv[i])
    })




// 点击button上传文件
    btn[i].onchange = after_upload_file[i]
}