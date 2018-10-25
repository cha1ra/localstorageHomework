/*------------------
メモ帳上での操作
------------------*/
$("#open-browser").on('click', function(){
    $('#search').removeClass('hidden');
    $('#memo-card').css("display" , "none");;
})

function hideWebBrowser(){
    $('#search').addClass('hidden');
    $('#memo-card').css("display" , "");
}

//キー入力をするとメニューに戻す
var $doc = $(document);
$doc.on('keydown', function(e){
    hideWebBrowser();
})


/*------------------
Web Browser
------------------*/

//検索機能
$("#google > div").on("click",function(){
    searchWords = $('#google > input').val();
    postDataToPython(searchWords, 'search');
});

//詳細閲覧機能
$(document).on("click", "#search > p > a", function(){
    event.preventDefault();
    searchURL = $(this).attr('href');
    postDataToPython(searchURL,'content');
});


function postDataToPython(search, status){
    $.ajax({
        type: 'POST',
        url: "./php/callpy.php",
        data:{
            status: status,
            word: search,
        }
    })
    .then(
        //Success
        function(data){
            $('#search').html(data);
        },
        function(){
            alert("Webブラウザの読み込みに失敗しました");
        }
    );
}