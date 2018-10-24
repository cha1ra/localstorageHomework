/*------------------
全体のロジック
------------------*/
const len = localStorage.length;

$(function(){
    initialSettings();
    loadMemoData();



    let datalist = {
        data1: ["test", "test"],
        data2: ["hoge2"]
    };
    console.log(datalist);
    console.log(datalist.data1);

    // let memoCard = ["test","test"]
    // JSON.stringify(messages);

});




//キー入力をするとその値が返される
var $doc = $(document);
$doc.on('keydown', function(e){
    $('.test').html(e.which);
})



/*------------------
メモ帳の関数
------------------*/

function initialSettings(){
    if(len == 0){
        logTitle("You use this app for the first time.");
        localStorage.setItem("m1","");
    }
}



// 入力の度にローカルストレージに格納
$('#memo-card > textarea').on("input", updateMemoData);




function loadMemoData(){
    logTitle("Get Memo data");
    console.log(`There are ${len} Memos.\nStart Loading...`);
    for(let i=1; i<=len; i++){
        const v = localStorage.getItem("memo"+i);
        $("#memo"+i).val(v);
    }
    console.log('Finish importing Memo data.')
}

function updateMemoData(){
    let $card = $(this).attr("class");

    console.log($card);
    switch($(this).attr("class")){
        case "title":
            break;
        case "content":
            break;
    }
    localStorage.setItem("m1", $(this).val());
}


/*------------------
その他細かいやつ
------------------*/
function logTitle(title){
    console.log("\n------------\n" + title + "\n------------\n");
}



/*------------------
今回追加で学んだこと



■IDやClassのワイルドカード指定
http://tacosvilledge.hatenablog.com/entry/2018/05/10/141542

■JSON.stringfy
https://team-lab.github.io/skillup-nodejs/1/6.html


------------------*/
