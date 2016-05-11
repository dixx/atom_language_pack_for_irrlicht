'use babel';

import LanguageCppIrrlichtView from './language-cpp-irrlicht-view';
import { CompositeDisposable } from 'atom';

export default {

  languageCppIrrlichtView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageCppIrrlichtView = new LanguageCppIrrlichtView(state.languageCppIrrlichtViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageCppIrrlichtView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-cpp-irrlicht:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageCppIrrlichtView.destroy();
  },

  serialize() {
    return {
      languageCppIrrlichtViewState: this.languageCppIrrlichtView.serialize()
    };
  },

  toggle() {
    console.log('LanguageCppIrrlicht was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
