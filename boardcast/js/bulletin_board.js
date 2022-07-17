var dd;

function init(){


    fetch_data('getData','','');

}


function fetch_data(action,text="",id=""){

    const uri = 'index.php';
    fetch(uri, {
      method:'POST',
      body:JSON.stringify({
        method:action,
        text:text,
        id:id
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
        return res.json();
    }).then(result => {
        dd=result;
        alert(result.method);
        if(result.method=='get'){
            show_data(result.data);
        }
        if(result.method=='success'){
            fetch_data('getData','','');
        }
        
    });

}

function show_data(data){
    let table_foot =document.getElementById('board_table_foot');
    let xmp = document.getElementById('board').innerHTML;
    let btn = "<button onclick='delete_txt(*id*)'>刪除</button>";
    let tmp_all ="";

    let sel= document.getElementById('update_opn');
    sel.options.length =0;
    for(let i=0;i<data.length;i++){
        let tmp_xmp =xmp;
        let btn_tmp_xmp =btn;
        let tmp_data =data[i];
        tmp_xmp = tmp_xmp.replace('*ID*',tmp_data.id);
        tmp_xmp = tmp_xmp.replace('*TITLE*',tmp_data.title);
        tmp_xmp = tmp_xmp.replace('*TXT*',tmp_data.text);
        tmp_xmp = tmp_xmp.replace('*DAY*',tmp_data.day);

        btn_tmp_xmp = btn_tmp_xmp.replace ('*id*',tmp_data.id);
        tmp_xmp = tmp_xmp.replace('*FUC*',btn_tmp_xmp);

        tmp_all +=tmp_xmp;

        sel.options.add(new Option(tmp_data.id,tmp_data.id));
    }
    table_foot.innerHTML= tmp_all;
}

function delete_txt(id){

    let y_n =confirm('確認刪除第'+id +'則');

    if(y_n){
        fetch_data('delete','',id);
    }
}

function new_one(){
    let title =document.getElementById('new_title').value;
    let txt =document.getElementById('new_text').value;
    console.log(title+txt);
    if(title=="" || txt==''){
        alert("標題/內容不得為空");
        return;
    }
    let msg= {
        title:title,
        txt:txt
    };
    fetch_data('insert',msg,"");

}

function update_one(){
    let title =document.getElementById('new_title').value;
    let txt =document.getElementById('new_text').value;
    let update_opn =document.getElementById('update_opn').value;
    if(title=="" || txt==''){
        alert("標題/內容不得為空");
        return;
    }
    let msg= {
        title:title,
        txt:txt
    };

    let y_n =confirm('確認編輯第'+update_opn+'則');
    if(y_n){
        fetch_data('update',msg,update_opn);
    }
}