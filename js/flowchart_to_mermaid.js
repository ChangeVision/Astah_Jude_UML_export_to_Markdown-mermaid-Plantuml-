//  This script convert Astah flowchart to mermaid fomat text 
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file) 


var IActivityDiagram = Java.type('com.change_vision.jude.api.inf.model.IActivityDiagram');
var HashMap = Java.type('java.util.HashMap');

var INDENT_STR = 'A'; //2 spaces

run();

function run() {

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

    print(diagram + ' Flowchart');
    print('```mermaid');
    print('graph TB');

    var activity = diagram.getActivity();

    var activityNodeIds = new HashMap();
    var activityNodes = activity.getActivityNodes();
    for (var i in activityNodes) {
        var nodeId = INDENT_STR + i;
        var node = activityNodes[i];
        activityNodeIds.put(node, nodeId);
    }

    //print object define
    for (var i in activityNodes) {
        var node = activityNodes[i];
        var nodeId = activityNodeIds.get(node);
        if (isRhombus(node)) {
            print(nodeId + "{" + node.getName() + "};");
        } else {
            print(nodeId + "[" + node.getName() + "];");
        }
    }

    //print flowchart logic
    var flows = activity.getFlows();
    for (var i in flows) {
        var flow = flows[i];
        var sourceId = activityNodeIds.get(flow.getSource());
        if (sourceId == null) {
            continue;
        }
        var targetId = activityNodeIds.get(flow.getTarget());
        if (targetId == null) {
            continue;
        }
        if (flow.getGuard() != "") {
            print(sourceId + "-->|" + flow.getGuard() + "| " + targetId + ";");
            continue;
        }
        print(sourceId + "-->" + targetId + ";");
    }
    print('```');

}

function isRhombus(node) {
    var stereotypes = node.getStereotypes();
    return stereotypes.length > 0 && "judgement".equals(stereotypes[0]);
}