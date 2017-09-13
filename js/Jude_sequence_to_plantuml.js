//  This script convert Astah SequenceDiagram to plantuml fomat text
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file)

importPackage(com.change_vision.jude.api.inf.model);
importPackage(java.util);

run();

function orderOfMessagePosition(a, b) {
    return a.getPoints()[0].getY() - b.getPoints()[0].getY();
}

function run() {

    var diagramViewManager = astah.getViewManager().getDiagramViewManager();
    var diagram = diagramViewManager.getCurrentDiagram();

    if (!(diagram instanceof ISequenceDiagram)) {
        print('Open a ISequenceDiagram and run again.');
        return;
    }

    // print(diagram + ' Sequence\n');
    print('@startuml\n');
    // print(diagram.isFlowChart() )
    var lifelines = diagram.getInteraction().getLifelines();

    var presentations = diagram.getPresentations();

    var lifelineNames = new HashMap();
    for (var i in lifelines) {
        var lifeline = lifelines[i];
        if (lifeline.getBase() != null) {
            lifelineNames.put(lifeline, lifeline.getName() + "_" + lifeline.getBase().getName());
        } else {
            lifelineNames.put(lifeline, lifeline.getName());
        }

        print("participant " + lifelineNames.get(lifeline) + '\n');
    }

    var messagePresentations = new Array();
    for (var i in presentations) {
        var presentation = presentations[i];
        if (presentation.getModel() instanceof IMessage) {
            messagePresentations[i] = presentation;
        }
    }

    messagePresentations.sort(orderOfMessagePosition);

    for (var i in messagePresentations) {
        var messageP = messagePresentations[i];
        if (messageP == undefined) {
            continue;
        }

        var message = messageP.getModel();
        var arrow = " -> ";
        if (message.isSynchronous()) {
            arrow = " -> ";
        }
        if (message.isAsynchronous()) {
            arrow = " ->> ";
        }
        if (message.isReturnMessage()) {
            arrow = " -->> ";
        }

        var index = message.getIndex();
        if (message.isReturnMessage()) {
            index = "reply";
        }

        var messageName = message.getName();
        if (messageName == null) {
            messageName = "";
        }

        var sourceName = lifelineNames.get(message.getSource());
        var targetName = lifelineNames.get(message.getTarget());

        print(sourceName + arrow + targetName + ':' + index + '.' + messageName + '\n');

    }
    print('@enduml');

}
