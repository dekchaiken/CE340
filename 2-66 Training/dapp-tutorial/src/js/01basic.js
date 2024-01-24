// $(document).ready(
//     function() {
//         alert("hello");
//     }
// );
flag = false;
$(
    () => {
        $("#btn").click(() => {
            if (flag == false) {
                $('#box').removeAttr("id").addClass("greenbox");
                flag = true;
            } else {
                $("div").removeClass("greenbox").attr({ "id": "box" });
                flag = false;
            }
        });
    }
);

