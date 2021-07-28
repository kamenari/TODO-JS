import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};
// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
}

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");
  li.className = "list";

  // li中のdiv生成
  const div = document.createElement("div");
  div.className = "list-row";

  // div内のpを生成
  const p = document.createElement("p");
  p.innerText = text;

  // button(完了)タグ生成
  const completButton = document.createElement("button");
  completButton.innerText = "完了";

  completButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(completButton.closest(".list"));

    // 完了リストに追加する要素
    const addTarget = completButton.closest(".list");

    // TODO内容テキストを取得
    const text = addTarget.querySelector(".list-row > p").innerText;
    
    //li以下を初期化
    addTarget.appendChild(div).textContent = null;
    
    // div内のpを生成
    const p = document.createElement("p");
    p.innerText = text;

    // button(戻す)タグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(li)を完了リストから削除
      const deleteTarget = backButton.closest(".list");
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキストの取得
      const text = deleteTarget.querySelector(".list-row > p").innerText;
      
      createIncompleteList(text);
    });
    
    // liタグの子要素に各要素を設定
    addTarget.appendChild(div).appendChild(p);
    addTarget.appendChild(div).appendChild(backButton);
    
    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest(".list"));
  });

  // liの子要素に各要素を設定
  li.appendChild(div).appendChild(p);
  li.appendChild(div).appendChild(completButton);
  li.appendChild(div).appendChild(deleteButton);
  
  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
}

document.getElementById("add-button").addEventListener("click", () => onClickAdd());