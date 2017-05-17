window.onload = function () {
    var n = 0;
    imgLocation('container', 'box');
    var imgDate = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }, { "src": "6.jpg" }] };
    window.onscroll = function () {
        if (checkFlag()) {
            var cparent = document.getElementById("container");
            for (var i=0; i < imgDate.data.length&&n<98; i++,n++) {
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "images/" +n+".jpg";
                boximg.appendChild(img);
            }
            imgLocation('container', 'box');
        }
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    //  console.log(lastContentHeight);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop);
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //console.log(lastContentHeight + ":" + scrollTop + ":" + pageHeight);
    if (lastContentHeight < scrollTop + pageHeight) {
        return true;
    }
}

function imgLocation(parent,content){
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);
    //console.log(ccontent);
    var imgWidth = ccontent[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:" + imgWidth * cols + "px;margin:0 auto";

    var BoxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
        //BoxHeightArr[i] = ccontent[i].offsetHeight;
        //console.log(BoxHeightArr[i]);
        if (i < cols) {
            BoxHeightArr[i] = ccontent[i].offsetHeight;
        }
        else {
            var minheight = Math.min.apply(null, BoxHeightArr);
            var minIndex=getminheightLocation(BoxHeightArr,minheight);

            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minheight + "px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
}
function getminheightLocation(BoxHeightArr, minHeight) {
    for (var i in BoxHeightArr) {
        if (BoxHeightArr[i] == minHeight) {
            return i;
        }
    }
}
function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
