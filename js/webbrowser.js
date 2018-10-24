/*------------------
Python を呼び出したい
------------------*/

$("#google > button").on("click",function(){
    searchWords = $('#google > input').val();
    postDataToPython(searchWords, 'search');
});

$(document).on("click", "#search > p > a", function(){
    event.preventDefault();
    searchURL = $(this).attr('href');
    postDataToPython(searchURL,'content');
    alert(searchURL);
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