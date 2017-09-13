//  This script convert Astah SequenceDiagram to plantuml fomat text
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file)

importPackage(com.change_vision.jude.api.inf.model);

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

    var objnames = new Array();
    for (var i in lifelines) {
        // print(lifelines[i].getName() + ":" + lifelines[i].getBase() +": "  );

        if (lifelines[i].getBase() != null) {
            objnames[i] = lifelines[i].getName() + "_" + lifelines[i].getBase();
        } else {
            objnames[i] = lifelines[i].getName();
        }

        print("participant " + objnames[i] + '\n');
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

        var m = lifelines.indexOf(message.getSource());
        var n = lifelines.indexOf(message.getTarget());
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

        print(objnames[m] + arrow + objnames[n] + ':' + index + '.' + messageName + '\n');

    }
    print('@enduml');

}
