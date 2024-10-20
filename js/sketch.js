//let SCREEN_WIDTH = 1063 / 2;
//let SCREEN_HEIGHT = 1890 / 2;


let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;


let SCREEN_RATIO = 1;
let initial_img;
let seq = 0;
let cam;
let targetSize = 480; // 您希望截取的目标尺寸


let button1, button_next, button_snap, button_save;
let button_proceed, button_retake, button_submit;
let button_edit, button_text_input;


//let emoji_1_sun, button_emoji_1_sun;
let showEmoji1 = false;
let bs1_sun;


// IMG


let buttons_icons = [
    'assets/fire_emoji.png',
    'assets/Dragon_emoji.png',
    'assets/rainbow_emoji.png',
    'assets/he_emoji.png',
    'assets/emoji_eye.png',
    'assets/emoji_moon.png',
    'assets/emoji_mouth.png',
    'assets/emoji_shan.png',
    'assets/emoji_sun.png',
    'assets/emoji_tree.png',
    'assets/emoji_star.png',
    'assets/emoji_water.png',
    'assets/emoji_wind.png',


    'assets/emoji_che.png',
    'assets/emoji_hua.png',

    'assets/emoij_jin.png',
    'assets/emoji_xin.png',
    'assets/emoij_shu.png',
    'assets/emoji_shou.png',
    'assets/emoji_no.png',
    // 'assets/1.png',
    // 'assets/2.png',
    // 'assets/3.png',
    // 'assets/4.png',
    // 'assets/5.png',
    // 'assets/6.png',

];


let imageULRs = ['assets/huo.png',
    'assets/long.png',
    'assets/caihong.png',
    'assets/he.png',
    'assets/eye.png',
    'assets/moon.png',
    'assets/tongue.png',
    'assets/shan.png',
    'assets/sun.png',
    'assets/sen.png',
    'assets/star.png',
    'assets/water.png',
    'assets/feng.png',

    'assets/che.png',
    // 'assets/feng.png',
    'assets/hua.png',
    'assets/jin.png',
    'assets/xin.png',
    'assets/shu.png',
    'assets/shou.png',
    'assets/no.png'

]


let BGPicURLs = ['assets/k1.png', 'assets/k2.png', 'assets/k3.png', 'assets/k4.png'];

let BGPics = []

let images = []


let selected_emojis = [];


//let em1X, em1Y;


let edit_time = false;

//scale

let img = [];
let buttons = [];
let eraseMode = false;
let scaleMode = false;
let selectedImageIndex = -1;
let selectedMergedImageIndex = -1;


// CAM
let snap;
let tempCanvas;

let userTextInput = "";


// TEXT OBJ
let userTextObj = "";
let textX, textY;


let words;


function preload() {
    initial_img = loadImage('assets/ins.png');


    //emoji_1_sun = loadImage('assets/em1.png');


    for (let i = 0; i < imageULRs.length; i++) {
        images.push(loadImage(imageULRs[i]));
    }

    for (let i = 0; i < BGPicURLs.length; i++) {
        BGPics.push(loadImage(BGPicURLs[i]));
    }
    for (let i = 0; i < BGPics.length; i++) {
        console.log(BGPics[i]);
    }


    // images.push(loadImage('assets/long.png'));
    // images.push(loadImage('assets/caihong.png'));
    // images.push(loadImage('assets/he.png'));


    // buttons_icons.push(loadImage('assets/fire_emoji.png'));
    // buttons_icons.push(loadImage('assets/dragon_emoji.png'));
    //images.parent("asset_container");


}

let eraseSignImg;
let scaleSignImg;


