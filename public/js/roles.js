google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

  // For each orgchart box, provide the name, manager, and tooltip to show.
  data.addRows(output_rows);


// Create the chart.
var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
google.visualization.events.addListener(chart, 'select', openRole);
// Draw the chart, setting the allowHtml option to true for the tooltips.
chart.draw(data, {size: 'large'});

function openRole() {
    var selectedItem = chart.getSelection()[0];
    var value = data.getValue(selectedItem.row, 0);
    $.ajax({
        url: '/role-description?role_id=' + value,
        type: 'GET',
        data: false,
        processData: false,
        contentType: false,
        success: function(data){
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('#roleModal').modal('hide');
            $('#roleModalContainer').empty();
            $('#roleModalContainer').append(data);
            $('#roleModal').modal({show: true});
        }
    });
}

}

