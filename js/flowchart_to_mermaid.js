//  This script convert Astah flowchart to mermaid fomat text 
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file) 
var INDENT_STR = 'A'; //2 spaces

run();

function run() {
    with(new JavaImporter(
            com.change_vision.jude.api.inf.model)) {
        var diagramViewManager = astah.getViewManager().getDiagramViewManager();
        var diagram = diagramViewManager.getCurrentDiagram();
        if (!(diagram instanceof IActivityDiagram)) {
            print('Open a flowchart and run again.');
            return;
        }

        if (!(diagram.isFlowChart())) {
            print('Open a flowchart and run again.');
            return;
        }

        print(diagram + ' Flowchart\n');
        print('```mermaid\ngraph TB\n');
        // print(diagram.isFlowChart() )
        var flow = diagram.getActivity().getFlows();
        var flow_names = new Array();
        var flow_obj = diagram.getActivity().getActivityNodes();
        for (var i in flow_obj) {
            flow_names[i] = INDENT_STR + i;
            //print object define
            if (isRhombus(flow_obj[i])) {
                print(INDENT_STR + i + "{" + flow_obj[i] + "};\n");
            } else {
                print(INDENT_STR + i + "[" + flow_obj[i] + "];\n");
            }
        }

        //print flowchart logic
        for (var i in flow) {
            var m = flow_obj.indexOf(flow[i].getSource());
            var n = flow_obj.indexOf(flow[i].getTarget());
            if (n >= 0) {
                print(flow_names[m] + "-->");
                if (flow[i].getGuard() != "") {
                    print("|" + flow[i].getGuard() + "| ");
                }
                print(flow_names[n] + ";\n");
            }
        }
        print('```');
    }
}

function isRhombus(node) {
    var stereotypes = node.getStereotypes();
    return stereotypes.length > 0 && "judgement".equals(stereotypes[0]);
}