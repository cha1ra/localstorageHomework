/*------------------
全体のロジック
------------------*/
var len = localStorage.length;
var memoCard = {};
var latestIdNumber;
var currentIdNumber = 1;

$(function(){
    if(len==0) createMemoData(1);
    getCurrentID();
    memoCard = getMemoData(1);
    setMemoData();
    setMenuBar();
});




//キー入力をするとその値が返される
var $doc = $(document);
$doc.on('keydown', function(e){
    $('.test').html(e.which);
})



/*------------------
メモ帳の関数
------------------*/
function getCurrentID(){
    if(len == 0){
        latestIdNumber = 1;
    }else{
        latestIdNumber = convertKeyToId(localStorage.key(len-1));
    }
    console.log("latestIdNumber:" + latestIdNumber);
}

function createMemoData(id){
    id = convertIdToKey(id);
    let initData = JSON.stringify({date: getDate() ,title:"件名",note:"本文を入力してください..."});
    localStorage.setItem(id,initData);
}

function getMemoData(id){
    id = convertIdToKey(id);
    return JSON.parse(localStorage.getItem(id));
}

function setMemoData(){
    $("#title").val(memoCard.title);
    $("#note").val(memoCard.note);
}

function reloadMemoData(id){
    memoCard = getMemoData(id);
    id = convertIdToKey(id);
    $("#title").val(memoCard.title);
    $("#note").val(memoCard.note);
}


//メモ帳の追加
$("#add").on("click",function(){
    latestIdNumber++;
    createMemoData(latestIdNumber);
    setMenuBar();
    console.log("Add memo card. Latest ID Number is " + latestIdNumber);
})

function saveMemoData(){
    let $change = $(this).attr("id");
    memoCard[$change] = $(this).val();
    localStorage.setItem(convertIdToKey(currentIdNumber), JSON.stringify(memoCard));
    setMenuBar();
}

// 入力の度にローカルストレージに格納
$('#memo-card > textarea').on("input", saveMemoData);


/*------------------
メニューバー
------------------*/
function setMenuBar(){
    len = localStorage.length;
    var navContent = "<ul>";
    for (let i=0; i<len; i++){
        let key = localStorage.key(i);
        navContent += `<li id="${key}">${getMemoData(key).title}
            <ul><li>${getStringDate(getMemoData(key).date)}</li></ul>
            </li>`;
    }
    navContent += "</ul>";
    $("#memo-list").html(navContent);
}

//メニュー遷移
$(document).on("click", "#memo-list > ul > li", function () {
    key = $(this).attr("id");
    reloadMemoData(key);
    console.log("Move to ID:" + $(this).attr("id") + " ...");
    currentIdNumber = convertKeyToId(key);
    setMenuBar();
});



/*------------------
その他細かいやつ
------------------*/

function convertKeyToId(key){
    return Number(key.slice(1));
}

function convertIdToKey(id){
    if(typeof id !== "string") id = "m" + id;
    return id;
}

function getDate(){
    let d = new Date();
    return d;
}

function getStringDate(d){
    d = new Date(d);
    return `${d.getFullYear()}年${(d.getMonth()) + 1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes()}`;
}

//全削除
$("#clear-all").on("click",function(){
    if(confirm('本当に全部削除しますか？')){
        localStorage.clear();
        console.log("Clear All of Memo Data...")

        len = 0;
        createMemoData(1);
        getCurrentID();
        memoCard = getMemoData(1);
        setMemoData();
        setMenuBar();
    }else{
        return false;
    }
});


/*------------------
今回学んだこと

■IDやClassのワイルドカード指定
http://tacosvilledge.hatenablog.com/entry/2018/05/10/141542

■JSON.stringfy
https://team-lab.github.io/skillup-nodejs/1/6.html

■読み込みごに追加したDOMにajaxを設定
https://qiita.com/negi/items/6ec0d3cedba499eac81a
https://qiita.com/horikeso/items/5f6863a49e8348f63c4b

------------------*/
