var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: false,

  elements: {
    nodes: [
      { data: { id: 'a', parent: 'b', label: 'ミキサー', href: 'http://www.yamahaproaudio.com/japan/ja/products/mixers/tfrack/index.jsp' }, position: { x: 500, y: 250 } },
      { data: { id: 'b', label: '機器収納ラック', href: 'http://www.kawamura.co.jp/catalog/index05.php?category=TYPE-AVS&mode=sch' } },
      { data: { id: 'c', parent: 'b', label: 'スイッチャー', href: 'http://www.idk.co.jp/products/detail.php?id=506' }, position: { x: 500, y: 150 } },
      { data: { id: 'd', parent: 'b', label: '2chチューナー', href: 'https://www.toa.co.jp/products/prosound/wireless_systems/800mhz_wireless/wt-d1802.htm' }, position: { x: 300, y: 250 } },
      { data: { id: 'e', label: 'AV操作卓', href: 'http://kyoei-shoji.co.jp/product/product.php?id=145&cat_id=54' } },
      { data: { id: 'f', parent: 'e', label: 'BDプレーヤー', href: 'https://panasonic.jp/bdplayer/products/bd90.html' }, position: { x: 100, y: 150 } },
      { data: { id: 'g', label: 'ワイヤレスアンテナ', href: 'https://www.toa.co.jp/products/prosound/wireless_systems/800mhz_wireless/800mhz_wireless_yw-540.htm' }, position: { x: 100, y: 250 } },
    ],
    
    edges: [
      { data: { id: 'ad', source: 'a', target: 'd',  } },
      { data: { id: 'dg', source: 'd', target: 'g', label: '5C-FB' } },
      { data: { id: 'ac', source: 'a', target: 'c', } },
      { data: { id: 'fc', source: 'f', target: 'c', label: 'HDMI' } }

    ],
  },

  style: [
    {
      selector: 'node',
      css: {
        'content': function( ele ){
          var this_id = ele.data('id');
          var this_label = ele.data('label');
          return this_id + ':' + this_label;
        },
        'text-valign': 'top',
        'text-halign': 'center',
        'background-color': 'blue'
      }
    },
    {
      selector: '$node > node',
      css: {
        'content': function( ele ){
          var this_id = ele.data('id');
          var this_label = ele.data('label');
          return this_id + ':' + this_label;
        },
        'padding-top': '10px',
        'padding-left': '10px',
        'padding-bottom': '10px',
        'padding-right': '10px',
        'text-valign': 'top',
        'text-halign': 'center',
        'background-color': 'cyan'
      }
    },
    {
      selector: 'edge',
      css: {
        'content': function( ele ){
          var this_id = ele.data('id');
          var this_label = ele.data('label');
          if (this_label) {
            return this_id + ':' + this_label;
          } else {
           return '';
          }
        },
        'text-wrap': 'wrap',
        'text-valign': 'top',
        'text-halign': 'center',
        'target-arrow-shape': 'triangle',
        'allow-scale': '2',
        'target-endpoint': 'outside-to-node',
        'text-background-color': '#fff',
        'text-background-shape': 'roundrectangle',
        'text-background-opacity': '0.8'
      }
    },
    {
      selector: ':selected',
      css: {
        'background-color': 'red',
        'line-color': 'red',
        'target-arrow-color': 'red',
        'source-arrow-color': 'red'
      }
    }
  ],

  layout: {
    name: 'preset',
    padding: 5
  }
});

var cy_layout = cy.layout( 'preset' );

cy.on('cxttap', 'node', function(){
  try { // your browser may block popups
    window.open( this.data('href') );
  } catch(e){ // fall back on url change
  //    window.location.href = this.data('href');
  }
});

var destroy = function() {
  cy.$(':selected').remove();
}

var addNode = function() {
  var elem_id = document.getElementById('node_add_id').value;
  var elem_label = document.getElementById('node_add_label').value;
  var elem_URL =  document.getElementById('node_URL').value;
  if (elem_id.length === 0 || elem_label.length === 0 || elem_URL === 0 ) {
    alert("please fill both input fields");
    return;
  }
  cy.add([{
      data: { id: elem_id, label: elem_label, href: elem_URL },
      selectable: true
    }
  ]);
  cy.layout( cy_layout );
  $('#node_add_id').val('');
  $('#node_add_label').val('');
  $('#node_URL').val('');
}

var addEdge = function() {
  var target_id = document.getElementById('edge_add_target_node_id').value;
  var source_id = document.getElementById('edge_add_source_node_id').value;
  var edge_label = document.getElementById('edge_add_label').value;
  if (target_id.length === 0 || source_id.length === 0 || edge_label.length === 0 ) {
    alert("please fill all input fields");
    return;
  }
  cy.add([{
      data: {
        id: source_id + '' + target_id,
        source: source_id + '',
        target: target_id + '',
        label: edge_label
      },
      selectable: true
    }
  ]);
  cy.layout( cy_layout );
  $('#edge_add_target_node_id').val('');
  $('#edge_add_source_node_id').val('');
  $('#edge_add_label').val('');
}