function setup() {

    eraseSignImg = loadImage("assets/shanchu.png");
    scaleSignImg = loadImage("assets/drag.png");

    let canvas = createCanvas(480, 480);
    canvas.parent("p5-canvas-container");
    // cam = createCapture(VIDEO);
    // cam.size(480, 480);
    // cam.hide();
    cam = createCapture(VIDEO, function () {
        console.log("Camera is ready.");
        // 动态获取摄像头的分辨率
        console.log('Camera resolution:', cam.width, 'x', cam.height);

        // 保证摄像头已经设置好
        if (cam.width < targetSize || cam.height < targetSize) {
            console.log('Camera resolution is too low, please check your device.');
        }
    });
    cam.hide();

    //snap = createImage(640 * SCREEN_RATIO, 480 * SCREEN_RATIO);


    snap = createImage(480, 480);


    createTextInput();
    fill(255, 150, 200);
    textX = width / 2;
    textY = height / 2;


    button_next = createButton('next');
    button_next.parent("button-container");


    // In CSS, display: flex will allow you to arrange the items effectively in the container.


    // button_next.position(100, 100);


    // button_next.elt.style.position = "absolute";
    // button_next.elt.style.right = "100px";
    // button_next.elt.style.bottom = "100px";


    button_next.mousePressed(NEXT);


    button_snap = createButton('Snap');
    button_snap.parent("button-container");
    button_snap.mousePressed(SNAP);
    text(userTextObj, textX, textY);
    button_snap.hide();


    button_save = createButton('Save');
    button_save.parent("button-container");
    button_save.mousePressed(SAVE);
    button_save.hide();


    button_proceed = createButton('Proceed');
    button_proceed.parent("button-container");
    button_proceed.mousePressed(PROCEED);
    button_proceed.hide();


    button_retake = createButton('Retake');
    button_retake.parent("button-container");
    button_retake.mousePressed(RETAKE);
    button_retake.hide();


    button_submit = createButton("Submit");
    button_submit.parent("p5-canvas-container");
    button_submit.mousePressed(submitText)
    button_submit.hide();


    button_edit = createButton('Finish');
    button_edit.parent("button-container");
    button_edit.mousePressed(EDIT)
    button_edit.hide();

    // button_text_input = createButton('Say Something');
    // button_text_input.parent("button-container");
    // button_text_input.mousePressed(text_input)
    // button_text_input.hide();


    //
    let eraseButton = createButton('Erase Mode');
    eraseButton.parent("emoji-control-container");
    eraseButton.class("emoji-control-button");
    // eraseButton.style('background-image', 'url("assets/erasemode.png")');
    // eraseButton.style('background-size', 'cover');
    eraseButton.mousePressed(EraseMode);


    let scaleButton = createButton('Scale Mode');
    scaleButton.parent("emoji-control-container");
    scaleButton.class("emoji-control-button");
    scaleButton.mousePressed(ScaleMode);


    buttons.push(eraseButton, scaleButton);
    buttons[0].elt.textContent = '';
    buttons[1].elt.textContent = '';

    // for (let i = 0; i < images.length; i++) {
    //   let button = createButton('Show Image ' + i);
    //   button.parent("button-container");
    //   button.position(20, 80 + i * 40);
    //   button.mousePressed(() => showImage(i));
    //   button.parent("emoji-control-container");
    //   button.class("emoji-keyboard-area");
    //   buttons.push(button);
    // }
    // let emojiKBA = document.getElementById("emoji-keyboard-area");

    // for (let i = 0; i < images.length; i++) {


    //   let button = document.createElement("button");
    //   button.setAttribute("class", "emoji");


    //   button.style.backgroundImage = `url('${buttons_icons[i]}')`;
    //   button.style.backgroundSize = "cover";
    //   //button.style.backgroundColor = "pink";
    //   button.addEventListener("click", () => pushImage(i));


    //   emojiKBA.appendChild(button);
    // }

    let maxButtonsPerRow = 5;

    let emojiKBA = document.getElementById("emoji-keyboard-area");

    for (let i = 0; i < images.length; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "emoji");

        button.style.backgroundImage = `url('${buttons_icons[i]}')`;
        button.style.backgroundSize = "cover";
        button.style.backgroundColor = "rgba(255, 255, 255, 0.3)";

        button.addEventListener("click", () => pushImage(i));

        // if (i == 7) {
        //   let emptySpace = document.createElement("div");
        //   emptySpace.setAttribute("class", "empty-space1")
        //   emojiKBA.appendChild(emptySpace);
        //   emojiKBA.appendChild(button);
        // }

        // if (i == 13) {
        //   let emptySpace = document.createElement("div");
        //   emptySpace.setAttribute("class", "empty-space2")
        //   emojiKBA.appendChild(emptySpace);
        //   emojiKBA.appendChild(button);
        // }

        // if (i == 17) {
        //   let emptySpace = document.createElement("div");
        //   emptySpace.setAttribute("class", "empty-space3")
        //   emojiKBA.appendChild(emptySpace);
        //   emojiKBA.appendChild(button);
        // }

        emojiKBA.appendChild(button);

        // 每添加一个按钮后，检查是否需要插入空白元素
        // if ((i + 1) % maxButtonsPerRow === 0 && i !== images.length - 1) {
        //   // 创建一个空白的 <div> 元素
        //   let emptySpace = document.createElement("div");
        //   emptySpace.setAttribute("class", "empty-space")
        //   // emptySpace.classList.add("empty-space");
        //   emojiKBA.appendChild(emptySpace);
        // }


        // else {
        //   emojiKBA.appendChild(button);
        // }

    }


    const delButton = document.getElementById('emoji-del');


    // // 事件监听器
    delButton.addEventListener('click', () => {


        selected_emojis.pop();

        let emojiInputBox = document.getElementById("emoji-input-box");
        if (emojiInputBox.lastChild) {
            // 确保存在子元素
            emojiInputBox.removeChild(emojiInputBox.lastChild);
        }

        console.log(selected_emojis);
    });

    const enterButton = document.getElementById('emoji-enter');


    //事件监听器
    enterButton.addEventListener('click', () => {
        switch (selected_emojis.length) {
            case 1:
                generateImageGroup(1);
                break;
            case 2:
                generateImageGroup(2);
                break;
            case 3:
                generateImageGroup(3);
                break;
            case 4:
                generateImageGroup(4);
                break;
            default:
                console.log("please enter");
        }
    });


    const container = document.getElementById('asset-container');


    images.forEach(src => {
        const asset = document.createElement('asset');
        asset.src = src;
        asset.alt = 'Image';


        container.appendChild(asset);


        asset.style.zIndex = 9999;
    });


    // const edit_interface = document.getElementById('interface-container');


    // if (edit_time) {
    //     edit_interface.style.display = 'block';
    // } else {
    //     edit_interface.style.display = 'none';
    // }
    let button = document.getElementById("button-container");
    button.style.backgroundImage = 'url("assets/start.png")';
}


