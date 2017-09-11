//  This script convert Astah SequenceDiagram to mermaid fomat text
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file)

var ISequenceDiagram = Java.type('com.change_vision.jude.api.inf.model.ISequenceDiagram');
var ArrayList = Java.type('java.util.ArrayList');
var Arrays = Java.type('java.util.Arrays');
var Comparator = Java.type('java.util.Comparator');
var Collections = Java.type('java.util.Collections');
var HashMap = Java.type('java.util.HashMap');

run();

function run() {

    var diagramViewManager = astah.getViewManager().getDiagramViewManager();
    var diagram = diagramViewManager.getCurrentDiagram();


    if (!(diagram instanceof ISequenceDiagram)) {
        print('Open a ISequenceDiagram and run again.');
        return;
    }

    print(diagram + ' Sequence');
    print('```mermaid');
    print('sequenceDiagram;');

    var presentations = diagram.getPresentations();

    var interaction = diagram.getInteraction();
    var lifelines = interaction.getLifelines();

    var lifelinePresentations = new ArrayList();
    for (var i in presentations) {
        var presentation = presentations[i];
        if (Arrays.asList(lifelines).contains(presentation.getModel())) {
            lifelinePresentations.add(presentation);
        }
    }

    Collections.sort(lifelinePresentations, new Comparator() {
        compare: function ( a, b ) {
            return a.getLocation().getX() - b.getLocation().getX();
        }
    });

    var lifelineNames = new HashMap();
    for (var i in lifelinePresentations) {
        var lifeline = lifelinePresentations[i].getModel();
        if (lifeline.getBase() != null) {
            lifelineNames.put(lifeline, lifeline.getName() + "_" + lifeline.getBase());
        } else {
            lifelineNames.put(lifeline, lifeline.getName());
        }
        print("participant " + lifelineNames.get(lifeline) + ';');
    }

    var msgs = interaction.getMessages();
    var messagePresentations = new ArrayList();
    for (var i in presentations) {
        var presentation = presentations[i];
        if (Arrays.asList(msgs).contains(presentation.getModel())) {
            messagePresentations.add(presentation);
        }
    }

    Collections.sort(messagePresentations, new Comparator() {
        compare: function ( a, b ) {
            return a.getPoints()[0].getY() - b.getPoints()[0].getY();
        }
    });

    for (var i in messagePresentations) {
        var presentation = messagePresentations[i];
        var model = presentation.getModel();
        var source = model.getSource();
        var target = model.getTarget();

        var arrow = "->>";
        if (model.isSynchronous()) {
            arrow = "->>";
        } else if (model.isReturnMessage()) {
            print(lifelineNames.get(source) + '-->>' + lifelineNames.get(target) + ':' + 'reply.' + model.getName());
            continue;
        } else if (model.isAsynchronous()) {
            arrow = "-x";
        }

        print(lifelineNames.get(source) + arrow + lifelineNames.get(target) + ':' + model.getIndex() + '.' + model.getName());

    }
    print('```');

}
