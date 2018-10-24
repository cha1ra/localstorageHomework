




//キー入力をするとその値が返される
var $doc = $(document);
$doc.on('keydown', function(e){
    $('.test').html(e.which);
})



const len = $("#memo-list li").length;
$("#save").on("click", function(){
    for(let i=1; i<=len; i++){
        const v = $("#memo"+i).val();
        localStorage.setItem("memo"+i, v);
    }
});

//2.ロード時に表示(for文)
for(let i=1; i<=len; i++){
    const v = localStorage.getItem("memo"+i);
    $("#memo"+i.val(v));
}