function draw() {
    background(0);

    for (let button of buttons.slice(2)) {
        if (eraseMode || scaleMode) {
            button.hide();
        } else {
            button.show();
        }
    }
    //


    if (seq == 0) {
        //background(255, 0, 0);
        image(initial_img, 0, 0)
    } else if (seq == 1) {
        //
    } else if (seq == 2) {
        push();
        translate(width, 0);
        scale(-1, 1);

        // 显示摄像头视频流
        if (cam.width > 0) {
            let sx = (cam.width - targetSize) / 2;
            let sy = (cam.height - targetSize) / 2;
            image(cam, 0, 0, width, height, sx, sy, targetSize, targetSize);
        }

        // 如果已经拍照，显示快照
        if (snap.width > 0) {
            let sx = (snap.width - targetSize) / 2;
            let sy = (snap.height - targetSize) / 2;
            image(snap, 0, 0, width, height, sx, sy, targetSize, targetSize);
        }

        button_next.hide();
        pop();
    } else if (seq == 3) {
        //background(255, 0, 255);
        push();


        // to flip
        translate(width, 0);
        scale(-1, 1);

        if (cam.width > 0) {
            let sx = (cam.width - targetSize) / 2;
            let sy = (cam.height - targetSize) / 2;
            image(cam, 0, 0, width, height, sx, sy, targetSize, targetSize);
        }


        button_next.hide();
        button_snap.show();


        button_proceed.hide();
        button_retake.hide();


        pop();


    } else if (seq == 4) {


        //background(255, 0, 255);
        push();


        // to flip
        translate(width, 0);
        scale(-1, 1);


        // to place the camera image to the center
        translate(-640 * SCREEN_RATIO / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2


        // display the cam image and snapshot!
        //image(cam, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
        if (cam.width > 0) {
            let sx = (cam.width - targetSize) / 2;
            let sy = (cam.height - targetSize) / 2;
            image(snap, 0, 0, width, height, sx, sy, targetSize, targetSize);
        }


        //button_next.hide();
        //button_snap.show();
        button_edit.show();


        pop();


    }


    // input 显示测试输入
    //textAlign(CENTER);
    //textSize(15);
    //text(userTextInput, width / 2, 50);


    // submitted text
    textSize(30);
    text(userTextObj, textX, textY);


    if (mouseIsPressed) {
        textX = mouseX;
        textY = mouseY;
    }


    if (mouseIsPressed) {
        em1X = mouseX;
        em1Y = mouseY;
    }


    // if (dragableMergedPics != null) {
    //   dragableMergedPics.show();
    // }

    if (dragableMergedPicsList != null) {
        for (let i = 0; i < dragableMergedPicsList.length; i++) {
            dragableMergedPicsList[i].show();
        }
    }


    // for (let i = 0; i < img.length; i++) {
    //   img[i].show();
    // }


}


let dragableMergedPics;

let dragableMergedPicsList = [];

function generateImageGroup(length) {


    // let backgroundURL;
    let mergedPics = [];


    for (let i = 0; i < selected_emojis.length; i++) {
        // console.log(images[selected_emojis[i]])
        mergedPics.push(images[selected_emojis[i]]);
    }


    let x = random(100, width - 100);
    let y = random(100, height - 100);

    let backgroundPic = BGPics[length - 1];

    dragableMergedPics = new ImageDragObjectGroup(x, y, mergedPics, 1, backgroundPic);
    // dragableMergedPics.show();
    dragableMergedPicsList.push(dragableMergedPics);

    mergedPics = [];
    selected_emojis = [];

    let emojiInputBox = document.getElementById("emoji-input-box");
    emojiInputBox.innerHTML = ''; // 将内容设置为空字符串，从而清空所有内容

}


function NEXT() {


    //seq = seq + 1;


    //if (seq = 2) {
    seq = 2;
    button_snap.show();
    //button_snap.position(200, 0);
    //}
    let button = document.getElementById("button-container");
    button.style.backgroundImage = 'url("assets/snap.png")';

}

function PROCEED() {

    button_edit.show();
    button_retake.hide();
    button_proceed.hide();


    edit_time = !edit_time;
    // setup();
    const edit_interface = document.getElementById('interface-container');

    const container = document.getElementById('emoji-control-container');
    // 获取容器内的所有按钮元素（假设按钮都有button标签）
    var buttonsS = container.querySelectorAll("button");
    buttonsS[0].style.backgroundImage = 'url("assets/earse.png")'
    buttonsS[0].style.backgroundSize = '100% 100%'
    buttonsS[1].style.backgroundImage = 'url("assets/scale.png")'
    buttonsS[1].style.backgroundSize = '100% 100%'
    // var thirdButton = buttonsS[3];
    // fourthButton.style.backgroundImage = "../ass"
    // var fourthButton = buttonsS[3];

    const container2 = document.getElementById('emoji-input-button-area');
    // 获取容器内的所有按钮元素（假设按钮都有button标签）
    var buttonsS2 = container2.querySelectorAll("button");
    buttonsS2[0].style.backgroundImage = 'url("assets/delete.png")'
    buttonsS2[0].style.backgroundSize = '100% 100%'
    buttonsS2[1].style.backgroundImage = 'url("assets/enter.png")'
    buttonsS2[1].style.backgroundSize = '100% 100%'

    console.log(container2)
    // var thirdButton = buttonsS[3];
    // fourthButton.style.backgroundImage = "../ass"
    // var fourthButton = buttonsS[3];

    if (edit_time) {
        edit_interface.style.display = 'block';
    } else {
        edit_interface.style.display = 'none';
    }
    let button = document.getElementById("button-container");

    button.style.position = 'absolute';
    button.style.top = '0';
    button.style.left = 'auto';
    button.style.transform = 'translateX(0)';
    button.style.right = '0';
    button.style.backgroundImage = 'url("assets/finish.png")';
}


function RETAKE() {
    let button = document.getElementById("button-container");
    button.style.backgroundImage = 'url("assets/snap.png")';
    //snap.hide();
    clear();
    seq = 3;

}


function SNAP() {
    //snap = cam.get(0, 0);

    //let tempCanvas = createGraphics(width, height);

    tempCanvas = createGraphics(480, 480);

    tempCanvas.push();

    let sx = (cam.width - targetSize) / 2;
    let sy = (cam.height - targetSize) / 2;

    tempCanvas.image(cam, 0, 0, 480, 480, sx, sy, targetSize, targetSize);
    tempCanvas.pop();

    snap = tempCanvas.get();

    button_snap.hide();
    button_proceed.show();
    button_retake.show();
    seq = 2;
    var container = document.getElementById("button-container");
    container.style.backgroundImage = 'none'

    var buttonsOne = container.querySelectorAll("button");


    console.log(buttonsOne[2], buttonsOne[3])
    if (buttonsOne.length >= 4) {
        var fourthButton1 = buttonsOne[3];
        fourthButton1.style.backgroundImage = "url('assets/proceed.png')";
        fourthButton1.style.width = '100%'
        var fourthButton = buttonsOne[4];
        fourthButton.style.backgroundImage = "url('assets/retake.png')";
        return false;
    }
}


function SAVE() {
    saveCanvas('myCanvas.png');
    return false;
}


function EDIT() {
    button_snap.hide();
    // button_text_input.show();
    button_edit.hide();


    button_save.show();
    edit_time = !edit_time;
    const edit_interface = document.getElementById('interface-container');
    let button = document.getElementById("button-container");
    button.style.backgroundImage = 'url("assets/buttonBg.png")';
    button.style.backgroundSize = '100% 100%';
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.top = '520px';
    button.style.width = '150px';
    button.style.height = '150px';
    button.style.backgroundColor = 'transparent';
    button.style.display = 'flex';


    if (edit_time) {
        edit_interface.style.display = 'block';
    } else {
        edit_interface.style.display = 'none';
    }
    // setup();

}


function text_input() {


    words.show();
    button_submit.show();
    button_text_input.hide();


    return false;
}

//image dragging


function EraseMode() {
    console.log(1)
    eraseMode = !eraseMode;
    scaleMode = false;
    updateButtonLabels();
}


function ScaleMode() {
    scaleMode = !scaleMode;
    eraseMode = false;
    updateButtonLabels();
}


function updateButtonLabels() {
    buttons[0].elt.style.backgroundImage = eraseMode ? 'url("assets/done.png")' : 'url("assets/erase.png")';
    buttons[0].elt.style.backgroundColor = 'black';
    buttons[1].elt.style.backgroundImage = scaleMode ? 'url("assets/done.png")' : 'url("assets/scale.png")';
    buttons[1].elt.style.backgroundColor = 'black';
}


function pushImage(index) {
    let x = random(width - images[index].width);
    let y = random(height - images[index].height);
    //let x = 1000;
    //let y = 1000;
    let dragObject = new ImageDragObject(x, y, images[index], 1);


    img.push(dragObject);

    if (selected_emojis.length < 4) {
        selected_emojis.push(index);
        console.log(selected_emojis);

        let emojiInputBox = document.getElementById("emoji-input-box");

        let newImage = document.createElement('img');
        // console.log(newImage);
        newImage.src = imageULRs[index];

        newImage.style.width = 'auto';
        newImage.style.height = '100%'; // 将新的 img 元素添加到 div 中
        emojiInputBox.appendChild(newImage);
        console.log(imageULRs[index])
    }
}


function mousePressed() {
    if (eraseMode) {
        if (dragableMergedPicsList != null) {
            for (let i = 0; i < dragableMergedPicsList.length; i++) {
                if (dragableMergedPicsList[i].mouseInside()) {
                    dragableMergedPicsList.splice(i, 1);
                    break;
                }
            }
        }

        for (let i = 0; i < img.length; i++) {
            if (img[i].mouseInside()) {
                img.splice(i, 1);
                break;
            }
        }
    } else if (scaleMode) {
        if (dragableMergedPicsList != null) {
            for (let i = 0; i < dragableMergedPicsList.length; i++) {
                if (dragableMergedPicsList[i].mouseInside()) {
                    selectedMergedImageIndex = i;
                    break;
                }
            }
        }

        for (let i = 0; i < img.length; i++) {
            if (img[i].mouseInside()) {
                selectedImageIndex = i;
                break;
            }
        }
    } else {
        if (dragableMergedPicsList != null) {
            for (let i = 0; i < dragableMergedPicsList.length; i++) {
                if (dragableMergedPicsList[i].mouseInside()) {
                    dragableMergedPicsList[i].dragging = true;
                    dragableMergedPicsList[i].offsetX = mouseX - dragableMergedPicsList[i].x;
                    dragableMergedPicsList[i].offsetY = mouseY - dragableMergedPicsList[i].y;
                    break;
                }
            }
        }

        for (let i = 0; i < img.length; i++) {
            if (img[i].mouseInside()) {
                img[i].dragging = true;
                img[i].offsetX = mouseX - img[i].x;
                img[i].offsetY = mouseY - img[i].y;
                break;
            }
        }
    }
}


function mouseReleased() {
    if (dragableMergedPicsList != null) {
        for (let i = 0; i < dragableMergedPicsList.length; i++) {
            dragableMergedPicsList[i].dragging = false;
        }
        selectedMergedImageIndex = -1;
    }

    for (let i = 0; i < img.length; i++) {
        img[i].dragging = false;
    }
    selectedImageIndex = -1;
}


function mouseDragged() {

    if (dragableMergedPicsList != null) {
        for (let i = 0; i < dragableMergedPicsList.length; i++) {
            if (dragableMergedPicsList[i].dragging) {
                dragableMergedPicsList[i].x = mouseX - dragableMergedPicsList[i].offsetX;
                dragableMergedPicsList[i].y = mouseY - dragableMergedPicsList[i].offsetY;
            }
        }
    }
    if (selectedMergedImageIndex !== -1) {
        let dx = mouseX - pmouseX;
        let dy = mouseY - pmouseY;
        dragableMergedPicsList[selectedMergedImageIndex].adjustScale(dx, dy);
    }

    for (let i = 0; i < img.length; i++) {
        if (img[i].dragging) {
            img[i].x = mouseX - img[i].offsetX;
            img[i].y = mouseY - img[i].offsetY;
        }
    }


    if (selectedImageIndex !== -1) {
        let dx = mouseX - pmouseX;
        let dy = mouseY - pmouseY;
        img[selectedImageIndex].adjustScale(dx, dy);
    }
}

let prevTouchX = 0;
let prevTouchY = 0;

function touchStarted() {

    if (touches.length > 0 && isEventOnCanvas(touches[0].x, touches[0].y)) {
        if (touches.length > 0) {
            prevTouchX = touches[0].x;
            prevTouchY = touches[0].y;
        }

        if (eraseMode) {

            if (dragableMergedPicsList != null) {
                for (let i = 0; i < dragableMergedPicsList.length; i++) {
                    if (dragableMergedPicsList[i].touchInside(touches[0].x, touches[0].y)) {
                        dragableMergedPicsList.splice(i, 1);
                        break;
                    }
                }
            }

            for (let i = 0; i < img.length; i++) {
                if (img[i].touchInside(touches[0].x, touches[0].y)) {
                    img.splice(i, 1);
                    break;
                }
            }
        } else if (scaleMode) {

            if (dragableMergedPicsList != null) {
                for (let i = 0; i < dragableMergedPicsList.length; i++) {
                    if (dragableMergedPicsList[i].touchInside(touches[0].x, touches[0].y)) {
                        selectedMergedImageIndex = i;
                        break;
                    }
                }
            }

            for (let i = 0; i < img.length; i++) {
                if (img[i].touchInside(touches[0].x, touches[0].y)) {
                    selectedImageIndex = i;
                    break;
                }
            }
        } else {

            if (dragableMergedPicsList != null) {
                for (let i = 0; i < dragableMergedPicsList.length; i++) {
                    if (dragableMergedPicsList[i].touchInside(touches[0].x, touches[0].y)) {
                        dragableMergedPicsList[i].dragging = true;
                        dragableMergedPicsList[i].offsetX = mouseX - dragableMergedPicsList[i].x;
                        dragableMergedPicsList[i].offsetY = mouseY - dragableMergedPicsList[i].y;
                        break;
                    }
                }
            }
            for (let i = 0; i < img.length; i++) {
                if (img[i].touchInside(touches[0].x, touches[0].y)) {
                    img[i].dragging = true;
                    img[i].offsetX = mouseX - img[i].x;
                    img[i].offsetY = mouseY - img[i].y;
                    break;
                }
            }
        }
    }
}

function touchMoved() {
    if (touches.length > 0 && isEventOnCanvas(touches[0].x, touches[0].y)) {
        // 处理拖动

        if (dragableMergedPicsList != null) {
            for (let i = 0; i < dragableMergedPicsList.length; i++) {
                if (dragableMergedPicsList[i].dragging) {
                    dragableMergedPicsList[i].x = touches[0].x - dragableMergedPicsList[i].offsetX;
                    dragableMergedPicsList[i].y = touches[0].y - dragableMergedPicsList[i].offsetY;
                }
            }
        }

        for (let i = 0; i < img.length; i++) {
            if (img[i].dragging) {
                img[i].x = touches[0].x - img[i].offsetX;
                img[i].y = touches[0].y - img[i].offsetY;
            }
        }


        // 处理缩放
        if (selectedImageIndex !== -1 && scaleMode) {
            let dx = touches[0].x - prevTouchX;
            let dy = touches[0].y - prevTouchY;
            img[selectedImageIndex].adjustScale(dx, dy);
        }

        if (selectedMergedImageIndex !== -1) {
            let dx = touches[0].x - prevTouchX;
            let dy = touches[0].y - prevTouchY;
            dragableMergedPicsList[selectedMergedImageIndex].adjustScale(dx, dy);
        }


        prevTouchX = touches[0].x;
        prevTouchY = touches[0].y;
    }
}

function touchEnded() {

    if (dragableMergedPicsList != null) {
        for (let i = 0; i < dragableMergedPicsList.length; i++) {
            dragableMergedPicsList[i].dragging = false;
        }
        selectedMergedImageIndex = -1;
    }

    for (let i = 0; i < img.length; i++) {
        img[i].dragging = false;
    }
    selectedImageIndex = -1;
}


function mouseInBox(x, y, w, h) {
    return mouseX >= x && mouseX < x + w &&
        mouseY >= y && mouseY < y + h;
}


function isEventOnCanvas(x, y) {
    const rect = document.getElementById('p5-canvas-container').getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

class ImageDragObject {
    constructor(x, y, img, scale) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.scale = scale;
        this.originalScale = scale;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    mouseInside() {
        return mouseInBox(this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
    }

    touchInside(touchX, touchY) {
        return touchX >= this.x && touchX < this.x + this.img.width * this.scale &&
            touchY >= this.y && touchY < this.y + this.img.height * this.scale;
    }


    show() {
        image(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
    }

    adjustScale(dx, dy) {
        let d = dist(this.x + this.img.width * this.scale, this.y + this.img.height * this.scale, mouseX, mouseY);
        let lastDistance = dist(this.x + this.img.width * this.scale, this.y + this.img.height * this.scale, mouseX - dx, mouseY - dy);
        let scaleChange = d - lastDistance;
        this.scale += scaleChange / 100;
        this.scale = max(0.1, this.scale);
    }
}


class ImageDragObjectGroup {
    constructor(x, y, imgs, scale, bgImg) {
        this.x = x;
        this.y = y;
        this.imgs = imgs;
        this.scale = scale;
        this.originalScale = scale;
        this.bgImg = bgImg;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }


    mouseInside() {
        let minX = this.x;
        let minY = this.y;
        let maxX = this.x + this.imgs[0].width * this.scale;
        let maxY = this.y + this.imgs.reduce((acc, img) => acc + img.height * this.scale, 0);
        return mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY;
    }


    touchInside(touchX, touchY) {
        let minX = this.x;
        let minY = this.y;
        let maxX = this.x + this.imgs[0].width * this.scale;
        let maxY = this.y + this.imgs.reduce((acc, img) => acc + img.height * this.scale, 0);
        return touchX >= minX && touchX <= maxX && touchY >= minY && touchY <= maxY;
    }


    // show() {
    //   let bgHeight = 0
    //   let bgWidth = 0
    //   for (let i = 0; i < this.imgs.length; i++) {
    //     image(this.imgs[i], this.x, this.y + i * this.imgs[i].height * this.scale, this.imgs[i].width * this.scale, this.imgs[i].height * this.scale);
    //     bgHeight += this.imgs[i].height * this.scale
    //     bgWidth = Math.max(bgWidth, this.imgs[i].width * this.scale)
    //   }

    //   // image(this.bgImg, this.x, this.y, this.bgImg.width * this.scale + 10, this.bgImg.height * this.scale + (this.imgs.length - 1) * 75);
    //   image(this.bgImg, this.x - 10, this.y, bgWidth + 20, bgHeight + 20);
    //   console.log(bgWidth, bgHeight)
    // }

    show() {
        for (let i = 0; i < this.imgs.length; i++) {
            image(this.imgs[i], this.x, this.y + i * (this.imgs[i].height - 40) * this.scale, this.imgs[i].width * this.scale, this.imgs[i].height * this.scale);
        }
        image(this.bgImg, this.x, this.y, this.bgImg.width * this.scale, (this.bgImg.height) * this.scale);

        if (eraseMode) {
            image(eraseSignImg, this.x, this.y, eraseSignImg.width * this.scale, (eraseSignImg.height) * this.scale);
        } else if (scaleMode) {
            image(scaleSignImg, this.x, this.y, scaleSignImg.width * this.scale, (scaleSignImg.height) * this.scale);
        }

    }

    adjustScale(dx, dy) {
        let d = dist(this.x, this.y, mouseX, mouseY);
        let lastDistance = dist(this.x, this.y, mouseX - dx, mouseY - dy);
        let scaleChange = d - lastDistance;
        this.scale += scaleChange / 100;
        this.scale = max(0.1, this.scale);
    }
}


//----TEXT INPUT DETAIL SETTINGS----


function createTextInput() {
    words = createInput("");
    words.parent("text-input-container");
    words.hide();
    //words.input(updateText); // not working as intended
    words.elt.addEventListener("keydown", updateText); // JS


    //  button_submit = createButton("Submit!");
    // button_submit.parent("text-input-container");
    // button_submit.mousePressed(submitText)
}


function submitText() {
    //userTextObj = userTextInput;
    userTextObj = userTextInput; //words.value();
    button_save.show();
}


function updateText(event) {
    if (event.key == "Enter") {
        userTextInput += words.value();
        userTextInput += "\n";
        words.elt.innerHTML = ""; // ***
    }
    userTextInput = words.value();
}


function updateText111(event) {
    //userTextInput = words.value();


    console.log(event);
    if (event.key == "Enter") {
        userTextInput += "\n";
    } else if (event.key == "Shift") {
        //
    } else if (event.key == "Control") {
        //
    } else if (event.key == "Alt") {
        //
    } else if (event.key == "Meta") {
        //
    } else if (event.key == "Backspace") {
        userTextInput = userTextInput.slice(0, -1);
        //https://byby.dev/js-remove-last-char
        //Here slice(0, -1) removes the last character because -1 means the last index of the string. You can also use str.length - 1 instead of -1 to get the same result.
    } else if (event.key == "Tab") {
        //
    } else {
        userTextInput += event.key;
    }
}
