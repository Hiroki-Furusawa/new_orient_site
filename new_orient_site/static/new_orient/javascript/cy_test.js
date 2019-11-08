// =====================================================
// Cytoscape.js メインプログラム cy_test.js
// 構成：
//   ・node, edge, style, layout各設定データの読み込み（JSON形式）
//   ・cyオブジェクトの宣言
//   ・関数内で呼び出すレイアウト変数の定義
//   ・機器URLリンクへのジャンプの実装
//   ・node,edge削除用関数destroyの定義
//   ・node追加用関数addNodeの定義
//   ・edge追加用関数addedgeの定義
// =====================================================

// =====================================================
//   ・node, edge, style, layout各設定データの読み込み（JSON形式）
//    ※この箇所に関しては後々データベース連携向けに要修正。
//     NoSQLを用いるか、RDBからのSQL読み込みをpythonで処理してJSON化するかは要検討。
//     できる限り後者で実装して、DBの正規性と管理の容易さ、利用可能なDBの汎化を追求したい。
//     ・初期値としてのJSONファイルは使わずに、件名ページをロードするごとにaddNode関数とaddEdge関数をループ処理して実装するのが現実的かも。
// =====================================================

// import $ from 'jquery';
var cy_layout;
// var nodesJson;
// var edgesJson;
// var styleJson = $.getJSON("/static/new_orient/javascript/cy_style.json");
// var layoutJson = $.getJSON("/static/new_orient/javascript/cy_layout.json");

// =====================================================
//   ・cyオブジェクトの宣言
// =====================================================
var cy = new Object();

// =====================================================
//   以下、window.onload内に$when().done()形式で記述することで
//   upload時の処理順序を指定。
// =====================================================
window.onload = function(){
  $.when(
    cy = new Object(),
    // 以下、elementsの内容（nodes, edges）とstyle、layout定義はJSONファイルに記述
    // JSON形式の記述にしなければならないのはCytoscape.jsの仕様。
    //
    //    nodesJson = $.getJSON("/static/new_orient/javascript/cy_nodes.json"),
    //    edgesJson = $.getJSON("/static/new_orient/javascript/cy_edges.json"),
    //    styleJson = $.getJSON("/static/new_orient/javascript/cy_style.json"),
    //    layoutJson = $.getJSON("/static/new_orient/javascript/cy_layout.json")
    //
    // 上記、外部ファイルとしての読み込みが難しいため断念。
    // Model構築の上、データベース内の登録情報をaddしていく実装を進める方向にする。

  ).done(function(){
    cy = cytoscape({
      container: document.getElementById('cy'),
    
      boxSelectionEnabled: false,
      autounselectify: false,
      style: [
        {
          selector: "node",
          css: {
            content: function( ele ){ 
              var this_id = ele.data("id");
              var this_label = ele.data("label");
              return this_id + ":" + this_label;
            },
            "text-valign": "top",
            "text-halign": "center",
            "background-color": "blue"
          }
        },
        {
          selector: "$node > node",
          css: {
            "content": function( ele ){
              var this_id = ele.data("id");
              var this_label = ele.data("label");
              return this_id + ":" + this_label;
            },
            "padding-top": "10px",
            "padding-left": "10px",
            "padding-bottom": "10px",
            "padding-right": "10px",
            "text-valign": "top",
            "text-halign": "center",
            "background-color": "cyan"
          }
        },
        {
          selector: "edge",
          css: {
            "content": function( ele ){
              var this_id = ele.data("id");
              var this_label = ele.data("label");
              if (this_label) {
                return this_id + ":" + this_label;
              } else {
                return "";
              }
            },
            "text-wrap": "wrap",
            "text-valign": "top",
            "text-halign": "center",
            "target-arrow-shape": "triangle",
            "arrow-scale": "2",
            "target-endpoint": "outside-to-node",
            "text-background-color": "#fff",
            "text-background-shape": "roundrectangle",
            "text-background-opacity": "0.8"
          }
        },
        {
          selector: ":selected",
          css: {
            "background-color": "red",
            "line-color": "red",
            "target-arrow-color": "red",
            "source-arrow-color": "red"
          }
        }
      ],
//      style: [styleJson.responseJSON.style],
      layout: {
        name: "preset",
        padding: 5
      }
//      layout: [layoutJson.responseJSON.layout]
    });
// =====================================================
//   ・関数内で呼び出すレイアウト変数の定義
// =====================================================
    cy_layout = cy.layout( {name:'preset'} );

// =====================================================
//   ・機器URLリンクへのジャンプの実装
//   ※機器データベースと機器情報ページの実装ができた後には
//    そちらへのリンクに張替え。
// =====================================================

    cy.on('cxttap', 'node', function(){
      try { // your browser may block popups
        window.open( this.data('href') );
      } catch(e){ // fall back on url change
      //    window.location.href = this.data('href');
      }
    });
  })
};


// =====================================================
//   ・node,edge削除用関数destroyの定義
//    ※いずれは右クリックメニューを実装し、「削除」をクリックすることで実行できるようにしたい
// =====================================================

var destroy = function() {
  // 選択中のオブジェクトを削除
  cy.$(':selected').remove();
};


// =====================================================
//   ・node追加用関数addNodeの定義
// =====================================================

var callAddNodeFromButton = function() {

  var elem_id = document.getElementById('node_add_id').value;
  var elem_label = document.getElementById('node_add_label').value;
  var elem_URL =  document.getElementById('node_URL').value;
  
  if (elem_id.length === 0 || elem_label.length === 0 || elem_URL === 0 ) {
    alert("please fill both input fields");
    return;
  }else{
    var nodeData = {"elem_id":elem_id, "elem_label":elem_label, "elem_URL":elem_URL};
    addNode(nodeData);
    return nodeData
  }
};

var addNode = function(nodeData) {
  cy.add([{
      data: { id: nodeData["elem_id"], label: nodeData["elem_label"], href: nodeData["elem_URL"] },
      selectable: true
    }
  ]);

  cy.layout( cy_layout );

  $('#node_add_id').val('');
  $('#node_add_label').val('');
  $('#node_URL').val('');

};


// =====================================================
//   ・edge追加用関数addedgeの定義
// =====================================================

var callAddEdgeFromButton = function() {

  var target_id = document.getElementById('edge_add_target_node_id').value;
  var source_id = document.getElementById('edge_add_source_node_id').value;
  var edge_label = document.getElementById('edge_add_label').value;

  if (target_id.length === 0 || source_id.length === 0 || edge_label.length === 0 ) {
    alert("please fill all input fields");
    return;
  }else{
    var edgeData = {"target_id":target_id, "source_id":source_id, "edge_label":edge_label};
    addEdge(edgeData);
  }
  
};

var addEdge = function(edgeData) {

  cy.add([{
      data: {
        id: edgeData["source_id"] + '' + edgeData["target_id"],
        source: edgeData["source_id"] + '',
        target: edgeData["target_id"] + '',
        label: edgeData["edge_label"]
      },
      selectable: true
    }
  ]);

  cy.layout( cy_layout );

  $('#edge_add_target_node_id').val('');
  $('#edge_add_source_node_id').val('');
  $('#edge_add_label').val('');

};

// EOF